import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from 'use-immer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080" // set it as a default base URL

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

// My Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import CreatePost from "./components/CreatePost"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"
import Profile from "./components/Profile"
import EditPost from "./components/EditPost"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar")
    }
  } // consist of all of our data. Live in this overall object.

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        // return { loggedIn: true, flashMessages: state.flashMessages }
        draft.loggedIn = true
        draft.user = action.data //receive from headerloggedout
        break // or return
      case "logout":
        // return { loggedIn: false, flashMessages: state.flashMessages }
        draft.loggedIn = false
        break // or return
      case "flashMessage":
        // return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
        draft.flashMessages.push(action.value)
        break // or return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState) //2nd argument is initialstate which is declared above

  useEffect(()=>{
    if(state.loggedIn) {
      localStorage.setItem("complexappToken", state.user.token) // first is the name of the storage, second is the item
      localStorage.setItem("complexappUsername", state.user.username) // first is the name of the storage
      localStorage.setItem("complexappAvatar", state.user.avatar) // first is the name of the storage
    } else {
      localStorage.removeItem("complexappToken") // first is the name of the storage, second is the item
      localStorage.removeItem("complexappUsername") // first is the name of the storage
      localStorage.removeItem("complexappAvatar") // first is the name of the storage
    }
  }, [state.loggedIn])

  // const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken"))) //initialvalue
  // const [flashMessages, setFlashMessages] = useState([])

  // function addFlashMessage(msg) {
  //   setFlashMessages(prev => prev.concat(msg))
  // }

  // {{ addFlashMessage, setLoggedIn }}

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/profile/:username/*" element={<Profile />} />
            <Route path="/post/:id/edit" element={<EditPost />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
