import Image from "next/image"
import Fun from "../../media/svg/home_fun.svg"

export const HaveFun = () => {
    return (
        <div className="bg-stone-100 dark:bg-slate-800 min-h-[600px] flex items-center justify-center gap-[10vw]">
            <Image src={Fun} width={400} height={400} className=""/>
            <div className="max-w-[500px]">
            <div className="text-black dark:text-zinc-50 text-4xl font-family_header2">
                5. Have fun, Enjoy!
            </div>
            <div className="text-stone-800 dark:text-zinc-100 text-xl font-family_body2 my-3">
                Feel free to start browsing and bidding on our platform!
            </div>
            <div className="flex font-family_body1 text-lg gap-4">
                <div className="w-32 p-1 mt-3 text-center cursor-pointer rounded-md bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300
                dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500">
                Login
                </div>
            </div>
            </div>
        </div>
    )
}