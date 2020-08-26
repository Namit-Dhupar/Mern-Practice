import React, {useState} from 'react';
import axios from 'axios'; //For sending data to backend

const CreateUser = () => {

    const [username, setUsername] = useState('');

    const submitHandler = event =>{
        event.preventDefault();
        const users = {
          username: username,
        }
        axios.post('http://localhost:5000/users/add', users) //Sending Add Request to Backend
        .then(res => console.log(res.data))
        .then(setUsername(''))
        .catch(err => console.log("Something Went Wrong"));
    }

    return (
        <div>
        <h3>Create New Users</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                id="username"
                required
                className="form-control"
                value={username}
                onChange={event => setUsername(event.target.value)}
                />
          </div>  
          <div className="form-group">
            <input type="submit" value="Create Users" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
}
export default CreateUser;
