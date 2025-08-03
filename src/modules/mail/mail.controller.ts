import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MainSendInputDto } from './dtos';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @HttpCode(200)
  async sendMail(@Body() body: MainSendInputDto) {
    if (!body?.emails.length || !body?.template) {
      return new BadRequestException();
    }

    const response = await this.mailService.sendMail({
      subject: body.subject,
      template: body.template,
      context: body.templateContext,
    }, {
      emails: body.emails,
    });

    if (!response) {
      return new BadRequestException();
    }

    return { message: 'Email`s sent successfully' };
  }
}
