import {
  Command,
  flags
} from '@oclif/command'
import {
  MetadataItem,
  MetadataMerge
} from './metadata/MetadataItem'
var ChildProcess = require('child_process');

class SfdcMergetool extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({
      char: 'v'
    }),
    help: flags.help({
      char: 'h'
    }),
    // flag with no value (-f, --force)
  }

  static args = [{
      name: 'base',
      required: true
    },
    {
      name: 'current',
      required: true
    },
    {
      name: 'other',
      required: true
    },
    {
      name: 'path'
    },
  ]




  async run() {
    const {
      args,
      flags
    } = this.parse(SfdcMergetool)

    this.log(`SFDCM: Auto-merging ${args.path}`)
    var base = new MetadataItem(args.base)
    var current = new MetadataItem(args.current)
    var other = new MetadataItem(args.other)

    try {
      let result = await MetadataMerge(base, current, other)
      await result.write()
      await other.write()
    } catch (ex) {
      this.warn(ex);
    }


    return new Promise((resolve, reject) => {
        let mergeResult = ChildProcess.spawn('git', ['merge-file', args.current, args.base, args.other], {
          cwd: process.cwd()
        })
        mergeResult.on('exit', (exitCode: number, status: string) => {
          if (exitCode) {
            return reject(exitCode);
          }
          resolve();
        })
        mergeResult.on('error', (error: any) => {
          this.log(error);
        })
      })
      .catch((exitCode: number) => {
        this.log(`SFDCM CONFLICT (content): Merge conflict in ${args.path}`)
        this.exit(exitCode);
      })
      .then(() => {
        this.exit();
      })


  }
}

export = SfdcMergetool
