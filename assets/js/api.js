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
      },
      error: (textStatus, errorThrown) => {
        alert(errorThrown);
      },
  });
  }

  edit_user(id)
  {
  let usName = $('#user_name').val();
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
          alert("Proile Updated with: \n name: "+usName+" \n email: "+email);
          this.request_users();
      },
      error: (textStatus, errorThrown) => {
        alert(errorThrown);
      },
  });
  }

  delete_user(id)
  {
  $.ajax("/api/v1/users/" + id, {
    method: "DELETE",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
  });
  alert("User Deleted!");
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
      complete = false
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
    if (time % 15 ==0)
    {
        $.ajax("/api/v1/posts", {
          method: "POST",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: text,
          success: (resp) => {
                alert("Task Created");
                this.request_tasks();
            },
            error: (textStatus, errorThrown) => {
              alert(errorThrown);
            }
        });
    }
    else {
      alert("Time should be in the increments of 15");
    }
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
          this.request_tasks();
      },
    error: (textStatus, errorThrown) => {
      alert(errorThrown);
    }
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
          this.request_tasks();
      },
      error: (textStatus, errorThrown) => {
        alert(errorThrown);
      },
  });
  }

  get_value(checkBoxInput)
  {
    if(checkBoxInput)
      return "On"
      else {
        return "Off"
      }
  }

}

export default new TheServer();
