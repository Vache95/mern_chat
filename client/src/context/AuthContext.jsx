import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [registerError,setRegisterError] = useState(null)
  const [isRegisterLoading,setisRegisterLoading] = useState(false)
  const [registerInfo,setRegisterInfo] = useState({
    name:'',
    email:'',
    password:'',
  })
  const [loginInfo,setLoginInfo] = useState({
    email:'',
    password:'',
  })
  const [loginError,setLoginError] = useState(null)
  const [isLoginLoading,setisLoginLoading] = useState(false)


 useEffect(() => {
   const user = localStorage.getItem('User');

   setUser(JSON.parse(user))
 },[])


  const updateRegisterInfo = useCallback((info) =>{
    setRegisterInfo(info)
  },[])

  const updateLoginInfo = useCallback((info) =>{
    setLoginInfo(info)
  },[])

  const registerUser = useCallback(async(e)=> {
    e.preventDefault();
    setisRegisterLoading(true)
    setRegisterInfo(null)

    const response =  await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))
    
    setisRegisterLoading(false)

    if(response.error){
      return setRegisterError(response);
    }

    localStorage.setItem('User',JSON.stringify(response))
    setUser(response)
   },[registerInfo])



  const loginUser = useCallback(async (e) =>{
    e.preventDefault();
    setisLoginLoading(true)
    setLoginInfo(null)

    const response =  await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo))
    setisLoginLoading(false)

    if(response.error){
      return setLoginError(response);
    }

    localStorage.setItem('User',JSON.stringify(response))
    setUser(response)

  },[loginInfo])



     const  logoutUser = useCallback(() => {
       localStorage.removeItem('User')
       setUser(null)
     },[])

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        loginInfo
    }}>
        {children}
    </AuthContext.Provider>
}