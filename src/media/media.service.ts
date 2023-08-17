import { Injectable, NotFoundException } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { IMediaResponse } from './media.interface';

@Injectable()
export class MediaService {
  async saveMedia(
    files: Array<Express.Multer.File>,
    folder = 'files',
  ): Promise<Array<IMediaResponse>> {
    if(files.length > 0){
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);

    files.forEach((file) => {
      writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
    });
    const result = [];
    files.forEach((file) => {
      result.push({
        url: `/uploads/${folder}/${file.originalname}`,
        name: file.originalname,
      });
    });
    return result;
  }
  else {
   throw new NotFoundException('Файлов нет');
  }
  }

}
