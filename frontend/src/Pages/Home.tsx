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
        if(ver_res.status === 200){
            return true;
        }
        return false
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        const finalToken =token?.slice(7);
       const val = verifyToken(finalToken || "")
       val.then((x) => {
        if(x == false){
            setValidUser(false),
            setAllBlogs([])
        } else{
            const allBlogs = fetch(`${backend_url}/api/v1/blogs/allBlogs` , {
                method : 'GET',
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            allBlogs.then((y) => {
                y.json().then((finalData) => {
                    setAllBlogs(finalData)
                })
            })
        } 
       })
      

    } , [])
    const [validUser, setValidUser] = useState(false);
    const [allBlogs, setAllBlogs] = useState([]);
    return (
        <>
          {validUser === false ? (
            <div className='flex justify-center align-center'> 
                    <h4>User Not Logged In</h4>
            </div>
          ) : (
            <>
                <AppBar />
                {
                    allBlogs.map((blog) => (
                        <div className=''>
                            <h1>{blog?.name}</h1>
                        </div>
                    ))
                }
            </>
          )}
        </>
      );
    
}

export default Home;