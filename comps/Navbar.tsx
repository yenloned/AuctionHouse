import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, LogoutIcon, UserIcon } from "@heroicons/react/solid"
import LoginStatusContext from "../context/userLogin"
import { userDataForNavbar } from "../interface/userProfile"
import { MenuIcon } from "@heroicons/react/solid";

const NavBar: React.FC<userDataForNavbar | any> = (props: userDataForNavbar | any) => {

  const loginStatus = useContext(LoginStatusContext)

  const current_route = useRouter();

  const {systemTheme, theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)
  const [iconToggle, setIconToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false)

  useEffect(() => {
    setMounted(true)
  })

  useEffect(() => {
    if(loginStatus?.isLoggedIn){}
  }, [])

  const renderThemeChanger = (media: number) => {
    if (!mounted){
      return null;
    }
    
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark"){
      return (
        <SunIcon className={media === 1 ? "w-6 h-6 cursor-pointer hidden lg:block" : "w-6 h-6 cursor-pointer"} onClick={() => setTheme("light")} />
      )
    }else{
      return(
        <MoonIcon className={media === 1 ? "w-6 h-6 cursor-pointer hidden lg:block" : "w-6 h-6 cursor-pointer"} onClick={() => setTheme("dark")} />
      )
    }
  }

  const logout = () => {
    loginStatus?.setIsLoggedIn(false)
    localStorage.removeItem("jwt_token");
    window.location.reload();
  }

    return (
      <>
        <nav className="z-50 sticky top-0 py-3.5 flex items-center shadow justify-around bg-gradient-to-r from-zinc-100 via-slate-200 to-gray-100 
        dark:text-slate-100 dark:bg-gradient-to-r dark:from-indigo-700 dark:via-purple-700 dark:to-fuchsia-800">
          <Link href="/"><div className="text-xl text-center font-family_header1 cursor-pointer">Auction House</div></Link>
          <div className="text-base justify-center font-family_header1 hidden lg:flex">
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
          <div className="flex text-base items-center font-family_header1">
            {renderThemeChanger(1)}
            {
            loginStatus?.isLoggedIn ?
            <>
              <div className="ml-8 mr-2 text-sm mt-1 text-sky-500 dark:text-sky-300 opacity-0 lg:opacity-100">$ {props.userDataForNavbar.userBalance}</div>
              <div className="opacity-0 lg:opacity-100">
                <img className=" ml-10 cursor-pointer w-[32px] h-[32px] rounded-full border-gray-400 dark:border-fuchsia-900" width="32px" src={props.userDataForNavbar.userIcon} onClick={() => setIconToggle(!iconToggle)}/>
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
            <>
            <Link href="/account/login">
            <div className="mx-8 cursor-pointer opacity-0 lg:opacity-100">Login</div>
            </Link>
            </>
            }
          </div>
          <MenuIcon className="w-[30px] h-[30px] cursor-pointer block lg:hidden" onClick={() => {setMenuToggle(!menuToggle)}}/>
        </nav>
        
        {menuToggle ?
        <div className="absolute bg-gradient-to-r from-zinc-100 via-slate-200 to-gray-100 dark:text-slate-100 dark:bg-gradient-to-r dark:from-indigo-700 dark:via-purple-700 dark:to-fuchsia-800 w-[98vw] z-30">
          <div className="text-lg mx-4 mt-2 justify-center font-family_header1 lg:hidden">
            <Link href="/">
              <div className={current_route.pathname == "/" ? "text-emerald-400 dark:text-sky-300 cursor-pointer" : "cursor-pointer"}>Home</div>
            </Link>
            <Link href="/market">
              <div className={current_route.pathname == "/market" ? "text-emerald-400 dark:text-sky-300 cursor-pointer" : "cursor-pointer"}>Market</div>
            </Link>
            <Link href="/about">
              <div className={current_route.pathname == "/about" ? "text-emerald-400 dark:text-sky-300 cursor-pointer" : "cursor-pointer"}>About</div>
            </Link>
          </div>
          <div className="text-lg mx-4 mb-2 font-family_header1 lg:hidden">
            {renderThemeChanger(0)}
            {
            loginStatus?.isLoggedIn ?
            <>
              <div className="mt-1 text-sky-500 dark:text-sky-300">$ {props.userDataForNavbar.userBalance}</div>
                <div className="flex cursor-pointer my-2" onClick={() => window.location.replace("/profile")}><UserIcon className="w-6 h-6 mr-2"/>Profile</div>
                <div className="flex cursor-pointer my-2" onClick={() => logout()}><LogoutIcon className="w-6 h-6 mr-2"/> Logout</div>
            </>
            :
            <>
            <Link href="/account/login">
              <div className="cursor-pointer">Login</div>
            </Link>
            </>
            }
          </div>
        </div>
        :
        ""
        }
      </>
    )
  }
  
  export default NavBar
  