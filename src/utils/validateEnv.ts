import { cleanEnv, port, str } from 'envalid'

function validateEnv (): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production']
    }),
    PORT: port({ default: 3000 }),
    JWT_SECRET: str(),
    JWT_EXPIRES_IN: str(),
    DATABASE_NAME: str(),
    DATABASE_PASSWORD: str(),
    DATABASE_USER: str(),
    DATABASE_HOST: str()
  })
}

export default validateEnv
