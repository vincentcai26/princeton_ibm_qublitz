import {nov2,nov3} from "./../../content/content"

export default function page(){
    const generateSchedule = (arr:any[]) => {
        return <ul className="schedule-list">{arr.map(a=>{
            return <li key={a.time}>
                <div className="time">{a.time}</div>
                <div className="info">
                    <div className="title">{a.name}</div>
                    <p>{a.description}</p>
                    <label>{a.location}</label>
                </div>
            </li>
        })}</ul>
    }

    return <div id="schedule">
        <h3>Schedule</h3>
        <p>Subject to change</p>
        <h4>November 15th</h4>
        {generateSchedule(nov2)}
        <h4>November 16th</h4>
        {generateSchedule(nov3)}
    </div>
}