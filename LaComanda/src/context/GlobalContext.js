import { createContext } from 'react';

const GlobalContext = createContext({
  email: '', setEmail: () => {}, password: '', setPassword: () => {}
});

export default GlobalContext;
