"use client"

import { auth, db } from "@/config/firebase"
import { formFields } from "@/content/content"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function index(){
    const [appsObj,setAppsObj] = useState<any>({})
    const [loading,setLoading] = useState<any>({})

    const updateAcceptanceStatus = async (uid:string,acceptBool:boolean) => {
        var newAppsObj = {...appsObj}
        newAppsObj[uid]["isAccepted"] = acceptBool //"isAccepted" is name of the attibute
        try{
            var d = doc(db,"applications",uid)
            await setDoc(d,newAppsObj[uid])
            setAppsObj(newAppsObj)
        }catch(e){
            console.error(e)
        }
    }

    const updateShowRes = (uid:string) => {
        var newAppsObj = {...appsObj}
        newAppsObj[uid]["showRes"] = !newAppsObj[uid]["showRes"]
        setAppsObj(newAppsObj)
    }

    const getApps = async () => {
        try{
            var allDocs = await getDocs(collection(db,"applications"))
            var thisObj = {}
            allDocs.forEach(doc=>{
                var uid:string = doc.id
                thisObj[uid] = {...doc.data(),showRes: false}
            })
            setAppsObj(thisObj)
        }catch(e){
            console.error(e)
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

            return <li key={key} className="single-application-container">
                <button className={`single-application ${isAccepted&&"accepted"}`} onClick={()=>updateShowRes(key)}>
                    <div className="email">{obj["email"]}</div> 
                    {obj["showRes"]&&<ul className="responses-list">{responsesList}</ul>}
                </button>
                <button onClick={()=>updateAcceptanceStatus(key,!isAccepted)} className={`acceptbutton ${isAccepted?"accepted":"rejected"}`}>{isAccepted?"Reject":"Accept"}</button>
            </li>
        })

        return arr
    }

    useEffect(()=>{
        getApps()
    },[])

    return <div>
        <h2>Admin Panel</h2>
        <p>All applications are listed below.</p>
        <ul className="applications-list">
            {generateList()}
        </ul>        
    </div>
}