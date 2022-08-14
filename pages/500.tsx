import error_500 from "../media/png/error_500.png"
import Image from "next/image"

export default function Custom500() {
    return (
        <div className="flex flex-col h-[80vw] justify-center items-center">
            <Image src={error_500} width={350} height={350} className="w-[350px] h-[350px]" />
            <div className="text-xl">
                500 - Server-side error occurred
            </div>
            <div className="text-lg">
                If you have encounter this page, please contact Rudy Yen at:
            </div>
            <div className="text-lg">Email: rudyyen.work@gmail.com</div>
            <div className="text-lg">GitHub: https://github.com/yenloned</div>
            <div className="text-lg">Linkedin: https://www.linkedin.com/in/rudyyen/</div>
        </div>
    )
}