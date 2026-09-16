#!/usr/bin/env bash

# 通知并关闭当前标签版本提交中引用的 issue。
set -euo pipefail

: "${TAG_NAME:?TAG_NAME is required}"
: "${DEFAULT_BRANCH:?DEFAULT_BRANCH is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"

PREV_TAG="$(git tag --list 'v*' --sort=-creatordate | grep -Fxv "${TAG_NAME}" | head -n1 || true)"

if [ -n "${PREV_TAG}" ]; then
  RANGE="${PREV_TAG}..${TAG_NAME}"
else
  ROOT_COMMIT="$(git rev-list --max-parents=0 "${TAG_NAME}" | tail -n1)"
  RANGE="${ROOT_COMMIT}..${TAG_NAME}"
fi

ISSUE_IDS="$(
  git log "${RANGE}" --no-merges --format='%s%n%b%n' \
    | perl -ne 'while(/(?:^|[^A-Za-z0-9_])#([0-9]+)\b/g){print "$1\n"}' \
    | sort -n -u
)"

if [ -z "${ISSUE_IDS}" ]; then
  echo "No linked issues found in commit messages."
  exit 0
fi

RELEASE_URL="https://github.com/${GITHUB_REPOSITORY}/releases/tag/${TAG_NAME}"
CHANGELOG_URL="https://github.com/${GITHUB_REPOSITORY}/blob/${DEFAULT_BRANCH}/CHANGELOG.md"
MARKER="<!-- release-notify:${TAG_NAME} -->"

while IFS= read -r ISSUE_ID; do
  [ -z "${ISSUE_ID}" ] && continue

  ISSUE_PAYLOAD="$(gh api "repos/${GITHUB_REPOSITORY}/issues/${ISSUE_ID}" 2>/dev/null || true)"
  if [ -z "${ISSUE_PAYLOAD}" ]; then
    echo "Skip #${ISSUE_ID}: issue not found or inaccessible."
    continue
  fi

  if printf '%s' "${ISSUE_PAYLOAD}" | jq -e '.pull_request != null' >/dev/null; then
    echo "Skip #${ISSUE_ID}: reference is a pull request."
    continue
  fi

  ISSUE_STATE="$(printf '%s' "${ISSUE_PAYLOAD}" | jq -r '.state // ""')"

  if gh api "repos/${GITHUB_REPOSITORY}/issues/${ISSUE_ID}/comments?per_page=100" \
    --jq '.[] | select(.body | contains("'"${MARKER}"'")) | .id' \
    | grep -q .; then
    echo "Skip #${ISSUE_ID}: release notification already exists for ${TAG_NAME}."
    continue
  fi

  COMMENT_BODY="$(printf '%s\n\n- Release: %s\n- Changelog: %s\n\n%s\n' \
    "This issue is included in release \`${TAG_NAME}\`." \
    "${RELEASE_URL}" \
    "${CHANGELOG_URL}" \
    "${MARKER}")"

  gh api "repos/${GITHUB_REPOSITORY}/issues/${ISSUE_ID}/comments" \
    --method POST \
    -f "body=${COMMENT_BODY}" >/dev/null

  echo "Notified issue #${ISSUE_ID}."

  if [ "${ISSUE_STATE}" = "open" ]; then
    gh api "repos/${GITHUB_REPOSITORY}/issues/${ISSUE_ID}" \
      --method PATCH \
      -f state=closed >/dev/null
    echo "Closed issue #${ISSUE_ID}."
  else
    echo "Issue #${ISSUE_ID} already closed."
  fi
done <<< "${ISSUE_IDS}"
