import { selectPages } from "../services/pdf.lib"
import path from "path";
import fs from 'fs'
import crypto from "crypto";

//uploads the pdf and converts it by selecting only the desired pages. later saves in the server.
//returns the file name.
export const uploadPDF = async (file: Express.Multer.File, selectedPages: number[]) => {

    selectedPages.sort((a, b) => a - b);

    console.log(file)
    const modifiedPDF = await selectPages(file.buffer, selectedPages);

    const fileName = crypto.randomBytes(3).toString('hex') + '_' + file.originalname;

    const filePath = path.join(__dirname, '../assets', fileName);
    try {
        fs.writeFileSync(filePath, modifiedPDF);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.log(error)
        throw new Error('INTERNAL_SERVER_ERROR')
    }
    return { fileName }
}


/**
 * 
 * @param fileName name of the file
 * @returns the pdf in binary format
 */

export const downloadPDF = async (fileName: string) => {

    const filePath = path.join(__dirname, '../assets', fileName);

    return new Promise((res, rej) => {
        fs.stat(filePath, (err) => {
            if (err) {
                return rej(new Error("NOT_FOUND"))
            }

            fs.readFile(filePath, (error, data) => {
                if (error) {
                    return rej(new Error("INTERNAL_SERVER_ERROR"))
                }
                res(data)
            })
        })
    })

}