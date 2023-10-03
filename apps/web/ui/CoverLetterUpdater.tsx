import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument } from 'pdf-lib';
import * as readline from 'readline';

const OUTPUT_BASE_DIR = '/Users/alexwelcing/Desktop/Output-Docs/';
const COMBINED_DIR = path.join(OUTPUT_BASE_DIR, 'Combined');
const CL_DIR = path.join(OUTPUT_BASE_DIR, 'CL');
const RESUME_DIR = path.join(OUTPUT_BASE_DIR, 'Resume');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}

async function writePdfBytesToFile(directory: string, fileName: string, pdfBytes: Uint8Array): Promise<void> {
    const fullPath = path.join(directory, fileName);
    await fs.promises.writeFile(fullPath, pdfBytes);
    console.log(`File saved: ${fullPath}`);
}

async function splitPdf(pathToPdf: string): Promise<void> {
    const documentAsBytes = await fs.promises.readFile(pathToPdf);
    const pdfDoc = await PDFDocument.load(documentAsBytes);
    const numberOfPages = pdfDoc.getPages().length;

    for (let i = 0; i < numberOfPages; i += 3) {
        const companyName = await askQuestion(`Enter the company name for iteration ${(i / 3) + 1}: `);

        const subDocument = await PDFDocument.create();
        const pagesToCopy = Math.min(3, numberOfPages - i);
        const copiedPages = await subDocument.copyPages(pdfDoc, Array.from({ length: pagesToCopy }, (_, idx) => i + idx));
        for (const page of copiedPages) subDocument.addPage(page);
        const pdfBytes = await subDocument.save();

        const combinedFileName = `${companyName}_part-${(i / 3) + 1}.pdf`;
        const clFileName = `${companyName}_CL-${(i / 3) + 1}.pdf`;
        const resumeFileName = `${companyName}_Resume-${(i / 3) + 1}.pdf`;

        await writePdfBytesToFile(COMBINED_DIR, combinedFileName, pdfBytes);
        await writePdfBytesToFile(CL_DIR, clFileName, pdfBytes);
        await writePdfBytesToFile(RESUME_DIR, resumeFileName, pdfBytes);
    }
}

async function processDirectory(directory: string): Promise<void> {
    const files = await fs.promises.readdir(directory);
    const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');

    for (const pdfFile of pdfFiles) {
        await splitPdf(path.join(directory, pdfFile));
    }

    rl.close();
}

(async () => {
    const directory = './';
    await processDirectory(directory);
})();
