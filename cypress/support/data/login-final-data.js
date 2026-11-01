
const loginData = {
    validUser: {
        username: 'Admin',
        password: 'admin123',
    },

    invalidUser: {
        username: 'UserSalah',
        password: 'passwordSalah',
    },

    wrongPassword: {
        username: 'Admin',
        password: 'salah123',
    },

    sqlInjection: {
        username: "'OR '1'='1",
        password: "'OR '1'='1",
    },

    xss: {
        username: "<script>alert('XSS')</script>",
        password: 'admin123',
    },
};

export default loginData;
