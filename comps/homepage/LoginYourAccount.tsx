import Image from "next/image"
import Login from "../../media/svg/home_login.svg"

export const LoginYourAccount = () => {
    return (
        <div className="bg-stone-100 dark:bg-slate-800 min-h-[600px] flex flex-col p-4 items-center justify-center gap-[10vw] lg:flex-row lg:p-0">
            <Image src={Login} width={400} height={400} className=""/>
            <div className="max-w-[500px] min-h-[200px]">
            <div className="text-black dark:text-zinc-50 text-2xl font-family_header2 lg:text-4xl">
                1. Login Your Account
            </div>
            <div className="text-stone-800 dark:text-zinc-100 text-lg font-family_body2 my-3 text-justify lg:text-xl">
                Login to your account at Auction House. If you don't have one, you can always create a free account in a few steps.
            </div>
            <div className="flex font-family_body1 text-lg gap-4">
                <div className="w-32 p-1 mt-3 text-center cursor-pointer rounded-md bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60
                dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60" onClick={() => {window.location.replace("/account/login")}}>
                Login
                </div>
            </div>
            </div>
        </div>
    )
}