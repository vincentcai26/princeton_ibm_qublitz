export default function QuantumCircuit(){
    return <div>
        <div className="qc-line">
            <span className="horizline line1"></span><span className="gate">P</span>
            <span className="verticalline line1"></span>
            <span className="dot"></span>

            <span className="horizline2 line1"></span>
        </div>
        <div className="qc-line">
            <span className="horizline line1"></span><span className="gate">S</span>
            <span className="verticalline line1"></span>
            <span className="dot"></span>


            <span className="horizline2 line1"></span>
        </div>
         <div className="qc-line">
            <span className="horizline line1"></span><span className="gate">Q</span><span className="horizline2 line1"></span>
        </div>
       
    </div>
}