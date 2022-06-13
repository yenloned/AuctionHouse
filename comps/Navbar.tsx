import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/solid"

const NavBar = () => {

  const current_route = useRouter();

  const {systemTheme, theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  })

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

    return (
      <nav className="grid sticky top-0 py-3.5 grid-cols-3 items-center justify-around bg-gradient-to-r from-zinc-100 via-slate-100 to-zinc-100 
      dark:text-slate-100 dark:bg-gradient-to-r dark:from-indigo-700 dark:via-purple-700 dark:to-fuchsia-800">
        <div className="text-xl text-center font-family_header1">Auction House</div>
        <div className="flex text-base justify-center font-family_header1">
          <Link href="/">
            <div className={current_route.pathname == "/" ? "text-blue-500 dark:text-sky-300 mx-8 cursor-pointer" : "mx-8 cursor-pointer"}>Home</div>
          </Link>
          <Link href="/market">
            <div className={current_route.pathname == "/market" ? "text-blue-500 dark:text-sky-300 mx-8 cursor-pointer" : "mx-8 cursor-pointer"}>Market</div>
          </Link>
          <Link href="/about">
            <div className={current_route.pathname == "/about" ? "text-blue-500 dark:text-sky-300 mx-8 cursor-pointer" : "mx-8 cursor-pointer"}>About</div>
          </Link>
        </div>
        <div className="flex text-base justify-center font-family_header1">
          {renderThemeChanger()}
          <div className="mx-8">Login</div>
        </div>
      </nav>
    )
  }
  
  export default NavBar
  