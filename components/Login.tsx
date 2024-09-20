import { useEffect, useState } from "react"
import {auth, db} from "./../config/firebase"
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, doc, setDoc } from "firebase/firestore";

interface Error{
    message: string
}

export default function Login(){
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [error,setError] = useState<string>("")
    const [isLogin,setIsLogin] = useState<boolean>(true)
    const [pageContents,setPageContents] = useState<any>(true);

    const login = async (email:string,password:string) => {
        try{
            const userCreds = await signInWithEmailAndPassword(auth,email,password)
            const user = userCreds.user
        }catch(e:any){
            // print(e)
            if (e) {
                setError("Unable to Login. Check Email and Password.")
            }
        }
    }

    const register = async (email:string,password:string) => {
        if(!email.includes("@")){
            setError("Invalid Email")
            return
        }

        if (password.length < 6){

            setError("Password must be at least 6 characters")
            return
        }
        try{
            var newDocVals = {
                email:email,
                isSubmitted: false,
                responses: {}
            }
            const userCreds = await createUserWithEmailAndPassword(auth,email,password)
            const user = userCreds.user
            await setDoc(doc(db,"applications",user.uid),newDocVals)
        }catch(e:any){
            if (e) {
                setError("An Error Occured. Unable to Register.")
            }
        }
    }

    useEffect(()=>{
        setPageContents(<div id="login-form">
        <h3>{isLogin?"Login":"Register"}</h3>
        <input onChange={e=>{
            setEmail(e.target.value);
            setError("")
        }} placeholder="Email" value={email}></input>
        <input type="password" onChange={e=>{
            setPassword(e.target.value)
            setError("")
        }} placeholder="Password" value={password}></input>
        {error && <div className="error">{error}</div>}
        <button className="login-button " onClick={()=>isLogin?login(email,password):register(email,password)}>{isLogin?"Login":"Register"}</button>
        <button className="toggle-login" onClick={()=>setIsLogin(!isLogin)}>Or {isLogin?" Register New Account":"Login to Existing Account"}</button>
    </div>)
    },[email,password,error,isLogin])

    return pageContents
}