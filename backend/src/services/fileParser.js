"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const pdfParse = require('pdf-parse');
const parseFile = async (filePath, originalName) => {
    try {
        const ext = path_1.default.extname(originalName || filePath).toLowerCase();
        if (ext === '.pdf') {
            const dataBuffer = await promises_1.default.readFile(filePath);
            const parser = new pdfParse.PDFParse(new Uint8Array(dataBuffer));
            await parser.load();
            const result = await parser.getText();
            return result.text;
        }
        else if (ext === '.txt') {
            const content = await promises_1.default.readFile(filePath, 'utf-8');
            return content;
        }
        else {
            throw new Error('Unsupported file type');
        }
    }
    catch (error) {
        console.error('Error parsing file:', error);
        throw new Error('Failed to parse uploaded material');
    }
};
exports.parseFile = parseFile;
//# sourceMappingURL=fileParser.js.map