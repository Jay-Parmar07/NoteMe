import { createStore, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./reducers/notesReducer";


const reducer = combineReducers({
  //this will contain all our reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
});

// const dummyReducer = (state = {}, action) => state;
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    userUpdate: userUpdateReducer
  },
  initialState: {
    userLogin: { userInfo: userInfoFromStorage },
  }
});

export default store;







// const store = configureStore(
//     reducer,
//     initialState,
//  )

// export default store;