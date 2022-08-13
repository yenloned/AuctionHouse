import Image from "next/image"
import Auction from "../../media/png/auction.png"

export const Homeheader = () => {
    return (
      <div className="dark:bg-gray-900 min-h-[680px] flex items-center justify-evenly">
        <div className="">
          <div className="text-black dark:text-white text-4xl font-family_header1">
            Auction House
          </div>
          <div className="text-stone-900 dark:text-zinc-50 text-xl font-family_body3">
            Your Real Time Mock Bidding Platform. Start off with $1,000,000 with any new account right now!
          </div>
          <div className="text-stone-400 dark:text-zinc-500 text-lg font-family_body2">
            * All trading and bidding on this platform will not involve any real-world value.
          </div>
          <div className="flex font-family_body1 text-lg gap-4">
            <div className="w-32 p-1 mt-3 text-center rounded-md cursor-pointer bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60
            dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60" onClick={() => {window.location.replace("/market")}}>
              Get Started
            </div>
            <div className="w-32 p-1 mt-3 text-center rounded-md cursor-pointer bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60
            dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60" onClick={() => {window.location.replace("/about")}}>
              Browse More
            </div>
          </div>
        </div>
        <div className="static"><Image src={Auction} width={380} height={380} className="static" /></div>
      </div>
    )
}