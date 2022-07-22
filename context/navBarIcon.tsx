import { createContext, useState } from "react";
import { navBarIcon } from "../interface/globalContent";


const NavBarIconContext = createContext<navBarIcon | null>(null);

export const NavBarIconContextProvider = ({children}: any) => {

    const [iconURL, setIconURL] = useState("")

    return (
        <NavBarIconContext.Provider value={{iconURL, setIconURL}}>
            {children}
        </NavBarIconContext.Provider>
    )

}

export default NavBarIconContext

