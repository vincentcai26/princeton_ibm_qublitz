"use client"

import Loading from "@/components/Loading"
import { auth, db } from "@/config/firebase"
import { formFields } from "@/content/content"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function index(){
    const [appsObj,setAppsObj] = useState<any>({})
    const [loading,setLoading] = useState<boolean>(false)
    const [acceptCount,setAcceptCount] = useState<number>(0)

    const updateAcceptanceStatus = async (uid:string,acceptBool:boolean) => {
        var newAppsObj = {...appsObj}
        newAppsObj[uid]["isAccepted"] = acceptBool //"isAccepted" is name of the attibute
        setAcceptCount(acceptCount + (acceptBool?1:-1))
        setLoading(true)
        try{
            var d = doc(db,"applications",uid)
            await setDoc(d,newAppsObj[uid])
            setAppsObj(newAppsObj)
        }catch(e){
            console.error(e)
        }finally{
            setLoading(false)
        }
    }

    const updateShowStatus = async (uid:string,showBool:boolean) => {
        var newAppsObj = {...appsObj}
        newAppsObj[uid]["isShow"] = showBool
        setAcceptCount(acceptCount + (showBool?1:-1))
        setLoading(true)
        try{
            var d = doc(db,"applications",uid)
            await setDoc(d,newAppsObj[uid])
            setAppsObj(newAppsObj)
        }catch(e){
            console.error(e)
        }finally{
            setLoading(false)
        }
    }

    const updateShowRes = (uid:string) => {
        var newAppsObj = {...appsObj}
        newAppsObj[uid]["showRes"] = !newAppsObj[uid]["showRes"]
        setAppsObj(newAppsObj)
    }

    const getApps = async () => {
        setLoading(true)
        try{
            var allDocs = await getDocs(collection(db,"applications"))
            var thisObj: Record<string,any> = {}
            var count = 0
            allDocs.forEach(doc=>{
                var uid = doc.id
                thisObj[uid] = {...doc.data(),showRes: false}
                if(thisObj[uid]["isAccepted"]) count++
            })
            setAppsObj(thisObj)
            setAcceptCount(count)

        }catch(e){
            console.error(e)
        }finally{
            setLoading(false)
        }
    }

    const generateList = () => {
        var arr = Object.keys(appsObj).map(key=>{
            var obj = appsObj[key]

            var responsesList = []
            var responses = obj["responses"]
            for (var i = 0;i<formFields.length;i++){
                responsesList.push(<li key={i}>
                    <div className="question">{formFields[i]["title"]}</div>
                    {responses[i]&&<p className="answer">{responses[i]}</p>}
                </li>)
            }

            var isAccepted = obj["isAccepted"]
            var isShow = obj["isShow"]

            return <li key={key} className="single-application-container">
                <button className={`single-application ${isAccepted&&"accepted"} ${isShow&&'show'}`} onClick={()=>updateShowRes(key)}>
                    <div className="email">{obj["email"]}</div> 
                    {obj["showRes"]&&<ul className="responses-list">{responsesList}</ul>}
                </button>
                <button onClick={()=>updateAcceptanceStatus(key,!isAccepted)} className={`acceptbutton ${isAccepted?"accepted":"rejected"}`}>{isAccepted?"Reject":"Accept"}</button>
                <button onClick={()=>updateShowStatus(key,!isShow)} className={`acceptbutton ${isShow?"accepted":"rejected"}`}>{isShow?"Hide":"Show"}</button>
            </li>
        })
        return arr
    }

    useEffect(()=>{
        getApps()
    },[])

    
    var totalCount = appsObj ? Object.keys(appsObj).length : 0

    return <div>
        <h2>Admin Panel</h2>
        <p>All applications are listed below. </p>
        <p>Accepted: {acceptCount} | Rejected: {totalCount - acceptCount} | Total: {totalCount}</p>
        <ul className="applications-list">
            {generateList()}
        </ul>   

        {loading&&<div className="gob">
            <div className="popup">
                <Loading></Loading>
            </div>    
        </div>}     
    </div>
}