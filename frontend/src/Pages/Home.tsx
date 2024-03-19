/*

<AppBar /> -> App name, user icon, details
<Blogs />, show all the blogs present in DB.

Single blog
Title, 
content, 
Edit option, 
Finish Editing Button, 
Delete Button
*/
import {useEffect , useState } from 'react'
import backend_url from '../BE_URL/url'
import AppBar from '../Components/AppBar';
import { Link } from 'react-router-dom';
import User from './../assets/user.png'
import Shimmer from '../Components/Shimmer';

const Home = function(){
    async function verifyToken(token:string){
        const res = await fetch(`${backend_url}/api/v1/verifyUser`,{
            method: 'POST',
            body : JSON.stringify({
                token
            }),
            headers:{
                'content-type':"application/json"
            }
        })
        const ver_res = await res.json()
        if(res.status === 200){
            return true;
        } else
        return false
    }
    useEffect(() => {
        async function allBlogsApi(){
        const token = localStorage.getItem('token')
        const allBlogsRes = await fetch(`${backend_url}/api/v1/blogs/allBlogs`,{    
            method : 'GET',  
            headers:{
                'Authorization' : token || ""
            }
        })
        if(allBlogsRes.status == 200) setValidUser(true)
        const jsonAllBlogs = await allBlogsRes.json();
        setAllBlogs(jsonAllBlogs.allBlogs)
        }   
        allBlogsApi()
    } , [])
    const [validUser, setValidUser] = useState(false);
    const [allBlogs, setAllBlogs] = useState([]);
    return (
        <>
          {validUser === false ? (
            <Shimmer />
          ) : (
            <>
                <AppBar />
                {
                    allBlogs.map((blog) => (
                        <div  key={blog.id || Math.random()} className='mt-5 w-100'>
                            <div className='flex justify-center items-center'>
                            <div className='flex flex-row place-content-center border-t-4 border-stone-200 mb-10 w-1/2' ></div>
                            </div>
                            <div className='flex justify-center items-center w-1/2  space-x-4' >
                                <img src={User} width={50}  />
                               <h2 className='font-medium' >{blog.name}</h2> 
                               <h2 className='font-medium' >{blog.Date.substring(0,10)}</h2> 
                            </div>
                        <Link to={`/blog/${blog.authorId}/${blog.id}`} >
                            <div className='flex  justify-center items-center font-extrabold text-3xl' >{blog?.title}</div>
                            <div className='mt-4 flex justify-center items-center text-xl text-center' >{blog?.content?.substring(0,50)}....... 
                                <h6 className='text-slate-400' >Read More</h6>
                             </div>
                        </Link>
                        </div>
                    ))
                }
            </>
          )}
        </>
      );
    
}

export default Home;