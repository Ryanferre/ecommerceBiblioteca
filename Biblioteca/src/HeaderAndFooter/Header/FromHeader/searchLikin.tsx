import { useState, useEffect, useContext } from "react"
import { useUser } from '@clerk/clerk-react'
import { Link } from "react-router-dom";
import DataCostum from "../../../Settings/Custum";

const LikinForUser= ()=>{
    const { user, isLoaded }= useUser()
    const [Emailuser, setEmail]= useState<string>('')
    const [apressInLayout, setapress]= useState([
        <li key="1" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Features</li>,
        <li key="2" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Pricing</li>,
        <li key="3" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Resources</li>,
    ])

    const {GetEmailUser, Getwich}= useContext(DataCostum)

    

    const Cliente= ()=>{
            setapress([
              <Link to="/"><li key="4" className="font-bold  text-[#bbbbbb] hover:text-black cursor-pointer">Home</li></Link>,
              <Link to="/Cart"><li key="5" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Cart</li></Link>,
              <li key="6" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">About</li>,
              <details className="group z-20 lg:absolute lg:left-120" key="7"><summary className="appearance-none list-none font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Account preference</summary><ul><li onClick={Anuciante} className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Advertiser</li><li onClick={Cliente} className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Client</li></ul></details>
            ])
            Getwich(false)
    }

    const Anuciante= ()=>{
            setapress([
              <li key="4" className="font-bold  text-[#bbbbbb] hover:text-black cursor-pointer">My Ads</li>,
              <li key="5" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Sales</li>,
              <Link to="/Anuncio"><li key="6" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Announce</li></Link>,
              <details className="group z-20 lg:absolute lg:left-120" key="7"><summary className="appearance-none list-none font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Account preference</summary><ul><li onClick={Anuciante} className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Advertiser</li><li onClick={Cliente} className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Client</li></ul></details>
            ])
            Getwich(true)
    }

    useEffect(()=>{
        if(isLoaded){
            setapress([
              <Link to="/"><li key="4" className="font-bold  text-[#bbbbbb] hover:text-black cursor-pointer">Home</li></Link>,
              <Link to="/Cart"><li key="5" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Cart</li></Link>,
              <li key="6" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">About</li>,
              <details className="group z-20 lg:absolute lg:left-120" key="7"><summary className="appearance-none list-none font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Account preference</summary><ul><li onClick={Anuciante} className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Advertiser</li><li onClick={Cliente} className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Client</li></ul></details>
            ])
        }else{
          setapress([
              <li key="1" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Features</li>,
              <li key="2" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Pricing</li>,
              <li key="3" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Resources</li>
            ])
        }
    }, [Emailuser])

    useEffect(()=>{
       if(isLoaded && user?.primaryEmailAddress != null){
        setEmail(user.primaryEmailAddress.emailAddress)
       }else{
        console.log('error de login')
       }
    }, [isLoaded])

    useEffect(()=>{
      GetEmailUser(Emailuser)
    }, [Emailuser])

    return(
        <>
           {apressInLayout}
        </>
    )
}

export default LikinForUser