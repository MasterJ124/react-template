import type { FC } from 'react';
import { useAppSelector } from '@/app/hooks';

import logo from '@/logo.svg';
import '@/App.css';

const Home: FC = () => {
  const userInfo = useAppSelector((state) => state.userInfo.info);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{process.env.REACT_APP_API_URL}</p>
        <p>{userInfo.token}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Home;
