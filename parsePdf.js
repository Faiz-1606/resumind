import pkg from "pdfjs-dist";
const { getDocument, GlobalWorkerOptions } = pkg;

import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


GlobalWorkerOptions.workerSrc = path.join(
  __dirname,
  "node_modules/pdfjs-dist/build/pdf.worker.min.js"
);


export async function parsePdf(buffer) {
  const loadingTask = getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    text += pageText + "\n";
  }

  return text;
}
