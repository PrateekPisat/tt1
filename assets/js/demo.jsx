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
    this.request_posts();
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

    request_posts() {
        $.ajax("/api/v1/posts", {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          success: (resp) => {
            this.setState(_.extend(this.state, { posts: resp.data }));
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

create_post(id)
{
  let us_id = parseInt($('#user_id').val());
  console.log(us_id)
  let task_name = $('#task_name').val();
  let body = $('#body').val();
  var complete = $('#complete').val();
  let time = parseInt($('#time').val());
  if(complete == "on")
    complete = true
  else {
    compelete = false
    }
  let text = JSON.stringify({
        post: {
          name: task_name,
          user_id: us_id,
          body: body,
          completed: complete,
          time: time
        }
  });
  $.ajax("/api/v1/posts", {
    method: "POST",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => {
          alert("Task Added")
          window.location.replace("/users/show/" + id);
      },
  });
}

update_post(id, user_id)
{
  let us_id = parseInt($('#user_id').val());
  console.log(us_id)
  let task_name = $('#task_name').val();
  let body = $('#body').val();
  var complete = $('#complete').val();
  let time = parseInt($('#time').val());
  if(complete == "on")
    complete = true
  else {
    compelete = false
    }
  let text = JSON.stringify({
        id: id,
        post: {
          name: task_name,
          user_id: us_id,
          body: body,
          completed: complete,
          time: time
        }
  });
  $.ajax("/api/v1/posts/" + id, {
    method: "PUT",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => {
          alert("Task Updated")
          window.location.replace("/users/show/" + user_id);
      },
  });
}

delete_post(id, user_id)
{
  $.ajax("/api/v1/posts/" + id, {
    method: "DELETE",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    success: (resp) => {
          alert("Profile Deleted!")
          window.location.replace("/users/show/" + user_id);
      },
  });
}



getUser(id)
{
  console.log(id)
  var post = _.filter(this.state.posts, (pp) => id == pp.id)
  console.log(post);
  var user = _.find(this.state.users, (u) => {u.id == post.user_id})
  return user.name;
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
            <p><Link to={"/posts/new/" + match.params.id}>New Task</Link></p>
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
                <tbody>
                    {_.map(_.filter(this.state.posts, (pp) => parseInt(match.params.id) == pp.user_id), (p) =>
                      <tr>
                        <td>{p.name}</td>
                        <td>{p.completed.toString()}</td>
                        <td>{p.time}</td>
                        <td><Link to={"/posts/show/" + p.id}>Show</Link></td>
                        <td><Link to={"/posts/edit/" + p.id}>Edit</Link></td>
                        <td><button className="btn btn-danger" onClick={() => this.delete_post(p.id, match.params.id)}>Delete</button></td>
                      </tr>
                    )}
                </tbody>
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
      <Route path="/users/edit/:id" render={({match}) =>
        <div>
            <h1>New User</h1>
            <div className="form-group">
              Name<br/>
            <input type="text_input" id="user_name" name="name" />
            </div>
            <div className="form-group">
              Email<br/>
            <input type="text_input" id="email" name="email" />
            </div>
            <div className="form-group">
              <input type="button" value="Update Profile" onClick={() => this.edit_user(match.params.id)} className= "btn btn-primary"/>
            </div>
            <div>
              <Link to={"/users/show/" + match.params.id}>Back</Link>
            </div>
        </div>
      }/>

    {/* New Post */}
      <Route path="/posts/new/:id" render={({match}) =>
            <div>
              <div>
                <h2>New Task</h2>
              </div>
              <div className="form-group">
                Select a user<br/>
                <select id="user_id" required>
                  {_.map(this.state.users, (u) =>
                    <option key={u.id} value={u.id}>{u.name}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                Enter Task Name<br/>
              <input type="text_input" id="task_name"/>
              </div>
              <div className="form-group">
                Describe the Task<br/>
              <textarea className="form-control" rows="5" id="body"></textarea>
              </div>
              Is the Task Complete?<br/>
              <div className="checkbox">
              <input id="complete" type="checkbox"/>
              </div>
              <div className="form-group">
                Time Spent on This Task<br/>
              <input type="number_input" id="time"/>
              </div>
              <div className="form-group">
              <button className="btn btn-submit" onClick={() => {this.create_post(match.params.id)}}>Create Post</button>
              </div>
              <div>
              <Link to={"/users/show/" + match.params.id}>Back</Link>
              </div>
            </div>
        }/>

      <Route path="/posts/show/:id" render={({match}) =>
            <div>
              <h2>Show Task</h2>
              <div>
                <ul>
                  <li> Task Name: {_.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.name)}</li>
                  <li> Assigned To: {_.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => _.map(_.filter(this.state.users, (uu) => uu.id == t.user_id), (z) => z.name))}</li>
                  <li> Task Discription: {_.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.body)}</li>
                  <li> Task Name: {_.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.completed)}</li>
                  <li> Ammount of Time Spent on This Task: {_.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.time)}</li>
                </ul>
              </div>
              <div>
                <Link to={"/users/show/" + _.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.user_id)}>Back</Link>
              </div>
            </div>
          }/>

        <Route path="/posts/edit/:id" render={({match}) =>
          <div>
            <div>
              <h2>Edit Task {_.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.name)}</h2>
            </div>
            <div className="form-group">
              Select a user<br/>
              <select id="user_id" required>
                {_.map(this.state.users, (u) =>
                  <option key={u.id} value={u.id}>{u.name}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              Enter Task Name<br/>
            <input type="text_input" id="task_name" />
            </div>
            <div className="form-group">
              Describe the Task<br/>
            <textarea className="form-control" rows="5" id="body" ></textarea>
            </div>
            Is the Task Complete?<br/>
            <div className="checkbox">
            <input id="complete" type="checkbox"/>
            </div>
            <div className="form-group">
              Time Spent on This Task<br/>
            <input type="number_input" id="time" />
            </div>
            <div className="form-group">
            <button className="btn btn-submit" onClick={() => {this.update_post(match.params.id, _.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.user_id))}}>Update Task</button>
            </div>
            <div>
            <Link to={"/users/show/" + _.map(_.filter(this.state.posts, (pp) => match.params.id == pp.id), (t) => t.user_id)}>Back</Link>
            </div>
          </div>
        } />
       </div>
     </Router>
   );
 }
}
