import PDFMerger from "pdf-merger-js";
import fs from "fs";
import path from "path";
import { documentos } from "./documentos.js";

async function mergeToPdf(doc) {
  const directorio = `./Listos/${doc}`;
  if (!fs.existsSync(directorio)) {
    fs.mkdirSync(directorio);
  }

  const merger = new PDFMerger();
  await Promise.all([
    await merger.add(`./Doc/${doc}/${doc}.pdf`),
    await merger.add(`./Doc/${doc}/HC.pdf`),
    await merger.add(`./Doc/${doc}/ADRES.pdf`),
  ]);
  await merger.save(path.join(directorio, `${doc}.pdf`));
  console.log("Lista:", doc);
}

async function mergeAllDocuments() {
  await Promise.all(documentos.map(mergeToPdf));
}

mergeAllDocuments();
