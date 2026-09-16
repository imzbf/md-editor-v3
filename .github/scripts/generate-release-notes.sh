#!/usr/bin/env bash

# 生成发布条目并将其置于 CHANGELOG.md 顶部。将逻辑放在脚本中可以保持工作流
# 声明式，同时确保工作流重跑时仍能复现相同的发布内容。
set -euo pipefail

: "${TAG_NAME:?TAG_NAME is required}"
: "${RUNNER_TEMP:?RUNNER_TEMP is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"

if [ ! -f CHANGELOG.md ]; then
  printf '%s\n' '<!-- next-release -->' > CHANGELOG.md
fi

DISPLAY_VERSION="${TAG_NAME#v}"

if grep -q "^## ${TAG_NAME} (" CHANGELOG.md || grep -q "^## ${DISPLAY_VERSION} (" CHANGELOG.md; then
  # 工作流重跑时复用已提交的条目，确保发布正文保持可复现。
  awk -v tag_heading="## ${TAG_NAME} (" -v version_heading="## ${DISPLAY_VERSION} (" '
    index($0, tag_heading) == 1 || index($0, version_heading) == 1 { capture = 1 }
    capture { print }
    capture && $0 == "---" { exit }
  ' CHANGELOG.md > "${RUNNER_TEMP}/release-entry.md"
  test -s "${RUNNER_TEMP}/release-entry.md"
  echo "CHANGELOG already contains ${TAG_NAME}, reuse the existing entry."
  exit 0
fi

DATE="$(date -u +%Y-%m-%d)"
MARKER='<!-- next-release -->'
REPO_URL="https://github.com/${GITHUB_REPOSITORY}"

PREV_TAG="$(git tag --list 'v*' --sort=-creatordate | grep -Fxv "${TAG_NAME}" | head -n1 || true)"

if [ -n "${PREV_TAG}" ]; then
  RANGE="${PREV_TAG}..${TAG_NAME}"
  COMPARE_FROM="${PREV_TAG}"
else
  ROOT_COMMIT="$(git rev-list --max-parents=0 "${TAG_NAME}" | tail -n1)"
  RANGE="${ROOT_COMMIT}..${TAG_NAME}"
  COMPARE_FROM="${ROOT_COMMIT}"
fi

COMPARE_URL="${REPO_URL}/compare/${COMPARE_FROM}...${TAG_NAME}"

FEATURES_FILE='/tmp/changelog-features.md'
REFACTORS_FILE='/tmp/changelog-refactors.md'
FIXES_FILE='/tmp/changelog-fixed-bugs.md'
OTHERS_FILE='/tmp/changelog-others.md'
: > "${FEATURES_FILE}"
: > "${REFACTORS_FILE}"
: > "${FIXES_FILE}"
: > "${OTHERS_FILE}"

