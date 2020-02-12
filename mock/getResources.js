import Mock from 'mockjs';
import MockUtil from './util';
Mock.mock(/\/user\/resources([?.#&].*)?$/, (options) => {
  MockUtil.log(options);
  return {
    code: 1,
    message: '成功',
    result: [
      { resourceCode: 'xforce:ucenter:User' },
    ],
  };
});
