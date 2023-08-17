import {
  Controller,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('upload')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('media'))
  async uploadMediaFile(
  @UploadedFiles() files: Array<Express.Multer.File>,
   //  file: Express.Multer.File,
   @Query('folder') folder?: string,
  ) {
    return this.mediaService.saveMedia(files, folder);
  }
}
