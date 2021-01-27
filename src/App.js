import './App.css';
import {Repositories, User} from './Repositories.js';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";


function App() {
  return (
    <div className="container-fluid">
      <a className="h1" href="/">Github Users</a>
      <hr />
      <div className="row">
        <Router>
          <Switch>
            <Route path="/user/:user/repositories">
              <User />
              <Repositories />
            </Route>
            <Route path={["/:id", "/"]}>

              <UsersList />
              <Routing />

            </Route>
          </Switch>
        </Router>
      </div>
    </div >
  );
}

function UsersList() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://api.github.com/users?since=" + id * 15 + "&per_page=15");
      const users = await response.json();
      setUsers(users);
    };
    loadData()
  }, [])
  return users.map(function (user) {
    return (

      <div key={user.id} className="col-md-3 my-2">
        <div className="card" >
          <div className="row no-gutters">
            <div className="col-md-4 col-6">
              <img src={user.avatar_url} className="img-fluid p-1" alt="user avatar" />
            </div>
            <div className="col-md-8 col-6">
              <div className="card-header">
                <h5 className="h5"><strong>{user.login}</strong></h5>
              </div>
              <div className="card-body">
                <div className="card-text">Github: <a href={user.html_url} target="_blank" rel="noreferrer">{user.html_url}</a></div>
                <a href={"/user/" + user.login + "/repositories"} className="btn btn-info d-flex justify-content-center my-1" >Repositorios</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

function Routing() {
  const { id } = useParams();
  var currentUser = parseInt(id) + 1;
  if (!currentUser) {
    currentUser = 1;
  }
  return (
    <div className="col mt-5">
      <a href={"/" + currentUser} className="btn btn-success float-right mb-5">Next Page</a>
    </div>
  )
}


export default App;