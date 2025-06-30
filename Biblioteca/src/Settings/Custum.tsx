import { createContext, useState } from "react";
import type { ReactNode } from 'react';

interface TypeCostumData {
    ModalViewMenu: string,//modal menu mobile
    EmailUser: string | null,//armazenamento do email do usuario(esse email foi retirado do clerck)
    wichUl: boolean | null,
    Getwich: (e: boolean | null) => void,
    MoveModalMenu: (e: string) => void//funcao para manipular avibilidade
    GetEmailUser: (e: string)=> void//funcao para pegar o email
}

export const DataCostum = createContext<TypeCostumData>({
    ModalViewMenu: '-top-90',
    EmailUser: '',
    wichUl: null,
    Getwich: () => {},
    MoveModalMenu: ()=> {},
    GetEmailUser: ()=>{}
})

//Componente Provider para fornecer os dados do contexto
export const universalCostumData = ({ children }: { children: ReactNode })=>{
    const [ModalViewMenu, setvisiblemenu]= useState<string>('-top-90')
    const [EmailUser, setEmail]= useState<string | null>('')
    const [wichUl, setwich]= useState<boolean | null>(false)

    const MoveModalMenu= (e: string)=>{
      setvisiblemenu(e)
    }

    const GetEmailUser= (e: string | null)=>{
      setEmail(e)
    }

    const Getwich= (e: boolean | null)=>{
      setwich(e)
    }


    return (
    <DataCostum.Provider value={{ ModalViewMenu, MoveModalMenu, EmailUser, GetEmailUser, wichUl, Getwich}}>
      {children}
    </DataCostum.Provider>
  );
}

export default DataCostum