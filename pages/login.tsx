import { InboxIcon } from "@heroicons/react/solid"
import { LockClosedIcon } from "@heroicons/react/solid"

const Login = () => {
    return (
      <div className="bg-neutral-50 h-screen my-auto pt-40
      dark:bg-gray-900">
        <div className="w-full max-w-[390px] mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-md py-10
        dark:bg-gradient-to-r dark:from-neutral-900 dark:via-zinc-700 dark:to-stone-800">
            <div className="text-3xl font-bold text-center text-gray-700 dark:text-white mb-5">Login to Auction House</div>
            <form className="flex flex-col gap-3 items-center">
                <div className="flex">
                    <InboxIcon className="w-6 h-6 mx-2"/><input className="min-w-[300px] w-1/5 h-8 px-3 border-b-2" placeholder="Email Address"></input>
                </div>
                <div className="flex">
                    <LockClosedIcon className="w-6 h-6 mx-2"/><input className="min-w-[300px] w-1/5 h-8 px-3 border-b-2" placeholder="Password"></input>
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="text-center">Login as Guest</div>
            <div className="text-center">Don't have an account? Register</div>
        </div>
      </div>
    )
  }
  
  export default Login