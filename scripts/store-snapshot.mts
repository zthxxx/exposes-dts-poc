import path from 'path'
import { existsSync } from 'fs'
import { glob, argv, fs, chalk } from 'zx'



/**
 * usage:
 *   tsx scripts/store-snapshot.mts <no-alias | alias>
 */

async function storeSnapshots({ extensions, testDir, snapshotPath }: {
  extensions: string[];
  testDir: string;
  snapshotPath: string;
}) {
  // Retrieve all relevant files from tests and snapshot directories
  const extensionsGlob = extensions
    .map(ext => ext.replace(/^\./, ''))
    .join('|')

  const testFiles = await glob(`**/*.(${extensionsGlob})`, { cwd: testDir, onlyFiles: true })

  await fs.remove(snapshotPath)

  await Promise.all(testFiles.map(async file => {
    const sourceFilePath = path.join(testDir, file)
    const targetFilePath = path.join(snapshotPath, file)

    const targetFileDir = path.dirname(targetFilePath)
    if (!existsSync(targetFileDir)) {
      await fs.mkdir(targetFileDir, { recursive: true })
    }
    await fs.copyFile(sourceFilePath, targetFilePath)
  }))
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


await storeSnapshots({
  extensions,
  testDir,
  snapshotPath,
})
