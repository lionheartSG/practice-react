import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

function CreatePost(props) {
  const [title, setTitle] = useState()
  const [body, setBody] = useState()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/create-post", { title, body, token: localStorage.getItem("complexappToken") }) //2nd argument is for any javascript object to send data to server
      props.addFlashMessage("Congrats, you successfully created a post")
      navigate(`/post/${response.data}`)
      console.log("New post was created")
    } catch (e) {
      console.log("There is a problem")
    }
  }
  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label HTMLfor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autofocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label HTMLfor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  )
}

export default CreatePost