while IFS= read -r -d '' FULL_HASH \
  && IFS= read -r -d '' SUBJECT \
  && IFS= read -r -d '' BODY; do
  [ -z "${FULL_HASH:-}" ] && continue
  FULL_HASH="$(printf '%s' "${FULL_HASH}" | tr -d '\r\n[:space:]')"
  [ -z "${FULL_HASH}" ] && continue
  SUBJECT="$(printf '%s' "${SUBJECT}" | sed -E 's/^[[:space:]]+|[[:space:]]+$//g')"
  [ -z "${SUBJECT}" ] && continue

  # 跳过自动生成的 changelog 提交。
  if printf '%s' "${SUBJECT}" | grep -Eiq '^docs\(changelog\):[[:space:]]*'; then
    continue
  fi

  # 跳过纯版本号提交，例如 "0.3.0" 或 "v0.3.0-beta.1"。
  if printf '%s' "${SUBJECT}" | grep -Eq '^v?[0-9]+\.[0-9]+\.[0-9]+([.-][0-9A-Za-z.-]+)?$'; then
    continue
  fi

  TARGET_FILE="${OTHERS_FILE}"
  CLEAN_SUBJECT="${SUBJECT}"

  if printf '%s' "${SUBJECT}" | grep -Eiq '^feat(\([^)]*\))?(!)?:[[:space:]]*'; then
    TARGET_FILE="${FEATURES_FILE}"
    CLEAN_SUBJECT="$(printf '%s' "${SUBJECT}" | sed -E 's/^feat(\([^)]*\))?(!)?:[[:space:]]*//I')"
  elif printf '%s' "${SUBJECT}" | grep -Eiq '^refactor(\([^)]*\))?(!)?:[[:space:]]*'; then
    TARGET_FILE="${REFACTORS_FILE}"
    CLEAN_SUBJECT="$(printf '%s' "${SUBJECT}" | sed -E 's/^refactor(\([^)]*\))?(!)?:[[:space:]]*//I')"
  elif printf '%s' "${SUBJECT}" | grep -Eiq '^fix(\([^)]*\))?(!)?:[[:space:]]*'; then
    TARGET_FILE="${FIXES_FILE}"
    CLEAN_SUBJECT="$(printf '%s' "${SUBJECT}" | sed -E 's/^fix(\([^)]*\))?(!)?:[[:space:]]*//I')"
  fi

  if [ -z "${CLEAN_SUBJECT}" ]; then
    CLEAN_SUBJECT="${SUBJECT}"
  fi
  CLEAN_SUBJECT="$(printf '%s' "${CLEAN_SUBJECT}" \
    | tr '\r\n' ' ' \
    | sed -E 's/[[:space:]]+/ /g; s/^[[:space:]]+|[[:space:]]+$//g')"

  ISSUE_IDS="$(printf '%s\n%s\n' "${SUBJECT}" "${BODY}" \
    | perl -ne 'while(/(?:^|[^A-Za-z0-9_])#([0-9]+)\b/g){print "$1\n"}' \
    | awk '!seen[$0]++')"
  ISSUE_SUFFIX=""
  if [ -n "${ISSUE_IDS}" ]; then
    ISSUE_LINKS=""
    while IFS= read -r ISSUE_ID; do
      [ -z "${ISSUE_ID}" ] && continue
      if [ -n "${ISSUE_LINKS}" ]; then
        ISSUE_LINKS="${ISSUE_LINKS} "
      fi
      ISSUE_LINKS="${ISSUE_LINKS}[#${ISSUE_ID}](${REPO_URL}/issues/${ISSUE_ID})"
    done <<< "${ISSUE_IDS}"

    if [ -n "${ISSUE_LINKS}" ]; then
      ISSUE_SUFFIX=" ${ISSUE_LINKS}"
    fi
  fi

  SHORT_HASH="$(printf '%s' "${FULL_HASH}" | cut -c1-7)"
  printf -- '- %s ([commit %s](%s/commit/%s))%s\n' \
    "${CLEAN_SUBJECT}" \
    "${SHORT_HASH}" \
    "${REPO_URL}" \
    "${FULL_HASH}" \
    "${ISSUE_SUFFIX}" >> "${TARGET_FILE}"

  BODY_CLEAN="$(printf '%s\n' "${BODY}" \
    | sed 's/\r$//' \
    | sed -E 's/^[[:space:]]+|[[:space:]]+$//g' \
    | sed '/^[[:space:]]*$/d')"

  if [ -n "${BODY_CLEAN}" ]; then
    while IFS= read -r BODY_LINE; do
      [ -z "${BODY_LINE}" ] && continue
      BODY_LINE="$(printf '%s' "${BODY_LINE}" \
        | tr '\r\n' ' ' \
        | sed -E 's/[[:space:]]+/ /g; s/^[[:space:]]+|[[:space:]]+$//g')"
      [ -z "${BODY_LINE}" ] && continue
      if printf '%s' "${BODY_LINE}" | grep -Eiq '^(re|ref|refs|close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)[:[:space:]]*(#[0-9]+([,[:space:]]+#[0-9]+)*)$'; then
        continue
      fi
      if printf '%s' "${BODY_LINE}" | grep -Eq '^(issues?:)?[[:space:]]*(#[0-9]+([,[:space:]]+#[0-9]+)*)$'; then
        continue
      fi
      if printf '%s' "${BODY_LINE}" | grep -Eiq '^BREAKING[[:space:]]+CHANGE:'; then
        printf '  - **%s**\n' "${BODY_LINE}" >> "${TARGET_FILE}"
      else
        printf '  - %s\n' "${BODY_LINE}" >> "${TARGET_FILE}"
      fi
    done <<< "${BODY_CLEAN}"
  fi

  printf '\n' >> "${TARGET_FILE}"
# 此处不要使用 `-z`。当前格式已经使用 NUL 分隔符，组合使用会产生额外空字段，
# 导致解析字段错位。
done < <(git log "${RANGE}" --no-merges --format='%H%x00%s%x00%b%x00' || true)

write_section() {
  local title="$1"
  local file="$2"
  if [ ! -s "${file}" ]; then
    return 1
  fi
  printf '### %s\n\n' "${title}"
  cat "${file}"
  printf '\n'
  return 0
}

{
  printf '## %s (%s)\n\n' "${DISPLAY_VERSION}" "${DATE}"
  write_section 'Features' "${FEATURES_FILE}" || true
  write_section 'Refactors' "${REFACTORS_FILE}" || true
  write_section 'Fixed Bugs' "${FIXES_FILE}" || true
  write_section 'Others' "${OTHERS_FILE}" || true
  printf '**Full Changelog**: [%s...%s](%s)\n\n' "${COMPARE_FROM}" "${TAG_NAME}" "${COMPARE_URL}"
  printf -- '---\n'
} > "${RUNNER_TEMP}/release-entry.md"

grep -vF "${MARKER}" CHANGELOG.md \
  | sed '/^# Changelog$/d; /^All notable changes to this project will be documented in this file\.$/d' \
  > /tmp/changelog-existing.raw.md || true
sed '/./,$!d' /tmp/changelog-existing.raw.md > /tmp/changelog-existing.md

{
  printf '%s\n\n' "${MARKER}"
  cat "${RUNNER_TEMP}/release-entry.md"
  if [ -s /tmp/changelog-existing.md ]; then
    printf '\n'
    cat /tmp/changelog-existing.md
  fi
} > /tmp/CHANGELOG.md

mv /tmp/CHANGELOG.md CHANGELOG.md
