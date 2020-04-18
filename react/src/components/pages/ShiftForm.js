import React,{useState, useContext} from 'react';
import {UserContext} from '../../App';
import {auth} from '../../firebase/firebase';



const  ShiftForm = () => {
    const userInfo = useContext(UserContext);
    console.log(userInfo);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const shiftInfo = {
            name: name,
            start: startDate,
            end: endDate
        }
        console.log(shiftInfo);
       const token = await auth().currentUser.getIdToken();
       console.log(token);
        fetch('http://localhost:8080/shiftsData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Sowmya ${token}`
            },
            body: JSON.stringify(shiftInfo)
        })
    }

    return (
        <>
        <a href="https://www.google.com/" target="_blank">Hello</a>
        <form onSubmit={handleSubmit}>
            <label htmlFor="nameId">Name
            <input type="text" name="name" id="nameId" value={name} onChange={e => setName(e.target.value)} placeholder="Enter fullname"/>
            </label>
            <label htmlFor="startId">Start
            <input type="datetime-local" name="startDate" value={startDate}id="startId" onChange={e => setStartDate(e.target.value)}  />
            </label>
            <label htmlFor="endId">End
            <input type="datetime-local" name="endDate" id="endId" value={endDate} onChange={e => setEndDate(e.target.value)}/>
            </label>
            <button>Save Shift</button>
        </form>

        </>

    )
}

export default ShiftForm
