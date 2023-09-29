import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { Notify } from './entities/notify.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from 'src/lists/list.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notify]), ListModule, UsersModule],
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
