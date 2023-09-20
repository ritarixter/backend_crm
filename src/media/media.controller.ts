import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('upload')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('media'))
  async uploadMediaFile(
  @UploadedFiles() files: Array<Express.Multer.File>,
  @Req() req: { user: User },
   //  file: Express.Multer.File,
  @Query('folder') folder?: string,
  ) {
    return this.mediaService.saveMedia(files, folder, req.user.access);
  }

  
  @Delete()
  @UseGuards(JwtGuard)
  remove(@Body('filePath') filePath: string) {
    return this.mediaService.deleteFile(filePath);
  }
}


