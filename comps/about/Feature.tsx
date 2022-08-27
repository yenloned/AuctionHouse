import Image from "next/image"
import file_upload from "../../media/png/file_upload.png"
import light_dark from "../../media/png/light_dark.png"
import real_time from "../../media/png/real_time.png"
import ssr from "../../media/png/ssr.png"

const Feature = () => {
    return(
        <div className="bg-slate-200 dark:bg-slate-800 h-auto my-auto py-20">
          <div className="text-center">
            <div className="font-family_header1 text-2xl">
              Feature
            </div>
            <div className="flex flex-col items-center gap-8 justify-evenly my-12 lg:flex-row">
              <div className="w-[350px] sm:w-[500px]">
                <Image src={ssr} width={128} height={128} />
                <div className="font-family_header1">Server Side Rendering</div>
                <div className="font-family_body2">Client could experience a fast loading usage since the data will be ready and rendered as HTML page. For Example, NextJS getServerSideProps.</div>
              </div>
              <div className="w-[350px] sm:w-[500px]">
                <Image src={real_time} width={128} height={128} />
                <div className="font-family_header1">Real-Time WebSocket</div>
                <div className="font-family_body2">The Bidding status, price, and time will be updated with real-time for a true bidding experience.</div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 justify-evenly my-12 lg:flex-row">
              <div className="w-[350px] sm:w-[500px]">
                <Image src={file_upload} width={128} height={128} />
                <div className="font-family_header1">Image/File Upload</div>
                <div className="font-family_body2">Users could upload their own image files as the Bidding Item or User Avatar, which will be stored by Cloud Service and communicated by API.</div>
              </div>
              <div className="w-[350px] sm:w-[500px]">
                <Image src={light_dark} width={128} height={128} />
                <div className="font-family_header1">Light/Dark Mode</div>
                <div className="font-family_body2">Users could switch the light on/off as they want!</div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Feature