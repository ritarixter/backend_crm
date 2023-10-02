import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ListModule } from './lists/list.module';
import { ConfigModule } from '@nestjs/config';
import { WorkModule } from './work/work.module';
import { PlanModule } from './plan/plan.module';
import { CompanyModule } from './company/company.module';
import { CommercialProposalModule } from './commercial-proposal/commercial-proposal.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { MediaModule } from './media/media.module';
import { StockModule } from './stock/stock.module';
import { StepModule } from './step/step.module';
import { CommentModule } from './comment/comment.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      
    }),
    UsersModule,
    ListModule,
    WorkModule,
    PlanModule,
    CompanyModule,
    CommercialProposalModule,
    AuthModule,
    TasksModule,
    MediaModule,
    StockModule,
    StepModule,
    CommentModule,
    NotifyModule,
    //WebsocketsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
