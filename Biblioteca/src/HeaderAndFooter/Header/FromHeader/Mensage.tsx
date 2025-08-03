import DataCostum from "../../../Settings/Custum"
import { useContext } from "react"
import { useEffect, useState } from "react"

const Mensage= ()=>{
    const {MensageInfor, GetMensageInfor}= useContext(DataCostum)

    const [visibleMensage, getMensage]= useState('hidden')


    useEffect(()=>{
        if(MensageInfor != null){
            getMensage('flex')
            const timer = setTimeout(() => {
                getMensage('hidden');
                GetMensageInfor(null)
            }, 5000);

            return () => clearTimeout(timer);
        }

    }, [MensageInfor])
    
    return(
        <div className={`${visibleMensage} absolute ml-[10%] mt-[17%] lg:ml-[40%] lg:mt-[2.3%] w-max flex-row bg-white py-3 px-2 gap-2 border rounded-[.5em] border-[#00ccbe]`}>
           {MensageInfor}
        </div>
    )
}

export default Mensage