 import { Module } from '@nestjs/common';
 import { ServeStaticModule } from '@nestjs/serve-static';
 import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { path } from 'app-root-path'

 @Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads'
    }),
  ],
   providers: [MediaService],
   controllers: [MediaController],
})
export class MediaModule {}
