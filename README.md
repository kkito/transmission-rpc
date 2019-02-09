
# transmission rpc client
[![Build Status](https://travis-ci.org/kkito/transmission-rpc.svg?branch=master)](https://travis-ci.org/kkito/transmission-rpc)
[![npm version](https://badge.fury.io/js/kkito-transmission-rpc.svg)](https://badge.fury.io/js/kkito-transmission-rpc)

transmission daemon client

the rpc client by using node
[https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt](https://trac.transmissionbt.com/browser/trunk/extras/rpc-spec.txt)




## how to use

```ts
import { Transmission } from './src/transmission'
const t = new Transmission({ host: '192.168.x.x' });
// const token = await t.getToken();
const result = await t.getTorrents();
// tslint:disable-next-line:no-console
// console.log(token);

// const result = await t.getTorrentInfo("1");
// const result = await t.getTorrents()
// const result = await t.startTorrent('./jYAlukcm.torrent' , '/mnt/sda1/');
// const result = await t.removeTorrent(12);
// tslint:disable-next-line:no-console
console.log(result);

```

## 本地测试安装

`npm install -g .`
