import Create from "../../media/svg/home_create.svg"
import Image from "next/image"

export const CreateYourItem = () => {
    return (
        <div className="dark:bg-gray-900 min-h-[600px] flex items-center justify-center gap-[10vw]">
            <div className="max-w-[500px] min-h-[200px]">
                <div className="text-black dark:text-zinc-50 text-4xl font-family_header2">
                    4. Create Your Own Item
                </div>
                <div className="text-stone-800 dark:text-zinc-100 text-xl font-family_body2 my-3 text-justify">
                    You create your own auction in our marketplace by setting up the information such as starting price and duration.
                </div>
                <div className="flex font-family_body1 text-lg gap-4">
                    <div className="w-32 p-1 mt-3 text-center cursor-pointer rounded-md bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300 shadow-lg shadow-emerald-300/60
                    dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-lg dark:shadow-cyan-500/60" onClick={() => {window.location.replace("/market/create")}}>
                    Create Item
                    </div>
                </div>
            </div>
            <Image src={Create} width={400} height={400} className=""/>
      </div>
    )
}