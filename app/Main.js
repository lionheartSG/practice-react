import React, { useState, useReducer } from "react"
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

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: []
  } // consist of all of our data. Live in this overall object.

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        // return { loggedIn: true, flashMessages: state.flashMessages }
        draft.loggedIn = true
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

  const [state, dispatch] = useImmerReducer(ourReducer, initialState) //2nd argument is initial value

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
