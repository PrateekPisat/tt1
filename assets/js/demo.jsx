import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default function run_demo(root) {
  ReactDOM.render(<Demo />, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      users: [],
    };

    this.request_users();
  }

  request_users() {
      $.ajax("/api/v1/users", {
        method: "get",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: (resp) => {
          this.setState(_.extend(this.state, { users: resp.data }));
        },
      });
    }

create_user()
{
  let usName = $('#user_name').val();
  console.log(usName);
  let pass = $('#password').val();
  let passC = $('#password_confirmation').val();
  let email = $('#email').val();
  let text = JSON.stringify({
        user: {
          name: usName,
          password: pass,
          password_confirmation: passC,
          email: email,
        }
  });
  $.ajax("/api/v1/users", {
    method: "POST",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => {
          alert("Welcome " + resp.name + "!")
          window.location.replace("/users/show/" + resp.id);
      },
  });
}

edit_user(id)
{
  let usName = $('#user_name').val();
  console.log(usName);
  let email = $('#email').val();
  let text = JSON.stringify({
        id : id,
        user: {
          name: usName,
          email: email,
        }
  });
  $.ajax("/api/v1/users/" + id, {
    method: "PUT",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => {
          alert("Proile Updated");
          window.location.replace("/users/show/" + id);
      },
  });
}

delete_user(id)
{
  $.ajax("/api/v1/users/" + id, {
    method: "DELETE",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: (resp) => {
          alert("Profile Deleted!")
          window.location.replace("/");
      },
  });
}

  render() {
   return (
     <Router>
       <div>
         {/* Login */}
         <Route path="/" exact={true} render={() =>
            <div>
              <form action="/session" method="post">
                <div className="form-group">
                  Name
                  <input type="text_input" name="name" placeholder="Username" />
                </div>
                <div className="form-group">
                  Password
                  <input type="password" name="password"/>
                </div>
                <div className="form-group">
                  <input type="submit" value="Login!" class= "btn btn-primary"/>
                </div>
              </form>
              <div>
                New Users Register <Link to="/users/new">here</Link>
              </div>
            </div>
          }/>
        {/* New User */}

        <Route path="/users/new" render={() =>
            <div>
              <div>
              <h1>New User</h1>
                  <div className="form-group">
                    Name<br/>
                    <input type="text_input" id="user_name" name="name" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    Email<br/>
                  <input type="text_input" id="email" name="email" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    Password<br/>
                    <input type="password" id="password" name="password"/>
                  </div>
                  <div className="form-group">
                    Password Confirmation<br/>
                    <input type="password" id="password_confirmation" name="password_confirmation"/>
                  </div>
                  <div className="form-group">
                    <input type="button" value="Login!" onClick={() => this.create_user()} className= "btn btn-primary"/>
                  </div>
                  <div>
                    <Link to="/">Back</Link>
                  </div>
              </div>
            </div>
        }/>
      {/* Show User */}


      <Route path="/users/show/:id/" render={({match}) =>
          <div>
          <div>
            <h1>Hello {_.map(_.filter(this.state.users, (pp) => match.params.id == pp.id), (u) => u.name)}</h1>
            <p>Your Details:</p>
            <ul>
                <li><b>Email:</b> {_.map(_.filter(this.state.users, (pp) => match.params.id == pp.id), (u) => u.email)}</li>
                <li><b>Name:</b> {_.map(_.filter(this.state.users, (pp) => match.params.id == pp.id), (u) => u.name)}</li>
            </ul>
          </div>
          <p><Link to="/posts/new">New Task</Link></p>
          <div>
            Your Tasks
            <table className = "table">
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Completed?</th>
                  <th>Total Time</th>
                </tr>
              </thead>
              {/* Table Body */}
            </table>
          </div>
          <div>
            <p><button className="btn" onClick = {() => {this.delete_user(match.params.id)}}>Delete Profile</button></p>
            <p><Link to={"/users/edit/" + match.params.id}>Edit Profile</Link></p>
            <p><a href="/session" method="delete">Logout</a></p>
          </div>
          </div>
      }/>

      {/* Edit User */}
      <Route path="/users/edit/:id/" render={({match}) =>
        <div>
            <h1>New User</h1>
            <div className="form-group">
              Name<br/>
            <input type="text_input" id="user_name" name="name" value={_.map(_.filter(this.state.users, (pp) => match.params.id == pp.id), (u) => u.name)} />
            </div>
            <div className="form-group">
              Email<br/>
            <input type="text_input" id="email" name="email" value={_.map(_.filter(this.state.users, (pp) => match.params.id == pp.id), (u) => u.email)} />
            </div>
            <div className="form-group">
              <input type="button" value="Update Profile" onClick={() => this.edit_user(match.params.id)} className= "btn btn-primary"/>
            </div>
            <div>
              <Link to={"/users/show/" + match.params.id}>Back</Link>
            </div>
        </div>
      }/>
       </div>
     </Router>
   );
 }
}
