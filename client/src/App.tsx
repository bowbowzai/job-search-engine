import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ForgotPasswordForm from './pages/ForgotPassword'
import ActivatingEmail from './pages/ActivatingEmail'
import PrivateRoute from './utils/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/activate/:uid/:token" element={<ActivatingEmail />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      </Routes>
    </div>
  )
}

export default App
