import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, LogoutIcon, UserIcon } from "@heroicons/react/solid"
import LoginStatusContext from "../context/userLogin"
import { userDataForNavbar } from "../interface/userProfile"

const NavBar: React.FC<userDataForNavbar | any> = (props: userDataForNavbar | any) => {

  const loginStatus = useContext(LoginStatusContext)

  const current_route = useRouter();

  const {systemTheme, theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)
  const [iconToggle, setIconToggle] = useState(false);

  useEffect(() => {
    setMounted(true)
  })

  useEffect(() => {
    if(loginStatus?.isLoggedIn){}
  }, [])

  const renderThemeChanger = () => {
    if (!mounted){
      return null;
    }
    
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark"){
      return (
        <SunIcon className="w-6 h-6 cursor-pointer" onClick={() => setTheme("light")} />
      )
    }else{
      return(
        <MoonIcon className="w-6 h-6 cursor-pointer" onClick={() => setTheme("dark")} />
      )
    }
  }

  const logout = () => {
    localStorage.removeItem("jwt_token");
    window.location.reload();
  }

    return (
      <nav className="grid z-50 sticky top-0 py-3.5 grid-cols-3 items-center shadow justify-around bg-gradient-to-r from-zinc-100 via-slate-200 to-gray-100 
      dark:text-slate-100 dark:bg-gradient-to-r dark:from-indigo-700 dark:via-purple-700 dark:to-fuchsia-800">
        <Link href="/"><div className="text-xl text-center font-family_header1 cursor-pointer">Auction House</div></Link>
        <div className="flex text-base justify-center font-family_header1">
          <Link href="/">
            <div className={current_route.pathname == "/" ? "text-emerald-400 dark:text-sky-300 mx-8 cursor-pointer" : "mx-8 cursor-pointer"}>Home</div>
          </Link>
          <Link href="/market">
            <div className={current_route.pathname == "/market" ? "text-emerald-400 dark:text-sky-300 mx-8 cursor-pointer" : "mx-8 cursor-pointer"}>Market</div>
          </Link>
          <Link href="/about">
            <div className={current_route.pathname == "/about" ? "text-emerald-400 dark:text-sky-300 mx-8 cursor-pointer" : "mx-8 cursor-pointer"}>About</div>
          </Link>
        </div>
        <div className="flex text-base justify-center font-family_header1">
          {renderThemeChanger()}
          {
          loginStatus?.isLoggedIn ?
          <>
          <div className="ml-8 mr-2 text-sm mt-1 text-sky-500 dark:text-sky-300">$ {props.userDataForNavbar.userBalance}</div>
          <div>
            <img className=" ml-10 cursor-pointer w-[32px] h-[32px] rounded-full border-gray-400 
          dark:border-fuchsia-900" width="32px" src={props.userDataForNavbar.userIcon} onClick={() => setIconToggle(!iconToggle)}/>
            {iconToggle ?
            <div className="absolute mt-3 bg-white dark:bg-gray-900 py-2 px-4 rounded-lg border-2 dark:border-zinc-900">
              <div className="flex cursor-pointer my-2" onClick={() => window.location.replace("/profile")}><UserIcon className="w-6 h-6 mr-2"/>Profile</div>
              <div className="flex cursor-pointer my-2" onClick={() => logout()}><LogoutIcon className="w-6 h-6 mr-2"/> Logout</div>
            </div>
            :
            ""
            }
          </div>
          </>
          :
          <Link href="/account/login">
          <div className="mx-8 cursor-pointer">Login</div>
          </Link>
          }
        </div>
      </nav>
    )
  }
  
  export default NavBar
  