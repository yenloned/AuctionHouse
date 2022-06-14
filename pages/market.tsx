import { useState } from "react"
import { SearchIcon } from "@heroicons/react/solid"

const Market = () => {
  const [searchItem, setSearchItem] = useState("")


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
      </div>
    )
  }
  
  export default Market
  