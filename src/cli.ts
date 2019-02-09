#!/usr/bin/env node

import { Transmission } from './transmission';

// 有两个参数 ， host 和 port
const action = process.argv[2];
let host = process.argv[3];

if (!host) {
  host = 'localhost';
}

let port = process.argv[4];
if (!port) {
  port = '9091';
}

// TODO use yargs to prepare args
// http://yargs.js.org/

const transmission = new Transmission({ host, port: parseInt(port, 10) });

async function main() {
  if (action === 'list') {
    const result = await transmission.getTorrents();
    for (const x of result) {
      // tslint:disable-next-line:no-console
      console.log(
        `id: ${x.id} \t percent: ${x.percentDone} \t name: ${x.name}`
      );
    }
  } else if (action === 'start') {
    // tslint:disable-next-line:no-console
    console.log('TODO');
  } else {
    // tslint:disable-next-line:no-console
    console.log('usage: node-transmission list host port');
  }
}

main();
