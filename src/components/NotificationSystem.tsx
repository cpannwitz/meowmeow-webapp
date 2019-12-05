import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const NotificationProvider: React.FC = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3500}
      hideProgressBar={true}
      draggablePercent={60}
    />
  )
}

export default NotificationProvider
