import { EmailServerTemplateName, EmailServerAccountConfirmationByEmailContextParams } from "@circle-vibe/shared";

type TemplateContext = EmailServerAccountConfirmationByEmailContextParams;

export interface MainSendInputDto {
  emails: string[];
  subject: string;
  template: EmailServerTemplateName;
  templateContext: TemplateContext;
}
