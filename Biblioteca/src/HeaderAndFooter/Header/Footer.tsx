import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"
const Footer= ()=>{
    return(
        <section className="w-full h-50 flex flex-row justify-around mt-10 items-center bg-[#00ccbe]">
            <div>
                <p className="text-[1em] text-white font-semibold">&copy;: Bifly</p>
                <p className="text-[1em] text-white font-semibold">Privacy policy</p>
                <p className="text-[1em] text-white font-semibold">Cookies policy</p>
            </div>
            <div className="flex flex-col items-center gap-5">
                <h2 className="text-white"><Link to="/"><h1 className="text-3xl font-bold">Bifly</h1></Link></h2>
                    <ul className="flex flex-row w-35 border-t-1 pt-5 border-white lg:w-[169px] justify-between">
                        <li className="border border-white p-[.4em] lg:p-[8px] flex flex-col items-center justify-center rounded-[50px]" style={{boxShadow: '1px 2px 3px gray'}}>
                            <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://pt-br.facebook.com/login/device-based/regular/login/&ved=2ahUKEwj5i8impKCKAxULO7kGHdn7HkUQmuEJegQIEhAB&usg=AOvVaw2MezuOQmbz6LjDCjlRi0-K"><FaFacebook color="white" /></a>
                        </li>

                        <li className="border border-white p-[.4em] lg:p-[8px] flex flex-col items-center justify-center rounded-[50px]" style={{boxShadow: '1px 2px 3px gray'}}>
                            <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.prod.instagram.com/accounts/login/%3Fnext%3D%252Fglobalnews%252Ffeed%252F%26source%3Dprofile_feed_tab%26hl%3Dpt-br&ved=2ahUKEwiHxr6wpKCKAxWTEbkGHVhDCdAQjBB6BAgNEAE&usg=AOvVaw2c_PcfotKRmSY3c9GbY6Su"><FaInstagram color="white" /></a>
                        </li>

                        <li className="border border-white p-[.4em] lg:p-[8px] flex flex-col items-center justify-center rounded-[50px]" style={{boxShadow: '1px 2px 3px gray'}}>
                            <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://twitter.com/i/flow/login&ved=2ahUKEwi1466fpaCKAxXhErkGHVAAGYsQFnoECBAQAQ&usg=AOvVaw3eA22KztHKlK4M0EWkfpdG"><FaTwitter color="white" /></a>
                        </li>

                        <li className="border border-white p-[.4em] lg:p-[8px] flex flex-col items-center justify-center rounded-[50px]" style={{boxShadow: '1px 2px 3px gray'}}>
                            <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://br.linkedin.com/company/login&ved=2ahUKEwiMmZ2xo6CKAxUiG7kGHY3CMwYQmuEJegQIEhAB&usg=AOvVaw3nMEdONgcpgqgK2S1gXGj_"><FaLinkedin color="white" /></a>
                        </li>
                    </ul>
            </div>
            <div>
                <p className="text-[1em] text-white font-semibold"><Link to="/">Home</Link></p>
                <p className="text-[1em] text-white font-semibold">Contact</p>
                <p className="text-[1em] text-white font-semibold">About us</p>
            </div>
        </section>
    )
}

export default Footer