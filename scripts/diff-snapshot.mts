import path from 'path'
import { existsSync } from 'fs'
import { glob, argv, fs, chalk } from 'zx'


/**
 * usage:
 *   tsx scripts/diff-snapshot.mts <no-alias | alias>
 */

async function diffSnapshots({ extensions, testDir, snapshotPath }: {
  extensions: string[];
  testDir: string;
  snapshotPath: string;
}) {
  // Retrieve all relevant files from tests and snapshot directories
  const extensionsGlob = extensions
    .map(ext => ext.replace(/^\./, ''))
    .join('|')

  const testFiles = await glob(`**/*.(${extensionsGlob})`, { cwd: testDir, onlyFiles: true })
  const snapshotFiles = await glob(`**/*.(${extensionsGlob})`, { cwd: snapshotPath, onlyFiles: true })

  /**
   * lose in output types
   * in snapshot but not in output types/
   */
  const lose: string[] = []
  /** 
   * exceed in output types
   * in snapshot but in output types/
   */
  const exceed: string[] = []

  const diffs: string[] = []

  const testFilesSet = new Set(testFiles)
  snapshotFiles.forEach(file => {
    if (!testFilesSet.has(file)) {
      lose.push(path.join(snapshotPath, file))
    }
  })


  for (const file of testFiles) {
    const sourceFilePath = path.join(testDir, file)
    const targetFilePath = path.join(snapshotPath, file)

    const sourceFile = await fs.readFile(sourceFilePath, { encoding: 'utf-8' })
    if (!existsSync(targetFilePath)) {
      exceed.push(targetFilePath)
      continue
    }

    const targetFile = await fs.readFile(targetFilePath, { encoding: 'utf-8' })

    if (sourceFile !== targetFile) {
      diffs.push(`${sourceFilePath} ${chalk.gray(`(${targetFilePath})`)}`)
    }
  }

  return {
    lose,
    exceed,
    diffs,
  }
}

// Get snapshot directory argument
const snapshotDir = argv._[0]

// Validate input
if (!snapshotDir) {
  console.error(
    chalk.redBright('Error: No snapshot directory specified.'),
  )
  process.exit(1)
}


const extensions = ['.d.ts']
const testDir = 'types/'
const snapshotPath = `snapshots/${snapshotDir}/`


const { diffs, exceed, lose } = await diffSnapshots({
  extensions,
  testDir,
  snapshotPath,
})

if (diffs.length) {
  console.error(`
  ${chalk.redBright('Differences found in the following files:')}
  ${diffs
    .map(file => chalk.yellowBright(`  - ${file}`))
    .join('\n  ')
  }
  `)
}

if (exceed.length) {
  console.error(`
  ${chalk.redBright('Exceed files in the output types/:')}
  ${exceed
    .map(file => chalk.yellowBright(`  - ${file}`))
    .join('\n  ')
  }
  `)
}

if (lose.length) {
  console.error(`
  ${chalk.redBright('Missing files in the output types/:')}
  ${lose
    .map(file => chalk.yellowBright(`  - ${file}`))
    .join('\n  ')
  }
  `)
}


if (diffs.length || exceed.length || lose.length) {
  process.exit(1)
}
