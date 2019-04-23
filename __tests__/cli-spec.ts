import { fmtRate} from '../src/cli';

test('fmtRate valid', () => {
  let result = fmtRate(2037000)
  expect(result).toEqual('1.94M/s')
  result = fmtRate(237000)
  expect(result).toEqual('231.45k/s')
  result = fmtRate(237)
  expect(result).toEqual('237B/s')
});

