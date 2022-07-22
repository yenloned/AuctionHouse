import { createContext, useState } from "react";
import { navBarBalance } from "../interface/globalContent";


const NavBarBalanceContext = createContext<navBarBalance | null>(null);

export const NavBarIconContextProvider = ({children}: any) => {

    const [balance, setBalance] = useState(0)

    return (
        <NavBarBalanceContext.Provider value={{balance, setBalance}}>
            {children}
        </NavBarBalanceContext.Provider>
    )

}

export default NavBarBalanceContext

