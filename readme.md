## Quick Start

* 安装依赖包
```bash
npm install
```

* 本地开发
```
npm run dev
```

* 本地Mock环境
```
npm run mock
```

* 单元测试
```
npm run test
```

* 打包
```
npm run prod
```

* 打包分析
```
npm run analyzer
```

## **重要说明**
1. 打包后的组件会剔除'react', 'react-dom', 'antd', 'moment', '@babel/polyfill'模块的代码。  

    在基于work平台架构中的子模块项目中，这些代码会被项目最外层容器统一引入，以避免加载过多的重复代码。 

    **如需单独部署，需要修改webpack.config.js中的externals配置项(将externals设置为空数组时将会完全覆盖默认externals配置项)**
    ```
    // webpack.config.json
    {
      "externals": []
    }
    ```
2. **在基于work平台架构中的子模块项目中，不要在该项目的package.json中引入react, react-dom, antd, moment这四个依赖包，避免本地调试时依赖的版本与发布后使用的版本不一致导致线上出现问题。**  

    在基于work平台架构中的子模块项目中，react, react-dom, antd, moment四个依赖包由外部菜单项目(invoice-menu)统一全局引入，为确保该项目的本地开发环境与线上环境中依赖包版本一致，这四个依赖包交由xf-sanctuary-scripts统一管理，由管理员保证invoice-menu项目和xf-sanctuary-scripts项目中这四个包的版本一致性。

3. xf-sanctuary-scripts同时引入了redux, react-redux, redux-thunk, react-router-dom这四个依赖包，为方便统一版本升级，这四个包也可交由xf-sanctuary-scripts管理，不用在该项目中引入。

4. react项目依赖antd，但antd的庞大的代码和样式并不需要存在于在每个基于work平台架构中的子模块项目中，仅在外层容器项目引入一次即可。  
    antd的js代码在打包时会通过默认的externals设置剥离。 

    antd的样式在启动本地代码调试时，会包含在entry配置项中，无需手动在代码中引入。
    
    在执行打包时，entry配置则不会包含antd/dist/antd.css。

    **如依赖antd的项目需单独部署，需要手动在代码中引入antd/dist/antd.css，或者修改webpack.config.js中的entry配置项**
    ```
    import 'antd/dist/antd.css';

    or

    entry: ['@babel/polyfill', 'antd/dist/antd.css', './src/index.jsx']
    ```

## 配置文件说明
### webpack.config.json
- **entry**  
  webpack打包入口文件，一般情况无需调整。

- **alias**  
  对应webpack配置中resolve.alias属性。

- **port**  
  指定webpack-dev-server服务端口号。

- **proxy**  
  如果组件需要调用后端服务，可通过proxy指定服务地址。

- **externals**  
  执行npm run prod时，无需打包的模块名列表。  
  默认externals中的模块包括'react', 'react-dom', 'antd', 'moment', '@babel/polyfill'。  
  externals为对象时，对象中的模块将被追加到默认列表中（需要与invoice-menu项目配合使用，请勿擅自修改）。  
  **externals为数组时，将完全替换默认的配置项。**

## 目录结构

```
├──mock                            // 接口mock数据
├──src
│   ├── assets                      // 静态资源
│   │  └── img                     // 图片库
│   │   └── style                   // 样式库
│   │   └── iconfont            // 字体图标库
│   ├── language                    // 多语言库
│   ├── pages                       // 模块业务代码
│   ├── store                       // redux配置
│   ├── utils                       // 工具库
│   └── index.js                    // 应用入口
└──test                            // 单元测试用例

```

## 接口规范
- 前后端接口标准responseBody返回结构：
  ```js
  {
    code: int (0-失败， 1-成功),
    message: string,
    result: any(根据实际业务需求约定类型)
  }
  ```

- 接口字段类型规范：
  - 日期时间：string 时间戳 例： "1539912877402"表示Fri Oct 19 2018 09:34:33 GMT+0800 (中国标准时间)代表的日期时间
  - 金额、数量：string 例："86510293.315453"
  - 百分数：string 小数。例："0.17"表示17%
  - 枚举型：string
  - 布尔型：int 0表示false， 1表示true

- 分页查询接口字段规范：  
  - request请求参数中应当包含pageNo(当前页码)和pageSize(每页条数)  
  - response返回数据的result为对象，result中应当包含total(总条数)和list(本次查询的数据)

## 通用组件
### @xforceplus/pass-user-resources
权限控制组件

### @xforceplus/standard-http-request
4.0标准接口调用组件

### @xforceplus/themes-sass
公共样式库

## 其他
- 字体图标库可通过在 [https://www.iconfont.cn/](https://www.iconfont.cn/) 生成后覆盖src/assets/style/iconfont目录。

- 单元测试自定义配置项可在package.json的jest配置项中维护。  
  可自定义的配置项有：  
  'collectCoverageFrom',  
  'coverageDirectory',  
  'coveragePathIgnorePatterns',  
  'coverageReporters',  
  'moduleNameMapper'  
  如果在webpack.config.json配置文件中自定义并使用了alias，单元测试也需要维护对应的配置。例：
  ```js
  // webpack.config.json
  {
    ...
    "alias": {'@utils': './src/utils'},
    ...
  }

  // package.json
  {
    ...
    "jest": {
      "moduleNameMapper": {
        '^@utils(.*)$': '<rootDir>/src/utils$1'
      },
    },
    ...
  }
  ```