"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import {eventName} from "./../content/content"




export default function Header(){
    const [showMenu,setShowMenu] = useState<boolean>(true)

    useEffect(()=>{
        if(window.innerWidth<767){
            setShowMenu(true)
        }
    },[])

    return <header>
        
        <Link href="/"><h1>{eventName} 2024</h1></Link>
        <div className="header-space"></div>
        <button className="menu-button" onClick={()=>setShowMenu(!showMenu)}><IoMenu></IoMenu></button>
        {showMenu&&<div className="menu">
            <Link className="menu-link" href="/#faq">FAQ</Link>
            <Link className="menu-link" href="/schedule">Schedule</Link>
            <Link className="menu-link apply-button" href="/application" >Apply</Link>
        </div>}
    </header>
}