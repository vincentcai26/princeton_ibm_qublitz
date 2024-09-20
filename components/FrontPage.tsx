"use client"

import Image from "next/image";
import QuantumCircuit from "./QuantumCircuit";
import { FaCalendar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {faqs,bulletpoints,eventName} from "./../content/content"


export default function FrontPage(){

    const [showAns,setShowAns] = useState<boolean[]>([])

    const generateFAQ = ():any[] => {
        var res:any[] = []
        var count = 0
        faqs.forEach(q=>{
            var thisCount = count
            res.push(<button className="single-faq" data-num={thisCount} onClick={(e)=>{
                var newShowAns = [...showAns]
                var i = Number((e.target as HTMLElement).getAttribute("data-num"))
                i = thisCount
                newShowAns[i] = !newShowAns[i]
                setShowAns(newShowAns)
            }}><div className="question">{q.question}</div>{showAns[thisCount] && <p>{q.answer}</p>}</button>)
            count++
        })
        return res
    }

    return <div>
        <section className="row1">
            <div>
                <h2>{eventName} 2024</h2>
                <p>Princeton Students in Quantum x IBM</p>
                <QuantumCircuit></QuantumCircuit>
                <div className="coords">
                    <div className="date"><FaCalendar className="calendar-icon"/> November 2-3, 2024</div>
                    <p><FaLocationDot className="location-icon" /> Princeton University</p>

                </div>
            </div>
            <div className="col1">
                <div className="logos-row">
                    <Image src={"./qfflogo.png"} alt="Qiskit Fall fest Logo" height={150} width={150}></Image>
                    <RxCross2 className="cross-icon"/>
                    <Image className="second-image" src={"./psqlogo.png"} alt="Qiskit Fall fest Logo" height={150} width={150}></Image>
                </div>
                <label>A Qiskit Fall Fest 2024 Event</label>
            </div>
        </section>
        <section className="row2">
            <p>Princeton Students in Quantum, Princeton University’s only undergraduate and graduate 
student organization for quantum computing, is hosting a quantum computing challenge hackathon from November 2nd-3rd. </p>
        </section>
        <section className="row3">
            {bulletpoints.map(b=>{
                return <div className="single-point"><label><FaStar className="star-icon"></FaStar></label>{b}</div>
            })}</section>

        <section className="row4">
            <h3 id="faq">FAQ</h3>
            <div className="all-faqs">
            {generateFAQ()}
            </div>
        </section>

        

    </div>
}