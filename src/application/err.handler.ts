import { Request, Response, NextFunction } from "express";
import errorCodes from "../constants/error.codes";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleError = (error: Error, req: Request, res: Response, _next: NextFunction) => {
    const {message,statusCode} = errorCodes[error.message]
    res.status(statusCode).send(message)
}

export default handleError