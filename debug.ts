import { Transmission } from './src/transmission'
async function main() {
  const t = new Transmission({ host: '192.168.123.36' });
  // const token = await t.getToken();
  const token = await t.getTorrents();
  // tslint:disable-next-line:no-console
  console.log(token);
}
main();
