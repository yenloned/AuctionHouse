import Image from "next/image"
import Fun from "../../media/svg/home_fun.svg"

export const HaveFun = () => {
    return (
        <div className="bg-slate-200 dark:bg-slate-800 min-h-[600px] flex flex-col p-4 items-center justify-center gap-[10vw] lg:flex-row lg:p-0">
            <Image src={Fun} width={400} height={400} className=""/>
            <div className="max-w-[500px] min-h-[200px]">
                <div className="text-black dark:text-zinc-50 text-2xl font-family_header2 lg:text-4xl">
                    5. Have fun, Enjoy!
                </div>
                <div className="text-stone-800 dark:text-zinc-100 text-lg font-family_body2 my-3 text-justify lg:text-xl">
                    That's it! Feel free to start browsing and bidding on our platform. You can always check your bidding history and winning items on your profile page.
                </div>
            </div>
        </div>
    )
}