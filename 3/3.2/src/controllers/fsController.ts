import { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';

export async function saveCover(req: Request, res: Response, id: string) {
   return new Promise<void>((resolve, reject) => {
     if (req.files && !Array.isArray(req.files.cover)) {
       const sampleFile: UploadedFile = req.files.cover;
       const uploadPath: string = __dirname + '/../../views/books-page_files/' + id + '.jpg';
       sampleFile.mv(uploadPath, async (err) => {
         if (err) reject(err);
         else resolve();
       });
     } else reject('No files were uploaded');
   });
 }