import React, {memo, Fragment} from 'react';
import {Link} from 'react-router-dom';

const Excercise = memo(props => {
    return(
        <Fragment>
        {props.Tabexcercise.map(ex => (
         <tr key={ex._id}>
            <td>{ex.username}</td>
            <td>{ex.description}</td>
            <td>{ex.duration}</td>
            <td>{ex.date.substring(0,10)}</td>
            <td>
           <Link to={"/edit/"+ex._id}>edit</Link> | <a href="#" onClick={() => { props.removeExcercise(ex._id) }}>delete</a>
           </td>  
          </tr>
        ))}  
      </Fragment>
    )    
})

export default Excercise;
