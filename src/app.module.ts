import { Module } from '@nestjs/common';
import { MailController, MailModule } from './modules/mail';
import { MailService } from './modules/mail/mail.service';

@Module({
  imports: [
    MailModule,
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class AppModule {}
