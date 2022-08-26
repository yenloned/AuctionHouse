import Footer from "../comps/Footer"
import Image from "next/image"
import file_upload from "../media/png/file_upload.png"
import light_dark from "../media/png/light_dark.png"
import real_time from "../media/png/real_time.png"
import ssr from "../media/png/ssr.png"
import nextjs from "../media/png/nextjs.png"
import nestjs from "../media/png/nestjs.png"
import tailwindcss from "../media/png/tailwindcss.png"
import graphql from "../media/png/graphql.png"
import mongodb from "../media/png/mongodb.png"
import socketio from "../media/png/socketio.png"

const About = () => {
    return (
      <>
        <div className="bg-neutral-50 dark:bg-gray-900 h-auto my-auto pt-10">
          <div className="text-center my-20">
            <div className="font-family_header1 text-xl">
              Feature
            </div>
            <div className="flex justify-evenly my-20">
              <div className="w-[500px]">
                <Image src={ssr} width={128} height={128} />
                <div className="font-family_header1">Server Side Rendering</div>
                <div className="font-family_body2">Client could experience a fast loading usage since the data will be ready and rendered as HTML page. For Example, NextJS getServerSideProps</div>
              </div>
              <div className="w-[500px]">
                <Image src={real_time} width={128} height={128} />
                <div className="font-family_header1">Real-Time WebSocket</div>
                <div className="font-family_body2">The Bidding status, price, and time will be updated with real-time for a true bidding experience.</div>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="w-[500px]">
                <Image src={file_upload} width={128} height={128} />
                <div className="font-family_header1">Image/File Upload</div>
              </div>
              <div className="w-[500px]">
                <Image src={light_dark} width={128} height={128} />
                <div className="font-family_header1">Light/Dark Mode</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="font-family_header1 text-xl">
              Technologies
            </div>
            <div className="flex justify-evenly my-12">
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
            <div className="flex justify-evenly my-12">
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

        <Footer/>
      </>
    )
  }
  
  export default About