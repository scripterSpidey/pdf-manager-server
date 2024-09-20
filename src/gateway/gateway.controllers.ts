import { Response, Request, NextFunction } from "express";
import { downloadPDF, uploadPDF } from "../application/app.controllers";

export const onUploadPDF = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file;
        const body = req.body as { selectedPages: string }
        const pagesArray = JSON.parse(body.selectedPages)
        const data = await uploadPDF(file!, pagesArray);
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}

export const onDownloadPDF = async (req: Request, res: Response, next: NextFunction) => {
    const { fileName } = req.params;
    downloadPDF(fileName)
        .then((data) => {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Deposition', `attachment; fileName=${fileName}`);
            res.send(data)
        })
        .catch(error => next(error))
}
