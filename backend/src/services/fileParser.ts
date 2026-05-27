import fs from 'fs/promises';
import path from 'path';
const pdfParse = require('pdf-parse');

export const parseFile = async (filePath: string, originalName?: string): Promise<string> => {
  try {
    const ext = path.extname(originalName || filePath).toLowerCase();

    if (ext === '.pdf') {
      const dataBuffer = await fs.readFile(filePath);
      const parser = new pdfParse.PDFParse(new Uint8Array(dataBuffer));
      await parser.load();
      const result = await parser.getText();
      return result.text;
    } else if (ext === '.txt') {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error('Failed to parse uploaded material');
  }
};
