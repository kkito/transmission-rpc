import { Transmission } from '../src/transmission';

test('create valid' , () => {
  const t = new Transmission();
  expect(t).not.toBeNull();
})

