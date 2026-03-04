import fs from 'fs';
import path from 'path';
import { rollup } from 'rollup';
import { dts } from 'rollup-plugin-dts';

const TSCONFIG_PATH = path.resolve('tsconfig.build.json');
const TYPE_ENTRY = path.resolve('packages/index.ts');
const OUTPUT_DECL_FILE = path.resolve('lib/types/index.d.ts');

export const buildType = async () => {
  fs.rmSync(path.dirname(OUTPUT_DECL_FILE), { recursive: true, force: true });
  fs.mkdirSync(path.dirname(OUTPUT_DECL_FILE), { recursive: true });

  const bundle = await rollup({
    input: TYPE_ENTRY,
    plugins: [
      dts({
        tsconfig: TSCONFIG_PATH
      })
    ]
  });

  try {
    await bundle.write({
      file: OUTPUT_DECL_FILE,
      format: 'es'
    });
  } finally {
    await bundle.close();
  }

  if (!fs.existsSync(OUTPUT_DECL_FILE)) {
    throw new Error('Missing output file: lib/types/index.d.ts');
  }
};
