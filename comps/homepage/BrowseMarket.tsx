import Browse from "../../media/svg/home_browse.svg"
import Image from "next/image"

export const BrowseMarket = () => {
    return (
        <div className="dark:bg-gray-900 min-h-[600px] flex flex-col-reverse p-4 items-center justify-center gap-[10vw] lg:flex-row lg:p-0">
            <div className="max-w-[500px] min-h-[200px]">
                <div className="text-black dark:text-zinc-50 text-2xl font-family_header2 lg:text-4xl">
                    2. Browse Market
                </div>
                <div className="text-stone-800 dark:text-zinc-100 text-lg font-family_body2 my-3 text-justify lg:text-xl">
                    Check out our marketplace for all the collection and items for bidding. It is a public market that update the price and status in real-time.
                </div>
                <div className="flex font-family_body1 text-lg gap-4">
                    <div className="w-32 p-1 mt-2 text-center cursor-pointer rounded-md bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60
                    dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60" onClick={() => {window.location.replace("/market")}}>
                    Go to Market
                    </div>
                </div>
            </div>
            <Image src={Browse} width={400} height={400} className=""/>
      </div>
    )
}