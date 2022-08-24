import error_404 from "../media/png/error_404.png"
import Image from "next/image"
import LoadingSpinner from "../comps/LoadingSpinner"

export default function Custom404() {

    return (
        <div className="flex flex-col h-[80vh] justify-center items-center">
            <Image src={error_404} width={400} height={300} className="w-[400px] h-[300px]" />
            <div>
                There is nothing for you here...
            </div>
            <div className="cursor-pointer text-blue-700 hover:text-cyan-700 underline">
                <a href="/">Back to Home Page</a>
            </div>
        </div>
    )
}