const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { SECRET_KEY = 'some-secret-key' } = process.env;

export { PORT, DB_CONN, SECRET_KEY };
