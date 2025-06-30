import UlAnuciante from "./ULClientOurAniciante/UlCliente"
import UlCliente from "./ULClientOurAniciante/UlAnunciante"
import DataCostum from "../../Settings/Custum"
import { useContext } from "react"

//esse componente apresenta os produtos avenda ou produtos anunciado pelo cliente com base em um condicao
//se o usuario estiver logado e apresentado uma opcao no header para alternar de cliente para anunciante.
//quando ele alterna e escolhe "anunciante" uma chave no contexto guarda um valor booleano que indica
//a alternancia entre os dois componentes. O componente UlCliente e o mesmo apresentado aos visitantes
//por isso a chave leva um valor de false logo de inicio(no contexto) para indicar que tanto para usuarios ou visitantes
//o componente sera apresentado
const ListDestaque= ()=>{
    const {wichUl}= useContext(DataCostum)//pega a chave com o valor no contexto
    const RenderComponentAbol= ()=>{

        //verifica a chave e false ou true
        if(wichUl != true){// se for false apresenta o componente de visitante ou cliente
            return <UlCliente />
        }else{// se for true apresente o componente com os produtos anunciado
           return <UlAnuciante />
        }
    }
    return(
        <>
         {RenderComponentAbol()}
        </>
    )
}

export default ListDestaque