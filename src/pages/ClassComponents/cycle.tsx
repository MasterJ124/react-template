import { count } from 'console';
import React from 'react';

class Cycle extends React.Component {
  state = {
    count: 0,
  };

  static getDerivedStateFromProps() {
    console.log('getDerivedStateFromProps');
    return null;
  }

  // 组件挂载完毕
  componentDidMount() {
    console.log('onMount');
  }

  componentDidUpdate(): void {
    console.log('update');
  }

  componentWillUnmount(): void {
    console.log('unMount');
  }

  render(): React.ReactNode {
    const { count } = this.state;

    return (
      <>
        <p>{count}</p>
        <button
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        >
          加加加
        </button>
      </>
    );
  }
}

export default Cycle;
