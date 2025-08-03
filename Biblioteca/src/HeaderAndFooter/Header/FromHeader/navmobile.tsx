import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react'
import DataCostum from '../../../Settings/Custum'
import { useContext } from 'react'
import LikinForUser from './searchLikin'


const NavFromHeaderMobile= ()=>{
  const {ModalViewMenu}= useContext(DataCostum)
    return(
        <nav className={`flex lg:hidden absolute bg-white ${ModalViewMenu} duration-500 z-10 flex-row w-95 lg:w-max py-3 px-2 gap-3 justify-between items-start lg:items-center shadow-2xl rounded-[.5em]`}>
            <ul className="flex flex-col lg:flex-row gap-3">
                <LikinForUser />
            </ul>
            <div className="w-max flex flex-row">
              <SignedIn>
                <UserButton/>
              </SignedIn>
              <SignedOut>
               <SignInButton>
                <button className="px-5 py-[.4em] font-bold text-[#bbbbbb] hover:text-[#00ccbe] rounded-3xl cursor-pointer">
                  Sing In
                </button>
               </SignInButton>
              </SignedOut>
              <SignedOut>
              <SignInButton>
                <button className="px-5 py-[.4em] font-bold text-[#bbbbbb] hover:text-[#00ccbe] rounded-3xl cursor-pointer">
                  Login
                </button>
              </SignInButton>
              </SignedOut>
            </div>
        </nav>
    )
}

export default NavFromHeaderMobile