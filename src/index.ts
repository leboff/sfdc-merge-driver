import { Command, flags } from '@oclif/command'
import { parseString, convertableToString } from 'xml2js'
import { readFile } from 'fs-extra'
import * as inquirer from 'inquirer'
import * as util from 'util'

const xmlParser = <(xml: convertableToString, options?: any) => Promise<any>>util.promisify(parseString)

async function _readFiles(base: any, local: any, remote: any) {
  let baseData: any = await readFile(base)
  let localData: any = await readFile(local)
  let remoteData: any = await readFile(remote)

  return [baseData, localData, remoteData]
}

async function _parseFiles(data: any) {
  let baseData: any = await xmlParser(data[0])
  let localData: any = await xmlParser(data[1])
  let remoteData: any = await xmlParser(data[2])

  return [baseData, localData, remoteData]
}

function _diff(base: any, data: any) {

  let diffResult = {
    added: [],
    modified: [],
    deleted: []
  };

  let mapA = base.CustomObject.fields;
  let mapB = data.CustomObject.fields;

  mapB.forEach((bField: any) => {
    let foundField = false;
    mapA.forEach((aField: any) => {
      if (bField.fullName[0] === aField.fullName[0]) {
        if (JSON.stringify(bField) !== JSON.stringify(aField)) {
          diffResult.modified = diffResult.modified.concat(bField)
        }
        foundField = true;
        return;
      }
    })
    if (!foundField) {
      diffResult.added = diffResult.added.concat(bField);
    }
  })

  mapA.forEach((aField: any) => {
    let foundField = false;
    mapB.forEach((bField: any) => {
      if (bField.fullName[0] === aField.fullName[0]) {
        foundField = true;
        return;
      }
    })
    if (!foundField) {
      diffResult.deleted = diffResult.deleted.concat(aField);
    }
  })

  return diffResult;
}
function _getDiff(data: any) {
  let local = data[1];
  let remote = data[2];

  return _diff(local, remote)

}

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
    this.log(`Third Argument: ${args.three}`);

    let data: any = await _readFiles(args.one, args.two, args.three)

    let parsed: any = await _parseFiles(data)

    //diff
    let diff: any = _getDiff(parsed)


    // console.log(JSON.stringify(diff));
    let remoteAdded = diff.added.map((item: any) => ({ name: item.fullName[0], checked: true }))
    let responses: any = await inquirer.prompt([{
      name: 'added',
      message: 'Select which added by remote',
      type: 'checkbox',
      choices: remoteAdded,
    }]);
    this.log(responses);
    this.exit(1);


    // return readFile(args.one)
    //   .then((data: any) => {
    //     return new Promise((resolve, reject) => {
    //       parseString(data, function (err, result) {
    //         if (err) return reject(err)
    //         resolve(result);
    //       });
    //     })

    //   })
    //   .then((result: any) => {

    //   })
    //   .then(() => this.exit(1));
  }
}

export = SfdcMergetool
