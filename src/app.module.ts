import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { ThrottlerModule } from '@nestjs/throttler';
import { GlobalStateModule } from './global/global.module';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [GlobalStateModule,TypeOrmModule.forRoot(dataSourceOptions),
     ThrottlerModule.forRoot([
    { name: 'short', ttl: 1000, limit: 1 },
    { name: 'long', ttl: 60000, limit: 100 },
  ]),
     CloudinaryModule,
     ProfileModule
     ],
  controllers: [],
  providers: [
    CloudinaryService
  ]
})
export class AppModule  {
}
