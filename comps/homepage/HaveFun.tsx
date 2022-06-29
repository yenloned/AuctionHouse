import Image from "next/image"
import Fun from "../../media/svg/home_fun.svg"

export const HaveFun = () => {
    return (
        <div className="bg-stone-100 dark:bg-slate-800 min-h-[600px] flex items-center justify-center gap-[10vw]">
            <Image src={Fun} width={400} height={400} className=""/>
            <div className="max-w-[500px] min-h-[200px]">
                <div className="text-black dark:text-zinc-50 text-4xl font-family_header2">
                    5. Have fun, Enjoy!
                </div>
                <div className="text-stone-800 dark:text-zinc-100 text-xl font-family_body2 my-3 text-justify">
                    That's it! Feel free to start browsing and bidding on our platform. You can always check your bidding history and winning items on your profile page.
                </div>
            </div>
        </div>
    )
}