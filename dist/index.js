"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const TJS = __importStar(require("typescript-json-schema"));
const util_1 = __importDefault(require("util"));
exports.default = ({ file }) => {
    // optionally pass argument to schema generator
    const settings = {
        required: true,
        ref: false
    };
    // optionally pass ts compiler options
    const compilerOptions = {
        strictNullChecks: true
    };
    const properties = (object) => {
        if (object.type === 'object' && object.properties) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            object = object.properties;
        }
        Object.keys(object || {}).forEach((key) => {
            if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
                object[key] = properties(object[key]);
            }
        });
        return object;
    };
    const items = (object) => {
        if (object.type === 'array' && object.items && typeof object.items === 'object') {
            if (object.required) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                object.items.required = object.required;
            }
            object = [object.items];
        }
        Object.keys(object || {}).forEach((key) => {
            if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
                object[key] = items(object[key]);
            }
        });
        return object;
    };
    const replace = (object) => {
        if (object.type === 'string' && (object.format === 'date-time' || object.format === 'date')) {
            object.type = Date;
            delete object.format;
        }
        if (object.type === 'string') {
            object.type = String;
        }
        if (object.type === 'number') {
            object.type = Number;
        }
        if (object.type === 'boolean') {
            object.type = Boolean;
        }
        if (object.description && typeof object.description === 'string') {
            delete object.description;
        }
        if (object.required && object.required instanceof Array) {
            object.required.forEach((key) => {
                object.properties[key].required = true;
            });
            object.required = undefined;
        }
        if (object.id && /#$/.test(object.id)) {
            delete object.id;
            object.unique = true;
        }
        Object.keys(object || {}).forEach((key) => {
            if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
                object[key] = replace(object[key]);
            }
        });
        return object;
    };
    const program = TJS.getProgramFromFiles([file], compilerOptions);
    const generator = TJS.buildGenerator(program, settings);
    if (generator) {
        const symbols = generator.getMainFileSymbols(program);
        return symbols.map((symbol) => {
            const schema = generator.getSchemaForSymbol(symbol);
            return `export const ${symbol} = ${util_1.default
                .inspect(items(properties(replace(schema))), false, null)
                .replace(/\[Function: ([^\]]+)\]/g, '$1')}`;
        }).join('\n\n');
    }
    return;
};
//# sourceMappingURL=index.js.map