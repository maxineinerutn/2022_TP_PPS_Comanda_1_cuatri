import { createContext } from 'react';

const GlobalContext = createContext({
  user: {
    name: '', surname: '', role: '', cuil: '', approved: false, email: '', dni: '', photo: ''
  },
  setUser: () => {}
});

export default GlobalContext;
