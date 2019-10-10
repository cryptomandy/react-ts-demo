### 版本对比

- 生命周期对比 V16.0 前和 V16.4 后 ，[转载]：[https://www.jianshu.com/p/514fe21b9914]

### setState

[转载]：[https://segmentfault.com/a/1190000015463599],[https://www.cnblogs.com/jiuyi/p/9263114.html]

1. 异步更新和同步更新: 触发 shouldComponentUpdate，componentWillUpdate，render，componentDidUpdate

特点：

- 不会立刻改变 React 组件中 state 的值
- setState 通过触发一次组件的更新来引发重绘
- 多次 setState 函数调用产生的效果会合并

2. 由 React 控制的事件处理程序，以及生命周期函数调用 setState 不会同步更新 state 。
   React 控制之外的事件中调用 setState 是同步更新的。
   比如原生 js 绑定的事件，setTimeout/setInterval/addEventListener 等。
   onChange、onClick、onTouchMove 等异步处理

###
