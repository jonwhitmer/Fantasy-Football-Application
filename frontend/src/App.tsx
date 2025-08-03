import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm />} />
      {/* <Route path="/register" element={<RegisterForm />} /> */}
    </Routes>
    </>
  )
}

export default App;
