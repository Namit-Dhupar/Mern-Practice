import React, {useState, useRef, useEffect, memo} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

const EditExcercise = memo(props => {
   
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const inputRef = useRef();
    const urlparamid = props.match.params.id; //this is used to extract the id from url
  
    //Fetching the data from Database
    useEffect(() => {
     axios.get('http://localhost:5000/excercises/'+urlparamid)
     .then(response => {
         setUsername(response.data.username);
         setDescription(response.data.description);
         setDuration(response.data.duration);
         setDate(new Date(response.data.date));
     })
     .catch(err => console.log("Something Went Wrong"));

      axios.get('http://localhost:5000/users/')
      .then(response => {
        if(response.data.length > 0){
          const userlist = response.data.map(user => user.username);
          const firstname = response.data[0].username
          setUsers(userlist);
          setUsername(firstname);
        }
      })
      .catch(err => console.log("Something went wrong"))   
    },[urlparamid])

    const submitHandler = event =>{
        event.preventDefault();
        const excercise = {
          username: username,
          description: description,
          duration: duration,
          date: date
        }
        //Sending Data to Database
        axios.post('http://localhost:5000/excercises/update/'+urlparamid, excercise)
        .then(res => console.log(res.data))
        .then(setUsername(''),
        setDuration(0),
        setDescription('')
         )
        .catch(err => console.log("Something Went Wrong"));
        window.location="/"; //Redirect to homepage
    }

    return (
        <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref={inputRef}
                required
                id="username"
                className="form-control"
                value={username}
                onChange={event => setUsername(event.target.value)}>
                  {
                    users.map( user => (
                      <option key={user} value={user}>
                        {user}
                      </option>
                    ))
                  }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                id="description"
                required
                className="form-control"
                value={description}
                onChange={event => setDescription(event.target.value)}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                id="duration"
                className="form-control"
                value={duration}
                onChange={event => setDuration(event.target.value)}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                id="date"
                selected={date}
                onChange={date => setDate(date)}
              />
            </div>
          </div>
  
          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
});
export default EditExcercise;
