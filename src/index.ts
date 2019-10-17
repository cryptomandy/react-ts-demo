import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

/**
 * @TIPS： TIPS : webpack-dev-server 和  react-hot-loader区别
 * [转载][https://blog.csdn.net/przlovecsdn/article/details/81741102]
 * webpack-dev-server 的热加载是修改代码，重新编译后，全局热更新；
 * react-hot-loader不刷新整个页面，替换修改代码，局部更新，webpack 的 HotModuleReplacement 热加载插件。
 **/
import { AppContainer } from 'react-hot-loader';
import route from './router/index';
// 引入样式
import 'antd/dist/antd.css';

const render = (Conponent:any) =>{
  ReactDOM.render(
    <AppContainer>
      <Conponent/>
    </AppContainer>,
    document.getElementById('root')
  )
}
render(route);
serviceWorker.unregister();
