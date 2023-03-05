import React from 'react';

class Person extends React.Component {
  state = {
    persons: [
      { id: 1, name: '校长', age: 19 },
      { id: 3, name: '孙悟空', age: 2 },
      { id: 3, name: '偶按实际', age: 17 },
    ],
  };

  render(): React.ReactNode {
    return (
      <>
        <ul>
          {this.state.persons.map((item, index) => {
            return (
              <li key={index}>
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
