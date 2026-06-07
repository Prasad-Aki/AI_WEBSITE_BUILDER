import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import UseGetCurrentUser from "./hooks/UseGetCurrentUser.jsx"
import { useSelector } from "react-redux"
import Dashboard from "./pages/Dashboard.jsx"
import Generate from "./pages/Generate.jsx"
import WebEditor from "./pages/WebEditor.jsx"
export const serverUrl = "http://localhost:8000"

function App() {
  UseGetCurrentUser()
  const { userData } = useSelector(state => state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={userData ? <Dashboard /> : <Home />}></Route>
        <Route path="/generate" element={userData ? <Generate /> : <Home />}></Route>
        <Route path="/editor/:id" element={userData ? <WebEditor /> : <Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App