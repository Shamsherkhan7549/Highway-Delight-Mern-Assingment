import React, { useEffect,createContext, useState } from 'react'


export const AppContext = createContext()

const ContextApi = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [message, setMessage] = useState(""); 


    useEffect(() => {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }, [message]);

    useEffect(() => {
      if (token != null) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }else{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }, [token])

  return (
    <AppContext.Provider value={{ token, setToken,user, setUser,message, setMessage }}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextApi