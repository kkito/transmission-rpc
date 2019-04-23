import { Utils } from '../src/utils';

test('fmtRate valid', () => {
  let result = Utils.fmtRate(2037000);
  expect(result).toEqual('1.94M/s');
  result = Utils.fmtRate(237000);
  expect(result).toEqual('231.45k/s');
  result = Utils.fmtRate(237);
  expect(result).toEqual('237B/s');
});

test('timestampToLocalDateStr', () => {
  let result = Utils.timestampToLocalDateStr(1556016217);
  // T_LOCALE=cn-ZH T_TZ=Asia/Shanghai
  expect(result).toEqual('4/23/2019, 10:43:37 AM');
  process.env.T_TZ = 'Asia/Shanghai';
  process.env.T_LOCALE = 'cn-ZH';
  result = Utils.timestampToLocalDateStr(1556016217);
  expect(result).toEqual('2019-4-23 18:43:37');
});
