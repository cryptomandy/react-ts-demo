import ResctPropTypes from 'prop-types';  //TiPS:检测组件传值是否正确
import React from 'react';

export default class PropType extends React.Component {
  constructor(porps) {
    super(porps);
    //TIPS：[转载][https://www.jianshu.com/p/799b8a14ef96]
    this.state = {
      default: porps.default
    };
  }
  static defaultProps = {
    default: 4
  };
  // 类型校验
  static propTypes = {
    default: ResctPropTypes.number
  };
  fun = {
    click: () => {
      // TiPS: setState是异步更新，[转载][https://segmentfault.com/a/1190000015463599]
      this.setState((prevProps)=>({
        default: prevProps.default +1
      }));
      //更新2次，计算函数保持同步性
        //   this.setState((prevProps)=>({
        //     default: prevProps.default +1
        //   }));
        //更新一次，合并更新
        this.setState({default: this.state.default +1});
    }
  };

  // 组件将要被挂载
  componentWillMount() {
    console.log('001-1 componentWillMount created');
  }
  // 第一次开始渲染真正的虚拟 DOM，当 render 执行完，内存中就有完整的虚拟 DOM
  render() {
    // 每当调用 render() 函数时，页面中的 DOM 还是旧的
    return (
      // 样式注解： [转载]：[https://blog.csdn.net/u011215669/article/details/81135657]
      <div id="div" ref="div" >
        <button id="btn" onClick={this.fun.click}>
          +1
        </button>
        <br />
        默认值是：{this.state.default}
        <hr />
        <Son text={this.state.default} />
      </div>
    );
  }
  // 执行完 componentDidMount 组件就进入了运行中的状态
  componentDidMount() {
    console.log('002', 'componentDidMount mounted');
  }

  // ----------------------------- 下面是运行中的生命周期 ----------------------

  // 组件是否需要被更新，此时，组件尚未被更新，但是，state 和 props 肯定是最新的，
  // 注意：在 shouldComponentUpdate 中要求返回一个布尔值，
  // 返回 false 不会触发下面的 shouldComponentUpdate 后面的生命周期，而是退回了运行中的状态
  // 但是组件组件 state 中的值已经是被修改的了

  shouldComponentUpdate(nextProps, nextState) {
    // 下面做一个示例，展示 shouldComponentUpdate 中 this.state 中的值是怎么样的
    // 示例是 偶数更新视图，基数不更新视图 0 2 4

    // 发现了 this.state.default 并不是最新，是上一次的旧数据，那么我们可以通过 shouldComponentUpdate 的形参来获取最新的值
    console.log(
      '003 shouldComponentUpdate',
      'this.state.default：',
      this.state.default,
      '---',
      'nextState：',
      nextState
    );
    // this.state.default： 0 --- nextState： {default: 1}

    // return this.state.default % 2 === 0 ? true : false;
    // return nextState.default % 2 === 0 ?true:false
    return true;
  }

  // 组件将要被更新，此时，尚未开始更新，内存中的虚拟 DOM 树还是旧的,页面上的 DOM 树也是旧的
  componentWillUpdate(nextProps, nextState) {
    // 经过打印，发现页面上的 DOM 节点 和 state 都是旧的，需要慎重操作，因为你可能操作的是旧的 DOM.
    // console.log(document.querySelector('#div').innerHTML,'---this.state:',this.state)
    // Vue 中的 $refs 跟 React 的 refs 差一个 $
    console.log(
      '004 componentWillUpdate',
      this.refs.div.innerHTML,
      '---this.state:',
      this.state,
      '----nextState:',
      nextState
    );
    // <button id="btn">+1</button><br>默认值是：0<hr><div><p>子组件</p>0</div> ---this.state: {default: 0} ----nextState: {default: 1}
  }

  // 组件完成了更新,虚拟 DOM 和 页面上的 DOM 和 state 都是最新的
  componentDidUpdate(prevProps, prevState) {
    // 因为 props 跟 state 都是最新的了，componentDidUpdate 函数提供了 上一次的 props(prevProps) 和 上一次的 state(prevState)
    console.log(prevProps, prevState, '1111-01');
    console.log(
      '006 componentDidUpdate',
      '最新的数据：',
      this.refs.div.innerHTML,
      '---this.state:',
      this.state
    );
    // 最新的数据： <button id="btn">+1</button><br>默认值是：1<hr><div><p>子组件</p>1</div> ---this.state: {default: 1}
  }
}

// 子组件
class Son extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>子组件</p>
        {this.props.text}
      </div>
    );
  }

  // 组件将要接收新属性，此时，只要这个方法被触发，就证明父组件为当前子组件传递了新的属性值（首次并不会触发函数）
  componentWillReceiveProps(nextProps) {
    // 发现 this.props 不是最新的，是上一次的值
    console.log(
      '005 componentWillReceiveProps',
      '子组件的 props 值：',
      this.props.text,
      '--- nextProps:',
      nextProps.text
    );
    // 触发了 componentWillReceiveProps 子组件的 props 值： 0 --- nextProps: 1
  }
}
