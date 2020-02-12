import Mock from 'mockjs';
import MockUtil from '../util';

Mock.mock(/\/getMessage([?.#&].*)?$/, (options) => {
  MockUtil.log(options);
  return {
    code: 1,
    message: '',
    result: 'Hello World!',
  };
});
