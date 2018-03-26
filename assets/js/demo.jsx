import React, {Component} from 'react';
import ReactDOM from 'react-dom';import { Button } from 'reactstrap';
import { Button } from 'reactstrap';
import { container } from 'reactstrap';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export default function run_demo()
{
  ReactDOM.render(<Main/>, document.getElementById('root'));
}

class Main extends React.Component {

}

class Registration extends React.Component  {
    render() {
        return (
            <h1>New User</h1>
            <form action="/api/v1/users/index" method="post">
              <div class="form-group">
                Name
                <input type="text_input" name="name" placeholder="Username" >
              </div>
              <div class="form-group">
                Password
                <input type="password" name="password">
              </div>
              <div class="form-group">
                Password
                <input type="password" name="password_confirmation">
              </div>
              <div class="form-group">
                <input type="submit" value="Login!", class: "btn btn-primary">
              </div>
            </form>
        )
    }
}
