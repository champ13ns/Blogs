import Write from './../assets/Write.png'
import Blog from './../assets/Blog.png'
import Button from './Button'
import Profile from './../assets/Profile.png'
import { Link } from 'react-router-dom'
const AppBar = function ({ name }) {

    return (
        <div className="m-2 p-2 flex flex-row cursor-pointer bg-gray-50 hover:bg-gray-100 ">
            <div className='w-1/10 flex justify-center align-center'>
            <Link to={'/home'}>
                <img  width={60} src={Blog} ></img>
            </Link>
                
            </div>
            <div className='w-1/2 flex cursor-text justify-center items-center ml-[91px]'>
                <input  className ='flex pt-6 bg-gray-50 hover:bg-gray-100 border-none outline-none' placeholder='Search...' ></input>
                <Button  bname={"Search"} />
            </div>
            <div className='w-1/10 flex justify-center items-center flex-auto w-90'>
                <Link to='/createBlog'>
                <img className='' width={50} src={Write} />
                <div className='flex justify-center items-center '>Write </div>
                </Link>
            </div>
            <div className='flex flex-row place-content-end w-1/3' >
            <img className='' width={60} src={Profile} />
                
            </div>

        </div>
    )
}

export default AppBar