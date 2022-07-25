import { useContext, useEffect, useState } from "react"
import { InboxIcon, LockClosedIcon, LockOpenIcon, UserIcon } from "@heroicons/react/solid"
import { signupUser } from "../../functions/api/signupUser"
import { loginUser } from "../../functions/api/loginUser"
import { useRouter } from "next/router"
import LoginStatusContext from "../../context/userLogin"
import { loginGuestUser, registerGuestUser } from "../../functions/api/loginGuestUser"

const Login = () => {

  const loginStatus = useContext(LoginStatusContext)

  const [loginToggle, setLoginToggle] = useState(false)
  const [loginPwToggle, setLoginPwToggle] = useState(false)
  const [regPwToggle, setRegPwToggle] = useState(false)

  const router = useRouter();

  useEffect(() => {
    if(loginStatus?.isLoggedIn){
      router.push("/profile")
    }
  })

  const pageSwitch = () =>{
    setLoginToggle(!loginToggle);
    setLoginErrorMsg("")
    setRegErrorMsg("")
  }

  //Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] =useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const login = async (inputEmail: string, inputPassword: string) =>{
    const loginInput = {
      email: inputEmail,
      password: inputPassword
    }
    const loginResult = await loginUser(loginInput);
    if (loginResult.loginUser){
      setLoginErrorMsg("")
      localStorage.setItem('jwt_token', loginResult.loginUser.access_token)
      window.location.replace("/profile")
    }else{
      setLoginErrorMsg(loginResult)
    }
  }

  //Login as Guest
  const loginAsGuest = async () => {
    try{
      const guestEmail = await registerGuestUser();
      const loginResult = await loginGuestUser(guestEmail.createGuestUser);
      if (loginResult.loginGuestUser){
        localStorage.setItem('jwt_token', loginResult.loginGuestUser.access_token)
        window.location.replace("/profile")
      }
    }catch(e){
      return e;
    }
  }

  //Registeration
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regErrorMsg, setRegErrorMsg] = useState("");
  const [redirectMsg, setRedirectMsg] = useState("");

  const signUp = async () =>{

    const signUpInput = {
      firstname: regFirstName,
      lastname: regLastName,
      email: regEmail,
      password: regPassword,
      confirm_password: regConfirmPassword
    }
    const errorResult = await signupUser(signUpInput);
    if(errorResult){
      return setRegErrorMsg(errorResult);
    }
    setRedirectMsg(`Account Registration Success. You will be redirect after 3 seconds.`)
    setTimeout(() => {
      login(regEmail, regPassword)
    }, 3000)
  }

  return (
    <div className="bg-neutral-50 h-screen my-auto pt-40
    dark:bg-gray-900">
      {!loginToggle ?
      //Login
      (
      <div className="w-full max-w-[390px] mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-md py-10
      dark:bg-gradient-to-t dark:from-neutral-900 dark:via-zinc-800 dark:to-stone-800">
          <div className="text-3xl font-bold text-center text-gray-700 dark:text-white mb-5">Welcome Back</div>
          <div className="text-xl font-bold text-center text-gray-600 dark:text-zinc-300 mb-5 font-family_body2">Login your Auction House account.</div>
          <div className="flex flex-col gap-3 items-center">
              <div className="flex">
                  <InboxIcon className="w-6 h-10 mx-2"/><input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2
                  dark:bg--500" placeholder="Email Address" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
              </div>
              <div className="flex">
                  {!loginPwToggle ? <LockClosedIcon className="w-6 h-10 mx-2 cursor-pointer" onClick={() => setLoginPwToggle(!loginPwToggle)}/>
                    : <LockOpenIcon className="w-6 h-10 mx-2 cursor-pointer" onClick={() => setLoginPwToggle(!loginPwToggle)}/>}
                  <input type={loginPwToggle?"text":"password"} className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2
                  " placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
              </div>
              <div className="text-base text-rose-600 text-center px-3">{loginErrorMsg}</div>
              <button type="submit" className="slate-100 min-w-[180px] rounded-md shadow-sm text-lg font-family_body2 my-2
              bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300
              dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500" onClick={() => login(loginEmail, loginPassword)}>Login</button>
              <div className="text-center cursor-pointer slate-100 min-w-[180px] rounded-md shadow-sm text-lg font-family_body2 mb-1
              bg-gradient-to-t from-zinc-100 via-stone-300 to-neutral-300
              dark:bg-gradient-to-t dark:from-zinc-400 dark:via-stone-500 dark:to-neutral-500" onClick={() => loginAsGuest()}>Login as Guest</div>
          </div>
          <div className="border mx-6 my-3" />
          <div className="flex justify-center text-center text-lg font-family_body2 
          dark:text-gray-200">Don't have an account?
          <div className="ml-2 cursor-pointer text-sky-500
          dark:text-sky-400" onClick={() => pageSwitch()}>Register</div>
          </div>
      </div>
      )
      :
      //Registration
      (
      <div className="w-full max-w-[390px] mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-md py-10
      dark:bg-gradient-to-t dark:from-neutral-900 dark:via-zinc-800 dark:to-stone-800">
        <div className="text-3xl font-bold text-center text-gray-700 dark:text-white mb-5">Hello There </div>
        <div className="text-xl font-bold text-center text-gray-600 dark:text-zinc-300 mb-5 font-family_body2">Register your Auction House account.</div>
          <div className="flex flex-col gap-3 items-center">
            <div className="flex">
                <UserIcon className="w-6 h-10 mx-2"/><input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2
                dark:bg--500" placeholder="First Name" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)}></input>
            </div>
                <input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2 ml-10
                dark:bg--500" placeholder="Last Name" value={regLastName} onChange={(e) => setRegLastName(e.target.value)}></input>
            <div className="flex">
              <InboxIcon className="w-6 h-10 mx-2"/><input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2
              dark:bg--500" placeholder="Email Address" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} ></input>
            </div>
            <div className="flex">
              {!regPwToggle ? <LockClosedIcon className="w-6 h-10 mx-2 cursor-pointer" onClick={() => setRegPwToggle(!loginPwToggle)}/>
              : <LockOpenIcon className="w-6 h-10 mx-2 cursor-pointer" onClick={() => setRegPwToggle(!regPwToggle)}/>}
              <input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2
              " type={regPwToggle?"text":"password"} placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)}></input>
            </div>
            <input className="font-family_body2 text-lg min-w-[300px] w-1/5 h-9 px-3 border-b-2 ml-10
              " type={regPwToggle?"text":"password"} placeholder="Confirm Password" value={regConfirmPassword} onChange={(e) => setRegConfirmPassword(e.target.value)}></input>
            <div className="text-base text-rose-600 text-center px-3">{regErrorMsg}</div>
            <div className="text-base text-sky-500 text-center px-3">{redirectMsg}</div>
            <button type="submit" onClick={() => signUp()} className="slate-100 min-w-[180px] rounded-md shadow-sm text-lg font-family_body2 my-2
            bg-gradient-to-t from-emerald-100 via-green-400 to-teal-300
            dark:bg-gradient-to-t dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500">Register</button>
          </div>
          <div className="border mx-6 my-3" />
          <div className="flex justify-center text-center text-lg font-family_body2 
          dark:text-gray-200">Already have an account?
            <div className="ml-2 cursor-pointer text-sky-500
            dark:text-sky-400" onClick={() => pageSwitch()}>Login</div>
          </div>
      </div>
      )
      }
    </div>
  )
}

  export default Login