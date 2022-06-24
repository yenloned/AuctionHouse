import Browse from "../../media/svg/home_browse.svg"
import Image from "next/image"

export const BrowseMarket = () => {
    return (
        <div className="dark:bg-gray-900 min-h-[600px] flex items-center justify-center gap-[10vw]">
            <div className="max-w-[500px] min-h-[200px]">
                <div className="text-black dark:text-zinc-50 text-4xl font-family_header2">
                    2. Browse Market
                </div>
                <div className="text-stone-800 dark:text-zinc-100 text-xl font-family_body2 my-3 text-justify">
                    Check out our marketplace for all the collection and items for bidding. It is a public market that update the price and status in real-time.
                </div>
                <div className="flex font-family_body1 text-lg gap-4">
                    <div className="w-32 p-1 mt-3 text-center cursor-pointer rounded-md bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300
                    dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500">
                    Go to Market
                    </div>
                </div>
            </div>
            <Image src={Browse} width={400} height={400} className=""/>
      </div>
    )
}