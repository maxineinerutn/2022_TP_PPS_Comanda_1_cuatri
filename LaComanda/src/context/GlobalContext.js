import { createContext } from 'react';

const GlobalContext = createContext({
  user: {
    name: '', surname: '', role: '', cuil: '', approved: false, email: '', dni: '', photo: '', password: ''
  },
  setUser: () => {}
});

export default GlobalContext;
