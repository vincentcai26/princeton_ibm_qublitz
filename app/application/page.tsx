"use client"

import Loading from "@/components/Loading";
import Login from "@/components/Login";
import { useMyContext } from "@/config/context";
import { auth, db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

import {formFields} from "./../../content/content"

export default function Home() {
  const context = useMyContext()
  const [form,setForm] = useState<any[]>([])
  const [mcShow,setMcShow] = useState<any[]>()
  const [loading,setLoading] = useState<boolean>(false);
  const [showSubmit,setShowSubmit] = useState<boolean>(false);
  const [error,setError] = useState<boolean>(false);
  const [isSubmitted,setIsSubmitted] = useState<boolean>(false)
  const [formErr,setFormErr] = useState<boolean>(false);

  const changeState = (i:number,val:any) =>{
    var newForm = {...form}
    newForm[i] = val
    setForm(newForm)
  }

  const generateForm = ():any[] =>{
    var res:any[] = []
    var count = 0
    formFields.forEach(f=>{
      var qEl = <div></div>
      switch (f.type){
        case "text":
          qEl = <input 
            data-number={count} 
            onChange={(e)=>changeState(Number(e.target.getAttribute("data-number")),e.target.value)}
            value={form ? form[count]:""}
            ></input>
          break;
        case "mc":
          if (f.choices){
            var selectedEl = form ? form[count] : null
            var mcChosen = selectedEl ? selectedEl : <span>-- Select --</span>
            var choices = f.choices.map(c=><button
              data-number={count} 
              className={`mc-choice ${(form && form[count] == c) && "chosen"}`}
              onClick={e=>changeState(Number((e.target as HTMLElement).getAttribute("data-number")),c)}>{c}</button>)
            qEl = <div className="mc">
              <button className="mc-chosen">
                {mcChosen}
              </button>
              <div className="mc-choices">
                {choices}
              </div> 
            </div>
            
          }
      }
      if (!(f.dependentOn && form[f.dependentOn] != f.showOnAnswer)){
          res.push(<div className="app-question">
          <h5>{f.title}</h5>
          {qEl}
        </div>)
      }
      count++

    })
    return res
  }

  const populateForm = async () => {
    setLoading(true)
    try{
      var uid = auth.currentUser?auth.currentUser.uid:""
      if (uid.length > 0){
        const docRef = doc(db, "applications", uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          var data = docSnap.data()
          setForm(data["responses"])
          setIsSubmitted(data["isSubmitted"]||false)
        }
      }
    }catch(e){
      setError(true)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(context.isAuth){
      populateForm()
    }
  },[context])

  // useEffect(()=>{
  //   setFormContent(generateForm())
  // }) //no dependency array, will always rerender


  const saveApp = async () => {
    setLoading(true)
    try{
      // await db

      var uid:string = auth.currentUser?auth.currentUser.uid:""
      if (uid.length > 0){
        await setDoc(doc(db, "applications",uid), {
          email: auth.currentUser?.email,
          isSubmitted: false,
          responses: form
        });
      }
    }catch(e){
      setError(true)
    }finally{
      setLoading(false)
    }
  }

  const submitApp = async () => {
    setLoading(true)
    setShowSubmit(false)
    // check if all required fields are satisfied:
    for(var i = 1;i<formFields.length;i++){
      if(formFields[i].required && (!form[i])){
        if (formFields && formFields[i].dependentOn){
          var dep:number = formFields[i].dependentOn || -1
          if (formFields[i].showOnAnswer != form[dep]) continue;
        }
        setLoading(false)
        return setFormErr(true)
      }
    }

    try{
      // await db
      var uid:string = auth.currentUser?auth.currentUser.uid:""
      if (uid.length > 0){
        await setDoc(doc(db, "applications",uid), {
          email: auth.currentUser?.email,
          isSubmitted: true,
          responses: form
        });
      }
      setIsSubmitted(true)
    }catch(e){
      setError(true)
    }finally{
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true);
    setIsSubmitted(false);
    setForm([]);
    try{
      await auth.signOut()
    }catch(e){
      console.error(e)
    }finally{
      setLoading(false)
    }
  }

  if (!context || !context.isAuth){
    return <Login></Login>
  }

  if (loading){
    return <div className="gob">
        <div className="popup">
         <Loading></Loading>
        </div>
      </div>
  }

  if(isSubmitted){
    return <div className="submitted">
      <h3>Congratulations! You have submitted your application!</h3>
      <p>Please check back on this page in the coming weeks to view your decision. Your email is {auth.currentUser?.email}.</p>
      <Link href="/" className="save-for-later">Back to Homepage</Link>
      <button className="logout-button" onClick={logout}>Logout</button>

    </div>
  }

  return (
    <div> 
      <div className="application-header">
        <h2>Qublitz 2024 Application</h2>
      </div>
      <p>Your email is {auth.currentUser?.email}. <button className="logout-button" onClick={logout}>Logout</button></p>

      {generateForm()}
      <div className="app-buttons">
        <button className="save-for-later" onClick={saveApp}>Save For Later</button>
        <button className="submit" onClick={()=>setShowSubmit(true)}>SUBMIT</button>
      </div>


      {showSubmit&&<div className="gob">
        <div className="popup submitPopup">
          <p>Are you sure you want to submit? This cannot be undone.</p>
          <button className="save-for-later" onClick={()=>setShowSubmit(false)}>Cancel</button>
          <button className="submit" onClick={submitApp}>Yes, Submit</button>
        </div>
      </div>}

      {error&&<div className="gob">
        <div className="popup error">
          An Error Occured
          <button className="save-for-later" onClick={()=>setError(false)}>Exit</button>
        </div>
      </div>}


      {formErr&&<div className="gob">
        <div className="popup formErr">
         Not all required fields are answered. 
         <button className="save-for-later" onClick={()=>setFormErr(false)}>Exit</button>
        </div>
      </div>}
    </div>

  );
}
