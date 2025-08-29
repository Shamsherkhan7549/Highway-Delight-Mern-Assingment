import React, { useEffect,createContext } from 'react'


export const AppContext = createContext()

const ContextApi = ({children}) => {

    const [token, setToken] = React.useState(null)

    useEffect(() => {
      if (token) {
        localStorage.setItem('token', token)
        
      }else{
        localStorage.removeItem('token')
      }
    }, [token])

  return (
    <AppContext.Provider value={{ token, setToken }}>
        {children}
    </AppContext.Provider>
  )
}

export default ContextApi