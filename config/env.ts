import * as dotenv from 'dotenv';
/** define your own env */
export type Env = 'local' | 'dev' | 'test' | 'uat' | 'prd';
export interface IConfig {
  [name: string]: string;
}
export const ENV = (process.env.ENV || 'TEST')
  .toLocaleLowerCase()
  .split(/[\s,]+/gi) as Env[];

const resolveUrl = (url: string = '/') => `${url}/`.replace(/\/+/gi, '/');

const transformEnv = (env: Env | 'local'): IConfig => {

  try {
    const { PUBLIC_URL, ...rest } = dotenv.config({
      path: `.env.${env}`,
    }).parsed as IConfig;
    console.log(" transformEnv process.env", process.env)
    return {
      PUBLIC_URL: resolveUrl(PUBLIC_URL),
      ...rest,
    };
  } catch (e) {
    return {};
  }
};
export default (env: Env): IConfig => Object.assign(transformEnv(env));
