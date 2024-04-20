import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [registerError,setRegisterError] = useState(null)
  const [isRegisterLoading,setisRegisterLoading] = useState(false)
  const {registerInfo,setRegisterInfo} = useState({
    name:'',
    email:'',
    password:'',
  })
  const updateRegisterInfo = useCallback((info) =>{
    setRegisterInfo(info)
  },[])

  const registerUser = useCallback(async(e)=> {
    e.preventDefault();

    setisRegisterLoading(true)
    registerError(null)

    const response =  await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo))
    
    setisRegisterLoading(false)

    if(response.error){
      return setRegisterError(response);
    }

    localStorage.setItem('User',JSON.stringify(response))
    setUser(response)
   },[registerInfo])

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading
    }}>
        {children}
    </AuthContext.Provider>
}