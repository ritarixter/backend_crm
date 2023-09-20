import { Injectable, NotFoundException } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { IMediaResponse } from './media.interface';
import * as fs from 'fs';

@Injectable()
export class MediaService {
  async saveMedia(
    files: Array<Express.Multer.File>,
    folder = 'files',
    access: string,
  ): Promise<Array<IMediaResponse>> {
    if (files.length > 0) {
      const uploadFolder = `${path}/uploads/${folder}`;
      await ensureDir(uploadFolder);

      files.forEach((file) => {
        writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      });
      const result = [];
      files.forEach((file) => {
        console.log(file.originalname);
        result.push({
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
          access: access,
        });
      });
      return result;
    } else {
      throw new NotFoundException('Файлов нет');
    }
  }

  deleteFile(filePath: string): boolean {
    fs.unlink(`${path}${filePath}`, (err) => {
      if (err) {
        throw new NotFoundException('Файл не найден');
      }
    });
    return true;
  }
}
