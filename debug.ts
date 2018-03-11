import { Transmission } from './src/transmission'
async function main() {
  const t = new Transmission({ host: '192.168.123.36' });
  // const token = await t.getToken();
  const result = await t.getTorrents();
  // tslint:disable-next-line:no-console
  // console.log(token);

  // const result = await t.getTorrentInfo("1");
  // const result = await t.getTorrents()
  // const result = await t.startTorrent('./KOCfYI7G.torrent');
  // const result = await t.removeTorrent(10);
  // tslint:disable-next-line:no-console
  console.log(result);
}
main();
