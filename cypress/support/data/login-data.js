const loginData = {
  valid: {
    username: 'Admin',
    password: 'admin123',
  },

  wrongPassword: {
    username: 'Admin',
    password: 'salah123',
  },

  invalid: {
    username: 'UserSalah',
    password: 'passwordSalah',
  },

  sqlInjection: {
    username: "'OR '1'='1",
    password: "'OR '1'='1",
  },
};

export default loginData;