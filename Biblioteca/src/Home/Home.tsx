import BannerFromHome from "./FromHome/Banner"
import ListDestaque from "./FromHome/listDestaque"
import BannerFromHomeMobile from "./FromHome/BannerMobile"

// esse componente reune todos os componentes necessarios para a apresentacao da interface "home"
const HomePage= ()=>{
    return(
        <>
         <BannerFromHome />
         <BannerFromHomeMobile />
         <ListDestaque />
        </>
    )
}

export default HomePage