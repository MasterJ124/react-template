import React from 'react';
import { Input, Button } from 'antd';

class Demo extends React.Component {
  state = {
    isHot: true,
  };
  textInput = null;
  // api创建ref容器
  inputRef = React.createRef();
  // 回调函数赋值ref
  setInputRef = (element) => {
    this.textInput = element;
  };

  getInput = () => {
    console.log(this.inputRef.current);
    console.log(this.textInput);
  };

  render() {
    return (
      <>
        <Input ref={this.inputRef} placeholder="点击按钮提示" />
        <Button type="primary" onClick={this.getInput}>
          点击提示数据
        </Button>
        <Input ref={this.setInputRef} placeholder="失去焦点提示"></Input>
      </>
    );
  }
}

export default Demo;
