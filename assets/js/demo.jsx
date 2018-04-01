import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import api from './api';

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default function run_demo(root, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Demo />
    </Provider>, root);
}
const mapStateToProps = state => {
  console.log("State in mapStatetoProps", state)
  return {
    users : state.users,
    posts : state.posts,
    new_user_form: {
      name: state.new_user_form.name,
      email: state.new_user_form.email,
      password: state.new_user_form.password,
      password_confirmation: state.new_user_form.password_confirmation,
    },
    edit_user_form:{
      name: state.edit_user_form.name,
      email: state.edit_user_form.email,
    },
    new_post_form: {
      user_id: state.new_post_form.user_id,
      name: state.new_post_form.name,
      body: state.new_post_form.body,
      complete: state.new_post_form.complete,
      time: state.new_post_form.time,
    },
    edit_post_form: {
      user_id: state.edit_post_form.user_id,
      name: state.edit_post_form.name,
      body: state.edit_post_form.body,
      complete: state.edit_post_form.complete,
      time: state.edit_post_form.time,
    },
    login_form: {
      name: state.login.name,
    },
    token: state.token,
  }
}

let Demo = connect((state) => mapStateToProps)((props) => {
  console.log("props", props)
   return (
     <Router>
       <div>
         {/* Login */}
         <Route path="/" exact={true} render={() =>
            <div>
              <div>
                <h1>Login</h1>
              </div>
                <div className="form-group">
                  Name<br/>
                <input type="text_input" id="name" name="name" placeholder="Username" value={props.login_form.name} onChange={api.update_login_form}/>
                </div>
                <div className="form-group">
                  Password<br/>
                <input type="password" id="pass" name="password"/>
                </div>
                <div className="form-group">
                  <Link to="/landing" onClick={() => api.submit_login($('#name').val(), $('#pass').val())} className= "btn btn-primary">Login!</Link>
                </div>
              <div>
                New Users Register <Link to="/users/new">here</Link>
              </div>
            </div>
          }/>

          {/* Show User */}
        <Route path="/landing" render={() =>
            {
              if(props.token && props.token != "Invalid")
              {
                return(
                  <div>
                    <div>
                      <h1>Hello {_.map(_.filter(props.users, (u) => u.id == props.token.user_id), (uu) => uu.name)}</h1>
                      <p>Your Details:</p>
                      <ul>
                          <li><b>Email:</b> {_.map(_.filter(props.users, (u) => u.id == props.token.user_id), (uu) => uu.email)}</li>
                          <li><b>Name:</b> {_.map(_.filter(props.users, (u) => u.id == props.token.user_id), (uu) => uu.name)}</li>
                      </ul>
                    </div>
                    <p><Link to={"/posts/new/" + props.token.user_id}>New Task</Link></p>
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
                            {_.map(_.filter(props.posts, (pp) => parseInt(props.token.user_id) == pp.user_id), (p) =>
                              <tr>
                                <td>{p.name}</td>
                                <td>{p.completed.toString()}</td>
                                <td>{p.time}</td>
                                <td><Link to={"/posts/show/" + p.id} onClick={() => null}>Show</Link></td>
                                <td><Link to={"/posts/edit/" + p.id}>Edit</Link></td>
                                <td><Link to="/landing" className="btn btn-danger" onClick={() => api.delete_post(p.id, props.token.user_id, props.token)}>Delete</Link></td>
                              </tr>
                            )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <p><Link to="/" className="btn btn-danger" onClick = {() => {api.delete_user(props.token.user_id, props.token)}}>Delete Profile</Link></p>
                      <p><Link to={"/users/edit/" + props.token.user_id}>Edit Profile</Link></p>
                      <p><Link to="/" onClick={() => api.resetToken()}>Logout</Link></p>
                    </div>
                  </div>
                );
              }
              else if (props.token == "Invalid"){
                  return(
                    <div>
                      Invalid username and password.<br/>
                      Please Re-Login.<br/>
                      <Link to="/">Back To HomePage</Link>
                    </div>
                  );
              }
              else {
                return (
                  <div>
                    Authenticating...Please Wait.
                    <div>
                      <Link to="/">Cancel</Link>
                    </div>
                  </div>
                );
              }
            }
          }/>

        {/* New User */}
        <Route path="/users/new" render={() =>
            <div>
              <div>
              <h1>New User</h1>
                  <div className="form-group">
                    Name<br/>
                  <input className="text-input" id="user_name" name="name" placeholder="Username" value={props.new_user_form.name} onChange={api.update}/>
                  </div>
                  <div className="form-group">
                    Email<br/>
                  <input className="text-input" id="email" name="email" placeholder="Email" value={props.new_user_form.email} onChange={api.update}/>
                  </div>
                  <div className="form-group">
                    Password<br/>
                  <input type="password" id="password" name="password" />
                    <p id="passwordHelpBlock" class="form-text text-muted">
                      Your password must be 7-20 characters long, contain letters and numbers, and must not contain spaces.
                    </p>
                  </div>
                  <div className="form-group">
                    Password Confirmation<br/>
                  <input type="password" id="password_confirmation" name="password_confirmation"/>
                  </div>
                  <div className="form-group">
                    <Link to="/" className="btn btn-primary" onClick={() => api.create_user()}>Register</Link>
                    <button className="btn btn-secondary" onClick={() => api.clear_new_user_form()}>Clear</button>
                  </div>
                  <div>
                    <Link to="/">Back</Link>
                  </div>
              </div>
            </div>
        }/>

      {/* Edit User */}
      <Route path="/users/edit/:id" render={({match}) =>
        <div>
            <h1>Edit User</h1>
              <div className="form-group">
                Name<br/>
              <input type="text_input" id="user_name" name="name" value={props.edit_user_form.name} onChange={api.update_edit_user_form} required/>
              </div>
              <div className="form-group">
                Email<br/>
              <input type="text_input" id="email" name="email" value={props.edit_user_form.email} onChange={api.update_edit_user_form} required/>
              </div>
              <div className="form-group">
                <Link to="/landing" onClick={() => api.edit_user(match.params.id, props.token)} className= "btn btn-primary">Update User</Link>
                <button className="btn btn-secondary" onClick={() => api.clear_edit_user_form()}>Clear</button>
              </div>
            <div>
              <Link to="/landing">Back</Link>
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
              <select id="user_id" name="user_id" required value={props.new_post_form.user_id} onChange={api.update_new_post_form}>
                  <option key="" value="">Select</option>
                  {_.map(props.users, (u) =>
                    <option key={u.id} value={u.id}>{u.name}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                Enter Task Name<br/>
              <input type="text_input" id="task_name" name="name" value={props.new_post_form.name} onChange={api.update_new_post_form} required/>
              </div>
              <div className="form-group">
                Describe the Task<br/>
              <textarea className="form-control" rows="5" id="body" name="body" value={props.new_post_form.body} onChange={api.update_new_post_form}></textarea>
              </div>
              Is the Task Complete?<br/>
              <div className="checkbox">
              <input id="complete" type="checkbox" name="compelete" value={api.get_value(props.new_post_form.completed)} onChange={api.update_new_post_form}/>
              </div>
              <div className="form-group">
                Time Spent on This Task<br/>
              <input type="number_input" id="time" name="time" value={props.new_post_form.time} onChange={api.update_new_post_form} required/>
              </div>
              <div className="form-group">
                <Link to="/landing" className="btn btn-primary" onClick={() => {api.create_post(match.params.id, props.token)}} >Create Task</Link>
                <button className="btn btn-secondary" onClick={() => api.clear_new_post_form()}>Clear</button>
              </div>
              <div>
              <Link to="/landing">Back</Link>
              </div>
            </div>
        }/>

      {/* Show Post */}
      <Route path="/posts/show/:id" render={({match}) =>
            <div>
              <h2>Show Task</h2>
              <div>
                <ul>
                  <li> Task Name: {_.map(_.filter(props.posts, (pp) => match.params.id == pp.id), (t) => t.name)}</li>
                  <li> Assigned To: {_.map(_.filter(props.posts, (pp) => match.params.id == pp.id), (t) => _.map(_.filter(props.users, (uu) => uu.id == t.user_id), (z) => z.name))}</li>
                  <li> Task Discription: {_.map(_.filter(props.posts, (pp) => match.params.id == pp.id), (t) => t.body)}</li>
                  <li> Task Name: {_.map(_.filter(props.posts, (pp) => match.params.id == pp.id), (t) => t.name)}</li>
                  <li> Ammount of Time Spent on This Task: {_.map(_.filter(props.posts, (pp) => match.params.id == pp.id), (t) => t.time)}</li>
                </ul>
              </div>
              <div>
                <Link to="/landing">Back</Link>
              </div>
            </div>
          }/>

        {/* Edit Post */}
        <Route path="/posts/edit/:id" render={({match}) =>
          <div>
            <div>
              <h2>Edit Task {_.map(_.filter(props.posts, (pp) => match.params.id == pp.id), (t) => t.name)}</h2>
            </div>
            <div className="form-group">
              Select a user<br/>
            <select id="user_id" required name="user_id" value={props.edit_post_form.user_id} onChange={api.update_edit_post_form}>
                <option>Select</option>
                {_.map(props.users, (u) =>
                  <option key={u.id} value={u.id}>{u.name}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              Enter Task Name<br/>
            <input type="text_input" name="name" value={props.edit_post_form.name} onChange={api.update_edit_post_form} required/>
            </div>
            <div className="form-group">
              Describe the Task<br/>
            <textarea className="form-control" name="body" rows="5" id="body" value={props.edit_post_form.body} onChange={api.update_edit_post_form}></textarea>
            </div>
            Is the Task Complete?<br/>
            <div className="checkbox">
            <input id="complete" type="checkbox" name="complete" value={api.get_value(props.new_post_form.completed)} onChange={api.update_edit_post_form} />
            </div>
            <div className="form-group">
              Time Spent on This Task<br/>
            <input type="number_input" id="time" name="time" value={props.edit_post_form.time} onChange={api.update_edit_post_form} required/>
            </div>
            <div className="form-group">
              <Link to="/landing" className="btn btn-primary" onClick={() => {api.update_post(match.params.id, props.token.user_id, props.token)}}>Update Task</Link>
              <button className="btn btn-secondary" onClick={() => api.clear_edit_post_form()}>Clear</button>
            </div>

            <div>
            <Link to="/landing">Back</Link>
            </div>
          </div>
        } />
       </div>
     </Router>
   );
});
