
import { createWorker } from 'tesseract.js';

async function readImage(image, language = "spa") {
    const worker = await createWorker(language);
    const ret = await worker.recognize(image);
    await worker.terminate();
    return ret.data.text;
}

export default readImage;