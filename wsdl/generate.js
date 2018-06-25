"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var xml2js_1 = require("xml2js");
var fs_extra_1 = require("fs-extra");
var util = require("util");
var path = require("path");
var xmlParser = util.promisify(xml2js_1.parseString);
var typeMap;
(function (typeMap) {
    typeMap["xsd:string"] = "string";
    typeMap["xsd:boolean"] = "boolean";
    typeMap["xsd:int"] = "number";
    typeMap["xsd:double"] = "number";
})(typeMap || (typeMap = {}));
function generateFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var data, parsed, simpleTypes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.readFile(path.join(__dirname, './metadata.wsdl'))];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, xmlParser(data, {
                            tagNameProcessors: [xml2js_1.processors.stripPrefix]
                        })];
                case 2:
                    parsed = _a.sent();
                    simpleTypes = [];
                    console.log("import { Type } from 'serializer.ts/Decorators'");
                    parsed.definitions.types[0].schema[0].simpleType.forEach(function (type) {
                        var name = type.$.name;
                        if (type.restriction[0].enumeration) {
                            var strings = type.restriction[0].enumeration.map(function (res) {
                                return " \"" + res.$.value + "\" ";
                            });
                            console.log("type " + name + " = " + strings.join('|') + ";");
                        }
                        else {
                            console.log("type " + name + " = " + typeMap[type.restriction[0].$.base] + ";");
                        }
                        simpleTypes.push(name);
                    });
                    parsed.definitions.types[0].schema[0].complexType.forEach(function (type) {
                        var name = type.$.name;
                        if (type.sequence) {
                            console.log("export class " + name + " {");
                            type.sequence[0].element.forEach(function (el) {
                                var t = el.$.type;
                                var mapping;
                                if (t.indexOf('tns:') == 0) {
                                    var a = t.replace('tns:', '');
                                    mapping = "" + a;
                                    if (simpleTypes.indexOf(a) < 0) {
                                        console.log("        @Type(() => " + a + ")");
                                    }
                                }
                                else {
                                    mapping = typeMap[el.$.type] || 'any';
                                }
                                console.log("        " + el.$.name + (el.$.minOccurs == 0 ? '?' : '!') + ": " + mapping + " " + (el.$.maxOccurs ? '[]' : '') + ";");
                            });
                            console.log("}");
                        }
                        if (type.complexContent) {
                            console.log("export class " + name + " extends " + type.complexContent[0].extension[0].$.base.replace('tns:', '') + " {");
                            if (type.complexContent[0].extension[0].sequence[0].element) {
                                type.complexContent[0].extension[0].sequence[0].element.forEach(function (el) {
                                    var t = el.$.type;
                                    var mapping;
                                    if (t.indexOf('tns:') == 0) {
                                        var a = t.replace('tns:', '');
                                        mapping = "" + a;
                                        if (simpleTypes.indexOf(a) < 0) {
                                            console.log("        @Type(() => " + a + ")");
                                        }
                                    }
                                    else {
                                        mapping = typeMap[el.$.type] || 'any';
                                    }
                                    console.log("        " + el.$.name + (el.$.minOccurs == 0 ? '?' : '!') + ": " + mapping + " " + (el.$.maxOccurs ? '[]' : '') + ";");
                                });
                            }
                            console.log("}");
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
generateFiles();
