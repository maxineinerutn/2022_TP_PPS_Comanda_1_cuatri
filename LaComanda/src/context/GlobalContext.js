import { createContext } from 'react';

const GlobalContext = createContext({ email: "", setEmail: (x) => {}, password: "", setPassword: (y) => {} });;

export default GlobalContext;