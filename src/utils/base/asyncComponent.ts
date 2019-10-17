/**
 * @name 组件异步加载
 * [转载][https://blog.csdn.net/qq_39985511/article/details/90057344]
 *
 **/
import React from 'react';
export function asyncComponent(importComponent){
  class AsyncComponent extends React.Component{
    constructor (props){
      super(props);
      this.state = {
        component : null
      };
    }

    componentDidMount(){
      importComponent().then(Comp=>{
        console.log(Comp.default,"Comp 0002")
        this.setState({component: Comp.default});
      })
    }

    render(){
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props}/> : null;
    }
  }
  return AsyncComponent;
}

