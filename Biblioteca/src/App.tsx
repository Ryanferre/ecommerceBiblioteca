import { useState } from 'react'
import './App.css'
import Header from './HeaderAndFooter/Header/Header'
import { Outlet } from "react-router-dom"
import DataCostum from './Settings/Custum'
import Footer from './HeaderAndFooter/Header/Footer'

function App() {

    const [ModalViewMenu, setvisiblemenu]= useState<string>('-top-90')
    const [EmailUser, setEmail]= useState('')
    const [wichUl, setwich]= useState<boolean | null>(false)

    const MoveModalMenu= (e: string)=>{
      setvisiblemenu(e)
    }

    const GetEmailUser= (e: string)=>{
      setEmail(e)
    }

    const Getwich= (e: boolean | null)=>{
      setwich(e)
    }


  return (
     <DataCostum.Provider value={{ ModalViewMenu, MoveModalMenu, EmailUser, GetEmailUser, wichUl, Getwich }}>
          <Header />
          <Outlet />
          <Footer />
      </DataCostum.Provider>
  )
}

export default App
