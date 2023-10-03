"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var fs = require("fs");
var path = require("path");
var pdf_lib_1 = require("pdf-lib");
var readline = require("readline");
var OUTPUT_BASE_DIR = '/Users/alexwelcing/Desktop/Output-Docs/';
var COMBINED_DIR = path.join(OUTPUT_BASE_DIR, 'Combined');
var CL_DIR = path.join(OUTPUT_BASE_DIR, 'CL');
var RESUME_DIR = path.join(OUTPUT_BASE_DIR, 'Resume');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise(function (resolve) {
        rl.question(query, function (answer) {
            resolve(answer);
        });
    });
}
function writePdfBytesToFile(directory, fileName, pdfBytes) {
    return __awaiter(this, void 0, void 0, function () {
        var fullPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fullPath = path.join(directory, fileName);
                    return [4 /*yield*/, fs.promises.writeFile(fullPath, pdfBytes)];
                case 1:
                    _a.sent();
                    console.log("File saved: ".concat(fullPath));
                    return [2 /*return*/];
            }
        });
    });
}
function splitPdf(pathToPdf) {
    return __awaiter(this, void 0, void 0, function () {
        var documentAsBytes, pdfDoc, numberOfPages, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.promises.readFile(pathToPdf)];
                case 1:
                    documentAsBytes = _a.sent();
                    return [4 /*yield*/, pdf_lib_1.PDFDocument.load(documentAsBytes)];
                case 2:
                    pdfDoc = _a.sent();
                    numberOfPages = pdfDoc.getPages().length;
                    _loop_1 = function (i) {
                        var companyName, subDocument, pagesToCopy, copiedPages, _i, copiedPages_1, page, pdfBytes, combinedFileName, clFileName, resumeFileName;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, askQuestion("Enter the company name for iteration ".concat((i / 3) + 1, ": "))];
                                case 1:
                                    companyName = _b.sent();
                                    return [4 /*yield*/, pdf_lib_1.PDFDocument.create()];
                                case 2:
                                    subDocument = _b.sent();
                                    pagesToCopy = Math.min(3, numberOfPages - i);
                                    return [4 /*yield*/, subDocument.copyPages(pdfDoc, Array.from({ length: pagesToCopy }, function (_, idx) { return i + idx; }))];
                                case 3:
                                    copiedPages = _b.sent();
                                    for (_i = 0, copiedPages_1 = copiedPages; _i < copiedPages_1.length; _i++) {
                                        page = copiedPages_1[_i];
                                        subDocument.addPage(page);
                                    }
                                    return [4 /*yield*/, subDocument.save()];
                                case 4:
                                    pdfBytes = _b.sent();
                                    combinedFileName = "".concat(companyName, "_part-").concat((i / 3) + 1, ".pdf");
                                    clFileName = "".concat(companyName, "_CL-").concat((i / 3) + 1, ".pdf");
                                    resumeFileName = "".concat(companyName, "_Resume-").concat((i / 3) + 1, ".pdf");
                                    return [4 /*yield*/, writePdfBytesToFile(COMBINED_DIR, combinedFileName, pdfBytes)];
                                case 5:
                                    _b.sent();
                                    return [4 /*yield*/, writePdfBytesToFile(CL_DIR, clFileName, pdfBytes)];
                                case 6:
                                    _b.sent();
                                    return [4 /*yield*/, writePdfBytesToFile(RESUME_DIR, resumeFileName, pdfBytes)];
                                case 7:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < numberOfPages)) return [3 /*break*/, 6];
                    return [5 /*yield**/, _loop_1(i)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i += 3;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function processDirectory(directory) {
    return __awaiter(this, void 0, void 0, function () {
        var files, pdfFiles, _i, pdfFiles_1, pdfFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.promises.readdir(directory)];
                case 1:
                    files = _a.sent();
                    pdfFiles = files.filter(function (file) { return path.extname(file).toLowerCase() === '.pdf'; });
                    _i = 0, pdfFiles_1 = pdfFiles;
                    _a.label = 2;
                case 2:
                    if (!(_i < pdfFiles_1.length)) return [3 /*break*/, 5];
                    pdfFile = pdfFiles_1[_i];
                    return [4 /*yield*/, splitPdf(path.join(directory, pdfFile))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var directory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                directory = './';
                return [4 /*yield*/, processDirectory(directory)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
