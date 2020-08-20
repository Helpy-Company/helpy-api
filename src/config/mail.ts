interface IMailConfig {
  driver: 'ethereal' | 'ses',
  default: {
    from: {
      email: string,
      name: string
    }
  }
}

export default {
  driver: String(process.env.MAIL_DRIVER) || 'ethereal',

  default: {
    from: {
      email: 'contact@findservice.com',
      name: 'Equipe FindService',
    },
  },
} as IMailConfig;
