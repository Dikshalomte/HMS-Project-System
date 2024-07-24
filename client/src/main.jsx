import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import NewHospital from './components/NewHospital/NewHospital.jsx'
import SignUp from './components/Signup/SignUp.jsx'
import Login from './components/Login/Login.jsx'
import UserContextProvider from './components/context/UserContextProvider.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,

    children: [
      { path: 'home', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'newHospital', element: <NewHospital /> },
      { path: 'signup', element: <SignUp /> },
      { path: '', element: <Login /> }
      // Add more routes as needed
    ],
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
    
  </React.StrictMode>,
)
