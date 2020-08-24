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
      email: 'team@helpy.com.br',
      name: 'Equipe Helpy',
    },
  },
} as IMailConfig;
