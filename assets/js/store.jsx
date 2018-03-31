import { createStore, combineReducers } from 'redux';

/*
   state layout:
   {
    posts: [... Posts ...],
    users: [... Users ...],
    new_user_form: {
      name: "",
      email: "",
    }
     edit_user_form: {
        user_name: "",
        email: "",
     }
     new_post_form:{
        user_id: "",
        name: "",
        body: "",
        complete: "",
        time= "",
     }
  }
*/

function posts(state = [], action) {
  switch (action.type) {
  case 'POSTS_LIST':
    return [...action.posts];
  // case 'ADD_POST':
  //   return [action.post, ...state];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USERS_LIST':
      return [...action.users];
    default:
      return state;
    }
}

let empty_new_user_form = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

let empty_edit_user_form = {
  name: "",
  email: "",
};

let empty_new_post_form = {
  user_id: "",
  name: "",
  body: "",
  complete: "",
  time: "",
};

let empty_edit_post_form = {
  user_id: "",
  name: "",
  body: "",
  complete: "",
  time: "",
};

function new_user_form(state = empty_new_user_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function edit_user_form(state = empty_edit_user_form, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_USER_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function new_post_form(state = empty_new_post_form, action) {
  switch (action.type) {
    case 'UPDATE_NEW_POST_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function edit_post_form(state = empty_edit_post_form, action) {
  switch (action.type) {
    case 'UPDATE_EDIT_POST_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  //console.log("reducer", action);
  let reducer = combineReducers({posts, users, new_user_form, edit_user_form, new_post_form, edit_post_form});
  let state1 = reducer(state0, action);
  //console.log("state1", state1);
  return state1;
  //return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
