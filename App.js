import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import ExpenseDetails from './components/ExpenseDetails';
import About from './components/About';
import Contact from './components/Contact';
import Expenses from './components/Expenses';
import ErrorPage from './components/Error'
import Login from './components/Login';
import UserContext from './utils/UserContex';
import getUserDetails from './utils/getUserDetails';
import EditExpense from './components/EditExpense';
const AppLayout = ()=>{
    const [userName, setUserName] = useState('');
    const userInfo = getUserDetails();
   
    useEffect(()=>{
        
           userInfo && setUserName(userInfo.name) 
        
    },[userName])
    return (
    <UserContext.Provider value={{logedInUser:userName, setUserName}}>
    {userName? <div className='app'>
        <Header/>
        <Outlet/>
    </div>:<Login/>}
    </UserContext.Provider>
  
    )
}

const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout/>,
      children: [
        {
          path: '/home',
          element: <Body/>
        },
        {
        path: '/about',
        element: <About/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/expenses',
        element:<Expenses/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/expenses/edit/:expenseId',
        element: <EditExpense/>
      }
    ],
      errorElement: <ErrorPage/>
    }
    
  ])

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>)