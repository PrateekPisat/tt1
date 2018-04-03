import store from './store';

class TheServer
{
 request_users() {
      $.ajax("/api/v1/users", {
        method: "get",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: (resp) => {
          store.dispatch({
            type: 'USERS_LIST',
            users: resp.data,
          });
        },
      });
    }

    request_tasks() {
        $.ajax("/api/v1/posts", {
          method: "get",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          success: (resp) => {
            store.dispatch({
              type: 'POSTS_LIST',
              posts: resp.data,
            });
          },
        });
      }

  update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        let action = {
          type: 'UPDATE_FORM',
          data: data,
        };
        //console.log(action);
        store.dispatch(action);
      }

  update_edit_user_form(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        let action = {
          type: 'UPDATE_EDIT_USER_FORM',
          data: data,
        };
        //console.log(action);
        store.dispatch(action);
      }

  update_new_post_form(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        let action = {
          type: 'UPDATE_NEW_POST_FORM',
          data: data,
        };
        //console.log(action);
        store.dispatch(action);
      }

  update_edit_post_form(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        let action = {
          type: 'UPDATE_EDIT_POST_FORM',
          data: data,
        };
        //console.log(action);
        store.dispatch(action);
      }

    update_login_form(ev) {
        let tgt = $(ev.target);
        let data = {};
        data[tgt.attr('name')] = tgt.val();
        let action = {
          type: 'UPDATE_LOGIN_FORM',
          data: data,
        };
        //console.log(action);
        store.dispatch(action);
        }

    clear_new_post_form()
    {
      let action = {
        type: 'CLEAR_NEW_POST_FORM',
      };
      //console.log(action);
      store.dispatch(action);
    }

    clear_edit_post_form()
    {
      let action = {
        type: 'CLEAR_EDIT_POST_FORM',
      };
      //console.log(action);
      store.dispatch(action);
    }

    clear_new_user_form()
    {
      let action = {
        type: 'CLEAR_NEW_USER_FORM',
      };
      //console.log(action);
      store.dispatch(action);
    }

    clear_edit_user_form()
    {
      let action = {
        type: 'CLEAR_EDIT_UESR_FORM',
      };
      //console.log(action);
      store.dispatch(action);
    }

    clear_login_form()
    {
      let action = {
        type: 'CLEAR_LOGIN_FORM',
      };
      //console.log(action);
      store.dispatch(action);
    }

  create_user()
  {
  let usName = $('#user_name').val();
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
    success: () => {
            this.request_users();
            this.clear_new_user_form();
            alert("Profile Created. Please Login With Your Credentials.")
      },
      error: (textStatus, errorThrown) => {
        alert(errorThrown + "! Please Check the input field. No field should be blank.");
      },
  });
  }

  edit_user(id, token)
  {
  let usName = $('#user_name').val();
  let email = $('#email').val();
  let text = JSON.stringify({
        id : id,
        token: token,
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
          alert("Proile Updated with: \n name: "+usName+" \n email: "+email);
          this.request_users();
          this.clear_edit_user_form();
      },
      error: (textStatus, errorThrown) => {
        alert(errorThrown + "! Please Check the input field. No field should be blank.");
      },
  });
  }

  delete_user(id, token)
  {
    let data = JSON.stringify({
      token: token
    });
  $.ajax("/api/v1/users/" + id, {
    method: "DELETE",
    dataType: "json",
    data: data,
    contentType: "application/json; charset=UTF-8",
  });
  alert("User Deleted!");
  }

  create_post(id, token)
  {
    let us_id = parseInt($('#user_id').val());
    console.log(us_id)
    let task_name = $('#task_name').val();
    let body = $('#body').val();
    var complete = $('#complete').val();
    let time = parseInt($('#time').val());
    if(complete == "true")
      complete = true
    else {
      complete = false
      }
    let text = JSON.stringify({
          token: token,
          post: {
            name: task_name,
            user_id: us_id,
            body: body,
            completed: complete,
            time: time
          }
    });
    if (time % 15 == 0 && time >= 0)
    {
        $.ajax("/api/v1/posts", {
          method: "POST",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: text,
          success: (resp) => {
                alert("Task Created");
                this.request_tasks();
                this.clear_new_post_form();
            },
            error: (textStatus, errorThrown) => {
              alert(errorThrown + "! Please Check the input field. No field should be blank.");
            }
        });
    }
    else {
      alert("Time should be non-negative and in increments of 15");
    }
  }

  update_post(id, user_id, token)
  {
    let us_id = parseInt($('#user_id').val());
    console.log(us_id)
    let task_name = $('#name').val();
    let body = $('#body').val();
    var complete = $('#complete').val();
    console.log(complete)
    let time = parseInt($('#time').val());
    if(complete == "true")
      complete = true
    else {
      complete = false
      }
    let text = JSON.stringify({
          token: token,
          id: id,
          post: {
            name: task_name,
            user_id: us_id,
            body: body,
            completed: complete,
            time: time
          }
    });
    if (time % 15 == 0 && time >= 0)
    {
        $.ajax("/api/v1/posts", {
          method: "POST",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: text,
          success: (resp) => {
                alert("Task Created");
                this.request_tasks();
                this.clear_new_post_form();
            },
            error: (textStatus, errorThrown) => {
              alert(errorThrown + "! Please Check the input field. No field should be blank.");
            }
        });
    }
    else {
      alert("Time should be non-negative and in increments of 15");
    }
  }

  delete_post(id, user_id, token)
  {
    let data = JSON.stringify({
      token: token
    });
  $.ajax("/api/v1/posts/" + id, {
    method: "DELETE",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: data,
    success: (resp) => {
          alert("Task Deleted!")
          this.request_tasks();
      },
      error: (textStatus, errorThrown) => {
        alert(errorThrown + " " + textStatus);
      },
  });
  }

  get_value(checkBoxInput)
  {
    if(checkBoxInput)
      return "on"
      else {
        return "off"
      }
  }

  submit_login(name, pass) {
    let data = {
        name: name,
        password: pass,
    }
    $.ajax("/api/v1/session", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
        this.clear_login_form();
      },
      error:(resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: "Invalid",
        });
      }
    });
  }

  resetToken()
  {
    store.dispatch({
      type: 'SET_TOKEN',
      token: null,
    });
  }

}

export default new TheServer();
