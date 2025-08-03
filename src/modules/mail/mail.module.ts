import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MailerModule.forRootAsync({
    // @ts-ignore
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false,
          auth: null,
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: process.env.SMTP_FROM,
        },
        template: {
          dir: __dirname + '/../../templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}