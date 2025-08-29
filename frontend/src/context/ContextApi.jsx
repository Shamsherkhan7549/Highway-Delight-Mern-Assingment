import React, { useEffect,createContext, useState } from 'react'


export const AppContext = createContext()

const ContextApi = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState({});

    useEffect(() => {
      if (token != null) {
        localStorage.setItem('token', token)
        
      }else{
        localStorage.removeItem('token')
      }
    }, [token])

  return (
    <AppContext.Provider value={{ token, setToken,user, setUser}}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextApi