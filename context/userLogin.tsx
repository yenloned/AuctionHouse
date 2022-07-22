import { createContext, useState } from "react";
import { LoginStatusType } from "../interface/globalContent";

const LoginStatusContext = createContext<LoginStatusType | null>(null);

export const LoginStatusContextProvider = ({children}: any) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <LoginStatusContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </LoginStatusContext.Provider>
    )

}

export default LoginStatusContext