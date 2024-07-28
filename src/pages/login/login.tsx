import { FC, SyntheticEvent, useState, FormEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUser } from '@slices';
import { useDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(
      loginUser({
        // @ts-ignore
        email: e.target[0].value,
        // @ts-ignore
        password: e.target[1].value
      })
    );
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
