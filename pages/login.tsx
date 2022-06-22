import { useRouter } from "next/router"

import { InboxIcon } from "@heroicons/react/solid"
import { LockClosedIcon } from "@heroicons/react/solid"
import Link from "next/link"

const Login = () => {
    return (
      <div className="bg-neutral-50 h-screen my-auto pt-40
      dark:bg-gray-900">
        <div className="w-full max-w-[390px] mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-md py-10
        dark:bg-gradient-to-t dark:from-neutral-900 dark:via-zinc-800 dark:to-stone-800">
            <div className="text-3xl font-bold text-center text-gray-700 dark:text-white mb-5">Welcome Back</div>
            <div className="text-xl font-bold text-center text-gray-800 dark:text-zinc-300 mb-5 font-family_body2">Login your account into Auction House</div>
            <form className="flex flex-col gap-3 items-center">
                <div className="flex">
                    <InboxIcon className="w-6 h-10 mx-2"/><input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2
                    dark:bg--500" placeholder="Email Address"></input>
                </div>
                <div className="flex">
                    <LockClosedIcon className="w-6 h-10 mx-2"/><input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2
                    " placeholder="Password"></input>
                </div>
                <button type="submit" className="slate-100 min-w-[180px] rounded-md shadow-sm text-lg font-family_body2 my-2
                dark:bg-gradient-to-r dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500">Login</button>
                <div className="text-center slate-100 min-w-[180px] rounded-md shadow-sm text-lg font-family_body2 mb-1
                dark:bg-gradient-to-r dark:from-zinc-400 dark:via-stone-500 dark:to-neutral-500">Login as Guest</div>
            </form>
            <div className="border mx-6 my-3" />
            <div className="flex justify-center text-center text-lg font-family_body2 
            dark:text-gray-200">Don't have an account?
              <Link href="/register">
                <div className="underline underline-offset ml-2 
                dark:text-white">Register</div>
              </Link>
            </div>
        </div>
      </div>
    )
  }
  
  export default Login