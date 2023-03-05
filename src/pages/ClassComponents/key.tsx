import React from 'react';

class Person extends React.Component {
  state = {
    persons: [
      { id: 1, name: '校长', age: 19 },
      { id: 2, name: '孙悟空', age: 2 },
      { id: 3, name: '偶按实际', age: 17 },
    ],
  };

  add = () => {
    const { persons } = this.state;
    this.setState({ persons: [{ id: 4, name: '小王', age: 22 }, ...persons] });
  };

  render(): React.ReactNode {
    return (
      <>
        <h2>展示人员信息</h2>
        <button onClick={this.add}>添加</button>
        <ul>
          {this.state.persons.map((item) => {
            return (
              <li key={item.id}>
                {item.name}---{item.age}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default Person;
