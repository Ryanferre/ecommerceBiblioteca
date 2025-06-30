import NavFromHeader from "./FromHeader/nav"
import NavFromHeaderMobile from "./FromHeader/navmobile"
import { Link } from "react-router-dom"

const Header= ()=>{
    return(
        <section className="w-full flex flex-row h-max py-3 lg:py-5 px-4 lg:px-20 gap-10 justify-between">
            <Link to="/"><h1 className="text-3xl font-bold">Bifly</h1></Link>
            <NavFromHeader />
            <NavFromHeaderMobile />
        </section>
    )
}

export default Header