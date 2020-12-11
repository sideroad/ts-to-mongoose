"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const opts_1 = __importDefault(require("opts"));
const index_1 = __importDefault(require("./index"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
opts_1.default.parse([
    {
        short: 's',
        long: 'source',
        required: true,
        value: true,
        description: 'Target source files path. ( glob pattern )'
    },
    {
        short: 'd',
        long: 'dist',
        required: true,
        value: true,
        description: 'Dist dirctory path.'
    },
    {
        short: 'e',
        long: 'ext',
        required: false,
        value: true,
        description: 'Extension of output file.'
    }
], true);
const source = String(opts_1.default.get('source'));
const dist = String(opts_1.default.get('dist'));
const ext = String(opts_1.default.get('ext') || 'mongoose.ts');
fs_extra_1.default.emptyDirSync(dist);
const matches = glob_1.glob.sync(source);
matches.forEach((file) => {
    const schema = index_1.default({ file });
    fs_extra_1.default.writeFileSync(path_1.default.join(dist, `${path_1.default.basename(file, '.ts')}.${ext}`), schema || '', 'utf-8');
});
//# sourceMappingURL=cli.js.map