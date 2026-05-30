import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UseGetCurrentUser from "./hooks/UseGetCurrentUser.jsx"
export const serverUrl = "http://localhost:8000"

function App() {
  UseGetCurrentUser()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App