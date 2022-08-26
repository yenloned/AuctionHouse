import Image from "next/image"
import Bid from "../../media/svg/home_bid.svg"

export const BidItems = () => {
    return (
        <div className="bg-slate-200 dark:bg-slate-800 min-h-[600px] flex flex-col p-4 items-center justify-center gap-[10vw] lg:flex-row lg:p-0">
            <Image src={Bid} width={400} height={400} className=""/>
            <div className="max-w-[500px] min-h-[200px]">
                <div className="text-black dark:text-zinc-50 text-2xl font-family_header2 lg:text-4xl">
                3. Bid for items
                </div>
                <div className="text-stone-800 dark:text-zinc-100 text-lg font-family_body2 my-3 text-justify lg:text-xl">
                Search for the items you want to bid on, then place your price. You can bid against other users in real-time within the price range and duration.
                </div>
            </div>
        </div>
    )
}