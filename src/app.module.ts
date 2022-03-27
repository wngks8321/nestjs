import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
