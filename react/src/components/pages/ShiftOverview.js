import React,{useState, useEffect, useContext} from 'react';
import {auth} from '../../firebase/firebase';
import {UserContext} from '../../App';


const ShiftOverview =  () => {
const [showAllShifts, setShowAllShifts] = useState('');
const userInfo = useContext(UserContext);
console.log(userInfo);  

const handleClick = async ()  => {
    const token = await auth().currentUser.getIdToken();
    console.log(token);
    const header = {
      "Content-Type": "application/json",
      'authorization': `Sowmya ${token}`
    };
    await fetch("http://localhost:8080/shiftsData", {
      method: "GET",
      headers: header
    })
      .then(res => res.json())
      .then(data => setShowAllShifts(data))
      .catch(error => console.log(error));
  };
  console.log(showAllShifts)

    return (
       <>
        <h1>sort shifts</h1>
        <button onClick={() => handleClick()}>Shifts list</button>
{    <ul>{showAllShifts.length > 0 ? showAllShifts.map((shift) => <li>{shift.name}</li>) : <h2>No Info</h2> }</ul>
}{  /*      <form>
            <label htmlFor="filterEmployee"></label>
            <input type="text" id="htmlFor" name="searchName" value={searchName} onChange={e => setSearchName(e.target.value)}/>
            <button>Search</button>
        </form>
*/}        </>
    )}
export default ShiftOverview
