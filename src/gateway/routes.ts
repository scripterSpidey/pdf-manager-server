import express from "express"
import multer from "multer";
import { onDownloadPDF, onUploadPDF } from "./gateway.controllers";

const storage = multer.memoryStorage();
const upload = multer({ storage })

const router = express.Router()

router.route('/upload')
    .post(upload.single('pdf'),onUploadPDF);

router.route('/download/:fileName')
    .get(onDownloadPDF)

export default router;