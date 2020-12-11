import exec from '../index';
import path from 'path';
test('generate mongoose schema definition from typescript', () => {
  expect(
    exec({ file: path.join(__dirname, '../../examples/ts/sample.ts') })
  ).toMatchSnapshot();
});
