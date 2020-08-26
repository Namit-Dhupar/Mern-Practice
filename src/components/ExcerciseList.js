import React, {useState, useEffect, useCallback} from 'react';
import Excercise from './Excercise'
import axios from 'axios';

const ExcerciseList = () => {
    const [excercises, setExcercises] = useState([]);
    
    useEffect(() =>{
        axios.get('http://localhost:5000/excercises')
        .then(response => setExcercises(response.data))
        .catch(error => console.log("Something went wrong"))
    },[]);

    const deleteExcercise = useCallback(id =>{
        console.log(id);
        axios.delete('http://localhost:5000/excercises/'+id)
        .then( res => console.log(res.data))
        .then(
            setExcercises(excercises.filter(el => el._id !== id)) //._id is from MongoDB
        )
    },[excercises]);

    return (
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
         <Excercise Tabexcercise={excercises} removeExcercise={deleteExcercise} />
          </tbody>
        </table>
      </div>
    )
}
export default ExcerciseList;
