import React from 'react'
import useRouteElement from './useRouteElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function App() {
  const routeElement = useRouteElement()
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}
