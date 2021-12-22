import esbuild from 'esbuild';
import { globby as glob } from 'globby';
import mri from 'mri';
import { execSync } from 'child_process';

const { serve, types } = mri(['--serve', '--types']);
const outdir = 'dist';

(async () => {
  try {
    if (types)
      execSync(`tsc --project . --outdir "${outdir}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  const buildResult = await esbuild
    .build({
      format: 'esm',
      target: 'es2017',
      entryPoints: [
        './src/backpack.ts',
        ...(await glob('./src/components/**/!(*.(style|test)).ts')),
      ],
      outdir,
      chunkNames: 'chunks/[name].[hash]',
      bundle: true,
      splitting: true,
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  if (serve) {
    // Dev server stuff here.
  }

  process.on('SIGTERM', () => buildResult.rebuild.dispose());
})();
