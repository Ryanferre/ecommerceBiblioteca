import { useContext, useState, useEffect } from "react";
import type { itensJson } from "../../Home/FromHome/ULClientOurAniciante/UlAnunciante"
import { useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import axios from "axios";
import DataCostum from "../../Settings/Custum";

type Object= {
    itensinfor: itensJson
}
const Apress= ()=>{
    const location = useLocation() as Location & { state: Object }
    const {EmailUser, GetMensageInfor}= useContext(DataCostum)//pega o email que foi armazenando em uma chave no context
    const [Qrcode, setQR]= useState<any>([''])
    const [replaceSrcImage, setSrc]= useState<string | null>('')
    const { itensJson } = location.state

    const getInAPiQr= async ()=>{
         const getQR= await axios.get('https://qrcode-5bpy.onrender.com/codeqrgenerate')
         if(getQR){
            setQR([getQR.data])
          }
    }

    const BtnVisibleQR= ()=>{
       const requisitionServer= async ()=>{
            if(EmailUser != ''){//verifica se o meil existe se sim, e feito uma requisicao passando o email
                setSrc('https://i.postimg.cc/85fnWrQW/abra-o-livro.gif')
                setTimeout(() => {
                    getInAPiQr()
                }, 3000);
            }else{
                GetMensageInfor([<p className="text-[#bbbbbb]">Faca login para concluir a sua compra!</p>])
            }
         }

         requisitionServer()
    }

    useEffect(()=>{
        setSrc(itensJson?.imgBook)
        console.log(replaceSrcImage)
    }, [])

    useEffect(()=>{
        setSrc(Qrcode)
    }, [Qrcode])

    return(
        <section className="flex flex-col lg:flex-row gap-20 py-10 px-5 lg:px-0">
            <div className={`w-60 mx-auto lg:mx-10 lg:w-90 ${replaceSrcImage == '' ? 'hidden' : 'flex flex-col items-center justify-center'}`} style={{backgroundImage: `${Qrcode[0] == '' ? 'url(https://i.postimg.cc/85fnWrQW/abra-o-livro.gif)' : 'url(https://i.postimg.cc/Wbz2dT5v/Captura-de-tela-2025-08-03-121512.png)'}`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className={`w-60 h-30 mb-11 mx-auto flex flex-col items-center justify-center lg:mx-10 lg:w-90`}>
                    {Qrcode[0] == '' ? <p className="text-[1em] text-[#00ccbe] font-semibold">Aguarde...</p> : <img className="shadow-2xl w-23 lg:w-37 shadow-[#636363]" src={Qrcode}/>}
                </div>
            </div>
            <img className={`w-60 mx-auto lg:mx-10 lg:w-90 ${replaceSrcImage == '' ? 'flex' : 'hidden'}`} src={itensJson.imgBook} />
            <div className="flex flex-col gap-3 lg:mx-10">
                <h1 className="text-2xl font-semibold">{itensJson.titleBook}</h1>
                <label className="flex flex-row gap-2">
                    <p className="text-[1em] font-semibold">Altor:</p>
                    <p className="text-[1em]">{itensJson.nameAutorBook}</p>
                </label>
                <h2 className="text-[1.3em] font-semibold">description</h2>
                <div className="h-40 overflow-y-scroll">
                    <p>{itensJson.descriptionBook}</p>
                </div>
                <label className="flex justify-end flex-row gap-2">
                    <p className="text-[1em] font-semibold">Price:</p>
                    <p className="text-[2em] text-[#00ccbe]">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL',}).format(itensJson.priceBook)}</p>
                </label>
                <button onClick={BtnVisibleQR} className="w-max px-6 lg:px-8 py-[.2em] lg:py-[.4em] font-bold text-white rounded-3xl bg-[#00ccbe] hover:bg-[#00ccbe]/50 cursor-pointer">Buy</button>
            </div>
        </section>
    )
}

export default Apress