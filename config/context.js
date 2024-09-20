"use client"

import { onAuthStateChanged } from 'firebase/auth';
// contexts/MyContext.js
import { createContext, useContext, useState } from 'react';
import { auth } from './firebase';

// Create the context
const MyContext = createContext();

// Create the provider component
export const MyProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  
  onAuthStateChanged(auth,(user)=>{
    if (user) {
        setIsAuth(true)
    }else{ 
        setIsAuth(false)
    }
  })

  return (
    <MyContext.Provider value={{ isAuth,setIsAuth}}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook for easier consumption of context
export const useMyContext = () => {
  return useContext(MyContext);
};
