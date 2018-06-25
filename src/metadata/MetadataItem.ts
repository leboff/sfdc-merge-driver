import {
  readFile,
  writeFile
} from 'fs-extra'
import {
  parseString,
  convertableToString,
  Builder
} from 'xml2js'
import {
  promisify
} from 'util'
import {
  deserialize
} from "serializer.ts/Serializer"
import {
  CustomObject
} from './CustomObject'
import {
  PermissionSet
} from './PermissionSet'
import {
  Metadata
} from './Metadata'
import {
  Workflow
} from './Workflow';
import {
  Profile
} from './Profile';
import {
  SharingRules
} from './SharingRule';
import {
  AssignmentRules
} from './AssignmentRule';
import {
  Merge
} from '../merger';
import * as _ from 'lodash'
import {
  CLIError
} from '@oclif/errors'

const xmlParser = < (xml: convertableToString, options ? : any) => Promise < any >> promisify(parseString)

class meta {
  fileName: string = ''
  type ? : string
}

class UnsupportedMetadataError extends Error {
  constructor(...args) {
    super(`Metadata of type ${args[0]} is unsupported. Using git merge`)
    Error.captureStackTrace(this, UnsupportedMetadataError)
  }
}


export class MetadataItem extends Metadata {
  [index: string]: any
  private meta: meta
  constructor(fileName: string) {
    super('')
    this.meta = {
      fileName: fileName
    }
  }

  get(param: string) {
    return this[param];
  }

  encodeHTML(val: string) {
    return val.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  async parse() {
    if (!this.meta.type) {
      let file: any = await readFile(this.meta.fileName)
      let parsed = await xmlParser(file, {
        explicitArray: true
      })
      const type = Object.keys(parsed)[0]

      this.meta.type = type;
      Object.assign(this, this.decereal(parsed[type]))

    }

    return this
  }

  private decereal(data: object) {
    let type = this.meta.type;
    if (!type) throw new UnsupportedMetadataError(this.meta.type);

    if (type === 'CustomObject') return deserialize < Metadata > (CustomObject, data)
    if (type === 'Workflow') return deserialize < Metadata > (Workflow, data)
    if (type === 'Profile') return deserialize < Metadata > (Profile, data)
    if (type === 'AssignmentRules') return deserialize < Metadata > (AssignmentRules, data)
    if (type === 'SharingRules') return deserialize < Metadata > (SharingRules, data)
    if (type === 'PermissionSet') return deserialize < Metadata > (PermissionSet, data)


    else {
      throw new UnsupportedMetadataError(this.meta.type)
    }
  }

  build() {
    let type = this.meta.type
    var builder = new Builder({
      rootName: type,
      xmldec: {
        version: '1.0',
        encoding: 'UTF-8'
      },
      doctype: {
        stringify: {
          eleText: (val: string) => {
            return this.encodeHTML(val)
          },
        },
      },
      explicitRoot: false,
      renderOpts: {
        pretty: true,
        indent: '    ',
        newline: '\n',
      },
    });

    let buildable: any = _.toPairs(_.omit(this, ['meta', 'fullName']));
    buildable = _.sortBy(buildable, 0)
    buildable = _.fromPairs(buildable);

    let built = builder.buildObject(buildable) + '\n'
    return built
  }

  async write() {
    let fileName = this.meta.fileName
    try {
      let built = this.build()
      return writeFile(fileName, built)
    } catch (e) {
      console.log(e);
    }
  }


  stringify() {
    return JSON.stringify(this)
  }

}


export async function MetadataMerge(base: MetadataItem, current: MetadataItem, other: MetadataItem) {

  await current.parse()
  await other.parse()
  await base.parse()

  const merge = new Merge(base, current, other);
  const merged = merge.merge();
  return merged;

}
