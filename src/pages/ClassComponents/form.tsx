import React from 'react';

class Form extends React.Component {
  state = {
    username: undefined,
    password: undefined,
  };

  // 受控组件 高阶函数
  /**
   * 接收函数或返回函数，就可以称之为高阶函数
   */
  handleChange = (dataType: string) => {
    // 返回函数
    return (event: any) => {
      this.setState({ [dataType]: event.target.value });
    };
  };

  onSubmit = () => {
    console.log(this.state);
  };

  render(): React.ReactNode {
    const { username, password } = this.state;

    return (
      <>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange('username')}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange('password')}
        />
        <button onClick={this.onSubmit}>登录</button>
      </>
    );
  }
}

export default Form;
