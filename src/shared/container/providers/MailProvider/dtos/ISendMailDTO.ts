import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name?: string;
  email: string | string[];
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
};
