import React from 'react'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import { Routes, Route } from 'react-router-dom'
import Restaurant from './pages/Restaurant'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  return (

    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/orders/" element={<Orders />} />
        <Route path="/checkout/" element={<Checkout />} />
      </Routes>


      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  )
}

export default App