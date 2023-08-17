import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { CompanyModule } from 'src/company/company.module';
import { UsersModule } from 'src/users/users.module';
import { WorkModule } from 'src/work/work.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), CompanyModule, UsersModule, WorkModule],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService]
})
export class ListModule {}
