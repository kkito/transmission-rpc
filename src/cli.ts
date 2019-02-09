#!/usr/bin/env node

import { Transmission } from './transmission';

// 有两个参数 ， host 和 port
const host = process.argv[2];
let port = process.argv[3];
if (!port) {
  port = '9091';
}

const transmission = new Transmission({ host, port: parseInt(port, 10) });

async function main() {
  const result = await transmission.getTorrents();
  // tslint:disable-next-line:no-console
  console.log(result);
}
// tslint:disable-next-line:no-console
console.log('hello world2');

// tslint:disable-next-line:no-console
console.log(host);

// tslint:disable-next-line:no-console
console.log(port);

main();
