import type { FC } from 'react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setUserToken } from '@/features/userInfoSlice';
import { Button } from 'antd';

import logo from '@/logo.svg';
import '@/App.css';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{process.env.REACT_APP_API_URL}</p>
        <Button onClick={() => dispatch(setUserToken(''))}>清空</Button>
        <p>{userInfo.token}</p>
        <Button onClick={() => dispatch(setUserToken('c616436614bacb7afaa6ea65cb8756e7'))}>
          添加token
        </Button>
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
