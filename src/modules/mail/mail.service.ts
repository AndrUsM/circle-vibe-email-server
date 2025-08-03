import { SentMessageInfo } from 'nodemailer';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

import { SendMainParamsInput } from './params';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendMail(options: ISendMailOptions, context: SendMainParamsInput) {
    const { emails } = context;
    const { template } = options;

    if (!emails.length || !template || !options.subject || !options.context) {
      return;
    }

    try {
      const sendMailParams = {
        to: emails,
        from: process.env.SMTP_FROM,
        subject: options.subject,
        template,
        context: options.context,
      };

      const response: SentMessageInfo = await this.mailerService.sendMail(sendMailParams);

      return response;
    } catch (error) {
      this.logger.error(
        `Error while sending mail with the following parameters : ${JSON.stringify(
          options,
        )}`,
        error,
      );

      return null;
    }
  }
}
