import App from './index';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Button } from 'antd';
import Demo from '../src/pages/Demo';

const testRenderer = TestRenderer.create(<App />);
const testInstance = testRenderer.root;

test('test click', (done) => {
  setTimeout(() => {
    testInstance
      .findByType(Demo)
      .findByType(Button)
      .props.onClick()
      .then(() => {
        expect(
          testInstance.findByProps({ className: 'block message-block' })
            .children[0],
        ).toMatch(/Hello World/);
        done();
      });
  }, 1000);
});
