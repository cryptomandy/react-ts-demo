import React from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';

// *** 异步加载组件
import { asyncComponent } from '../utils/base/asyncComponent';
// import login from '../views/home/login/login';
// import user from '../views/home/user/user';
// import detailIndex from '../views/order/detail/index';
const login = asyncComponent(()=> import('../views/home/login/login'));
const user = asyncComponent(()=> import('../views/home/user/user'));
const detailIndex = asyncComponent(()=> import('../views/order/detail/index'));
const lifecycle = asyncComponent(()=> import('../views/base/base'));

export default class RouterConfig extends React.Component{
  render() {
    return(
      <HashRouter>
        {/* ---------------------- 基础路由（一） ------------------------------ */}
        {/* *** Switch 只匹配一个路由，总是渲染第一个匹配到的组件 */}
        <Switch>
          {/* 包含式: exact只对当前路由匹配    Switch  和exact配合使用*/}
          <Route exact path="/" component={login} />
          <Route exact path="/login" component={login} />
          <Route exact path="/login/user" component={user} />
          <Route exact path="/order/detail" component={detailIndex} />
          <Route exact path="/lifecycle" component={lifecycle} />
          {/* 路由不存在时重定向， V4中Route、exact ——代替IndexRoute */}
          <Redirect to='/'/>
        </Switch>
        {/* *** Switch存在一个 */}

        {/* ---------------------- 参考vue路由config配置（二） ------------------------------ */}
        {/* [转载][https://www.jianshu.com/p/6f16d96f8961] */}
      </HashRouter>
    )
  }
}

