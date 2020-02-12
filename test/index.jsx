import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Pages from '../src/pages';
import LanguageContext, { antdLang, customLang } from '@/utils/LanguageContext';
import configureStore from '../src/store/configureStore';
import { ConfigProvider } from 'antd';
import { ResourcesProvider } from '@xforceplus/pass-user-resources';
import { APP_ID } from '@/utils/consts';
import mock from '../mock';

mock.setup({
  timeout: 0,
});

const store = configureStore();

// 暂时不启用国际化配置，仅使用中文环境
const LANG = 'zh-CN';

let appId;
// 将appId存入全局变量
if (typeof localStorage === 'object') {
  appId = localStorage.getItem('appId') || APP_ID;
} else {
  appId = window.__APP_ID__ || APP_ID;
}

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={antdLang[LANG]}>
        <LanguageContext.Provider value={customLang[LANG]}>
          <ResourcesProvider appId={appId}>
            <Provider store={store}>
              <Pages />
            </Provider>
          </ResourcesProvider>
        </LanguageContext.Provider>
      </ConfigProvider>
    );
  }
}

export default App;
