import { useState, useEffect } from "react"
import { useUser } from '@clerk/clerk-react'
import { Link } from "react-router-dom";

const LikinForUser= ()=>{
    const { user, isLoaded }= useUser()
    const [Emailuser, setEmail]= useState<string>('')
    const [apressInLayout, setapress]= useState([<></>])

    useEffect(()=>{
        if(isLoaded){
            setapress([
              <Link to="/"><li key="4" className="font-bold  text-[#bbbbbb] hover:text-black cursor-pointer">Home</li></Link>,
              <Link to="/Cart"><li key="5" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Cart</li></Link>,
              
              <ul className="flex flex-row mx-20 gap-6">
                <li key="1" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Descontos</li>
                <li key="2" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Categorias</li>
                <li key="3" className="font-bold text-[#bbbbbb] hover:text-black cursor-pointer">Cupons Ativos</li>
              </ul>
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

    return(
        <>
           {apressInLayout}
        </>
    )
}

export default LikinForUser