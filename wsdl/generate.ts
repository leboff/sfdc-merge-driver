import {
  parseString,
  convertableToString,
  processors
} from 'xml2js'
import {
  readFile
} from 'fs-extra'
import * as util from 'util'
import * as path from 'path'

const xmlParser = < (xml: convertableToString, options: any) => Promise < any >> util.promisify(parseString)


enum typeMap {
  'xsd:string' = 'string',
  'xsd:boolean' = 'boolean',
  'xsd:int' = 'number',
  'xsd:double' = 'number'
}

async function generateFiles() {
  let data = await readFile(path.join(__dirname, './metadata.wsdl'));

  let parsed = await xmlParser(data, {
    tagNameProcessors: [processors.stripPrefix]
  });
  let simpleTypes: any[] = [];
  console.log(`import { Type } from 'serializer.ts/Decorators'`)
  parsed.definitions.types[0].schema[0].simpleType.forEach((type: any) => {
    let name = type.$.name;
    if (type.restriction[0].enumeration) {
      let strings = type.restriction[0].enumeration.map((res: any) => {
        return ` "${res.$.value}" `;
      })
      console.log(`type ${name} = ${strings.join('|')};`)
    } else {
      console.log(`type ${name} = ${typeMap[type.restriction[0].$.base]};`)
    }
    simpleTypes.push(name);


  })

  parsed.definitions.types[0].schema[0].complexType.forEach((type: any) => {
    let name = type.$.name;
    if (type.sequence) {

      console.log(`export class ${name} {`);

      type.sequence[0].element.forEach((el: any) => {
        let t = el.$.type;

        let mapping;
        if (t.indexOf('tns:') == 0) {
          let a = t.replace('tns:', '');
          mapping = `${a}`
          if(simpleTypes.indexOf(a) < 0){
            console.log(`        @Type(() => ${a})`)
          }
        } else {
          mapping = typeMap[el.$.type] || 'any';
        }

        console.log(`        ${el.$.name}${el.$.minOccurs == 0 ? '?' : '!'}: ${mapping} ${el.$.maxOccurs ? '[]' : ''};`);
      });
      console.log(`}`)
    }
    if (type.complexContent) {

      console.log(`export class ${name} extends ${type.complexContent[0].extension[0].$.base.replace('tns:', '')} {`);

      if (type.complexContent[0].extension[0].sequence[0].element) {
        type.complexContent[0].extension[0].sequence[0].element.forEach((el: any) => {
          let t = el.$.type;

          let mapping;
          if (t.indexOf('tns:') == 0) {
            let a = t.replace('tns:', '');
            mapping = `${a}`
            if(simpleTypes.indexOf(a) < 0){
              console.log(`        @Type(() => ${a})`)
            }
          } else {
            mapping = typeMap[el.$.type] || 'any';
          }
          console.log(`        ${el.$.name}${el.$.minOccurs == 0 ? '?' : '!'}: ${mapping} ${el.$.maxOccurs ? '[]' : ''};`);
        });
      }
      console.log(`}`)

    }
  })
}

generateFiles();
