import Link from "next/link"

const NavBar = () => {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-transparent flex flex-row text-center">
        <div className="basis-1/3"><Link href="/">Home</Link></div>
        <div className="basis-1/3"><Link href="/">About</Link></div>
        <div className="basis-1/3"><Link href="/">Contact</Link></div>
      </div>
    )
  }
  
  export default NavBar
  