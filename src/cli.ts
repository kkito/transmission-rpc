#!/usr/bin/env node

import { Transmission } from './transmission';

// 有两个参数 ， host 和 port
// TODO remove all nessseary log
// TODO 通过addedDate 获取 完成比率
const action = process.argv[2];
const param = process.argv[3];
const param2 = process.argv[4];

let host = process.env.host;

if (!host) {
  host = 'localhost';
}

let port = process.env.port;
if (!port) {
  port = '9091';
}

// TODO use yargs to prepare args
// http://yargs.js.org/

const transmission = new Transmission({ host, port: parseInt(port, 10) });

async function main() {
  if (action === 'list') {
    // 列出所有现有列表
    const result = await transmission.getTorrents();
    for (const x of result) {
      // tslint:disable-next-line:no-console
      console.log(
        `id: ${x.id} \t percent: ${x.percentDone} \t addDate: ${new Date(x.addedDate ? x.addedDate * 1000 : '')} \t name: ${x.name}`
      );
    }
  } else if (action === 'list-finished') {
    const result = await transmission.getTorrents();
    // tslint:disable-next-line:no-console
    const finished = result.filter(x => x.percentDone && x.percentDone >= 1);
    for (const x of finished) {
      // tslint:disable-next-line:no-console
      console.log(
        `id: ${x.id} \t percent: ${x.percentDone} \t name: ${x.name}`
      );
    }
  } else if (action === 'list-working') {
    const result = await transmission.getTorrents();
    // tslint:disable-next-line:no-console
    const working = result.filter(x => !x.percentDone || x.percentDone < 1);
    for (const x of working) {
      // tslint:disable-next-line:no-console
      console.log(
        `id: ${x.id} \t percent: ${x.percentDone} \t name: ${x.name}`
      );
    }
  } else if (action === 'add') {
    // 开始下载 ， 参数1 torrent 文件路径 ， 参数2 下载保存路径
    // tslint:disable-next-line:no-console
    const result = await transmission.startTorrent(param, param2);
    // tslint:disable-next-line:no-console
    console.log(`start download ${param} with id: ${result}`);
  } else {
    // tslint:disable-next-line:no-console
    console.log('usage: node-transmission list host port');
  }
}

main();
