
const eventName = "QuBlitz"
const year = "2025"

/**
 * HOMEPAGE
 */

const faqs = [{
    question: `What is ${eventName}?`,
    answer: "It is an in-person challenge hackathon at Princeton University, focused on quantum computing challenges. This event is supported by IBM and a participant in IBM's global 2025 Qiskit Fall Fest."
},
{
    question: "Where will the event take place?",
    answer: "At Princeton University in Princeton, NJ"
},{
    question: "How long and at what time will the event be?",
    answer: "It will start at 9AM on November 15th and end at 3PM on November 16th, in all EST. In order to participate, you must attending opening ceremony and presentations held during the event. "
}, {
    question: "What will I be doing at the hackathon?",
    answer: "We will have multiple challenges for beginners who have never done quantum computing as well as for more experienced participants. Our prompts will be based off implementing research papers in quantum computing. We will not have rooms available for the entirety of the hackathon duration, so you are expected to work on the prompts off-site."
},{
    question: "Can I attend?",
    answer: "Unfortunately, if you have not received confirmation at this point, you cannot attend QuBlitz 2025. Please apply next year though!"
    // answer: "We have already sent out confirmations to accepted attendees. If you did not already receive an email notifying you of your acceptance, unfortunately, you will not be able to attend QuBlitz this year due to space limitations."
}]

const bulletpoints = [
    "IBM and Qiskit Swag",
    "Beginner and Advanced Challenges",
    "Quantum Computing Workshops",
    "Open to Princeton Students Only This Year"
]

/**
 * SCHEDULE
 */

const nov2 = [{
    time: "9:00-10:00AM",
    name: "Breakfast and Team-Building",
    //description: "Opening ceremony for event. All participants are required to attend.",
    location: "Frist MPR"
},
{
    time: "10:00-11:00AM",
    name: "Opening Ceremony",
    //description: "Opening ceremony for event. All participants are required to attend.",
    location: "Frist MPR"
},
{
    time: "11:00AM",
    name: "Challenges Released",
    //description: "Opening ceremony for event. All participants are required to attend.",
    //location: "TBD"
},{
    time: "1:00-2:00PM",
    name: "Beginner Challenge Workshop",
    //description: "Opening ceremony for event. All participants are required to attend.",
    location: "TBD"
},{
    time: "2:00-3:00PM",
    name: "Hardware Challenge Workshop",
    //description: "Opening ceremony for event. All participants are required to attend.",
    location: "TBD"
},{
    time: "3:00-4:00PM",
    name: "Algorithm Challenge Workshop",
    //description: "Opening ceremony for event. All participants are required to attend.",
    location: "TBD"
}
]
// },{
//     time: "12:00PM",
//     name: "Challenge Begins",
//     description: "Challenge prompts are released",
//     location: ""
// },{
//     time: "12:00PM-1:00PM",
//     name: "Workshops",
//     description: "",
//     location: "Frist 200 Level Rooms",
// },{
//     time: "1:30PM-3:00PM",
//     name: "Office Hours",
//     description: "",
// }]

const nov3 = [{
    time: "10:00AM",
    name: "Submissions Due",
},{
    time: "10:00AM-12:00PM",
    name: "Presentations",
    location: "Frist MPR"
},{
    time: "12:00-1:00PM",
    name: "Lunch",
},{
    time: "1:00-2:00PM",
    name: "Closing Cermony",
    location: "Frist MPR"
}]

/**
 * APPLICATION FORM
 */


// 0: Still Not Open 1: Open 2: Closed
var applicationsStatus = 2 // Set to a var, since this will be compared (will give an error if a const)

const formFields = [
    {
        title:"First Name",
        type:"text",
        required: true
    },
    {
        title:"Last Name",
        type:"text",
        required: true
    }, {
        title:"Do you attend Princeton University?",
        type:"mc",
        choices: ["Yes","No"],
        required: true
    },
    {
        title:"What school do you attend?",
        type:"text",
        required: true,
        dependentOn: 2, // index
        showOnAnswer: "No"
    },
    {
        title:"Select Your Level of Education (Current)",
        type:"mc",
        choices:[
        "High School Student", 
        "1st Year College Student",
        "2nd Year College Student",
        "3rd Year College Student",
        "4th+ Year College Student",
        "1st Year Graduate Student",
        "2nd+ Year Graduate Student",
        "Other"
        ],
        required: true
    },
    {
        title:"Indicate your experience with programming",
        type:"mc",
        choices: [
        "Never programmed before",
        "Programmed a few simple things before",
        "I have built small projects and/or programmed consistently at some point",
        "I have spent significant time programming",
        "I am very experienced or an expert at programming"
        ],
        required: true
    },
    {
        title:"Indicate how much exposure you have had to Quantum Computing",
        type:"mc",
        choices: [
        "Never heard of quantum computing",
        "Only heard of quantum computing, but know nothing about it",
        "Know basic facts about quantum computing",
        "Understand fundamentals of quantum computing",
        "I have built projects and/or conducted research in quantum computing"
        ],
        required: true
    },
    {
        title:"If applicable, detail your past experiences with quantum computing. (100 Words Max)",
        type:"longtext",
        required: true
    },
    {
        title:"Will you be able to attend Princeton QuBlitz In-Person, from November 15th to 16th, at Princeton University in Princeton, NJ? This includes the opening and closing ceremonies at noon on November 15th and 16th, respectively.",
        type:"mc",
        choices: [
        "Yes",
        "No"
        ],
        required: true
    },
    {
        title:"LinkedIn or other personal link:",
        type:"text",
        required: false
    },
    {
        title:"Any questions?",
        type:"longtext",
        required: false
    },
]  


export { eventName,faqs, bulletpoints,nov2,nov3,formFields,year,applicationsStatus}