import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ExcerciseList, CreateUser, EditExcercise, CreateExcercise} from './components'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <br/>
    <Route path="/" exact component={ExcerciseList} />
    <Route path="/edit/:id" component={EditExcercise} />
    <Route path="/create" component={CreateExcercise} />
    <Route path="/user" component={CreateUser} />
    </BrowserRouter>
  );
}

export default App;
