import { Command, flags } from '@oclif/command'

class SfdcMergetool extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with no value (-f, --force)
  }

  static args = [
    { name: 'one' },
    { name: 'two' },
    { name: 'three' },
  ]


  async run() {
    const { args, flags } = this.parse(SfdcMergetool)

    const name = 'world'
    this.log(`hello ${name} from ./src/index.ts`)

    this.log(`First Argument: ${args.one}`)
    this.log(`Second Argument: ${args.two}`)
    this.log(`Third Argument: ${args.three}`)

  }
}

export = SfdcMergetool
