import CustomTheme from "./CustomTheme";
import NavBar from "./Navbar"

const Layout = (({children}: any) =>{
    return (
        <>
        <NavBar />
        {children}
        </>
    )
})

export default Layout;