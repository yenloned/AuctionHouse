import { useEffect, useState } from "react"
import { SearchIcon } from "@heroicons/react/solid"
import { io, Socket } from "socket.io-client"

const Market = () => {
  const [searchItem, setSearchItem] = useState("")
  const [test, setTest] = useState("")
  const [test2, setTest2] = useState("")
  const socket = io("http://localhost:5001")
  

  const handlepost = () => {
    socket.emit("message", test)
  }

  socket.on("message", () =>{
    console.log("OK")
    handleNewMessage(socket.id)
  })

  const handleNewMessage = (message: string) => {
    setTest2(message)
  }

  return (
    <div>
      <form className="text-center">
      <div className="flex items-center w-3/4 mx-auto my-5 text-center bg-zinc-200 rounded-md 
      dark:bg-zinc-700 text-lg">
        <input type="text" className="w-full my-1 mx-3 focus:outline-none bg-zinc-200 h-8 p-1
        dark:bg-zinc-700" onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search for items"/>
        <SearchIcon className="w-6 h-6 mx-4 cursor-pointer" onClick={() => console.log(searchItem)}/>
      </div>
      </form>
      <input type="text" id="message" onChange={(e) => setTest(e.target.value)}/>
      <button onClick={() => handlepost()}>handle</button>
      {test2}
    </div>
  )
  }
  
  export default Market
  