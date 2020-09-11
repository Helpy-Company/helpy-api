import path from 'path';
import SESMailProvider from '../../MailProvider/implementations/SESMailProvider';
import HandleBarsMailTemplateProvider from '../../MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

const newServiceTemplate = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'views',
  'service_creation_notify.hbs',
);

const handleBarsMailTemplateProvider = new HandleBarsMailTemplateProvider();
const sesMailProvider = new SESMailProvider(handleBarsMailTemplateProvider);

export default {
  key: 'sendEmails',
  async handle(data: string): Promise<void> {
    await sesMailProvider.sendMail({
      to: {
        email: data,
      },
      subject: '[Helpy] Novo serviço disponível!',
      templateData: {
        file: newServiceTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}`,
        },
      },
    });
  },
};
