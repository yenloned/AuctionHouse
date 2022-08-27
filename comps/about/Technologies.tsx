import Image from "next/image"
import nextjs from "../../media/png/nextjs.png"
import nestjs from "../../media/png/nestjs.png"
import tailwindcss from "../../media/png/tailwindcss.png"
import graphql from "../../media/png/graphql.png"
import mongodb from "../../media/png/mongodb.png"
import socketio from "../../media/png/socketio.png"

const Technologies = () => {
    return (
        <div className="bg-neutral-50 dark:bg-gray-900 h-auto my-auto py-20">
            <div className="text-center">
                <div className="font-family_header1 text-2xl">
                Technologies
                </div>
                <div className="flex flex-col items-center gap-8 justify-evenly my-12 sm:flex-row">
                    <div className="w-[200px]">
                        <Image src={nextjs} width={128} height={128} />
                        <div className="font-family_header1">NextJS</div>
                    </div>
                    <div className="w-[200px]">
                        <Image src={tailwindcss} width={128} height={128} />
                        <div className="font-family_header1">TailwindCSS</div>
                    </div>
                    <div className="w-[200px]">
                        <Image src={nestjs} width={128} height={128} />
                        <div className="font-family_header1">NestJS</div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-8 justify-evenly my-12 sm:flex-row">
                    <div className="w-[200px]">
                        <Image src={graphql} width={128} height={128} />
                        <div className="font-family_header1">GraphQL</div>
                    </div>
                    <div className="w-[200px]">
                        <Image src={mongodb} width={192} height={128} />
                        <div className="font-family_header1">MongoDB</div>
                    </div>
                    <div className="w-[200px]">
                        <Image src={socketio} width={128} height={128} />
                        <div className="font-family_header1">SocketIO</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Technologies