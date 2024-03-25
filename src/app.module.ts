import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import typeorm from './config/db.config';
import { TYPEORM_CONFIG } from './common/constants/config';
import { MovieModule } from './movie/movie.module';
import { RoomModule } from './room/room.module';
import { SeatModule } from './seat/seat.module';
import { ScreeningModule } from './screening/screening.module';
import { ScreeningSeatModule } from './screeningSeat/screeningSeat.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await configService.get(TYPEORM_CONFIG),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TokenModule,
    MovieModule,
    RoomModule,
    SeatModule,
    ScreeningModule,
    ScreeningSeatModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
