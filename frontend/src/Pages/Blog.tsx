import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import AppBar from "../Components/AppBar";
import App from "../App";
import backend_url from "../BE_URL/url";
const Blog = function () {



    const params = useParams()
    const userId = params.userId;
    const blogId = params.blogId;

    const id = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    async function deleteBlog() {
        const res = await fetch(`${backend_url}/api/v1/blogs/${id.blogId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `${token}`
            }
        })
        const jsonRes = await res.json();
        if (res.status == 200) {
            alert('Blog deleted successfully');
            navigate('/home')
        } else {
            alert('Error while deleting blog')
        }
    }

    async function saveUpdatedBlog() {
        const res = await fetch(`${backend_url}/api/v1/blogs/${id.blogId}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                content: content
            }),
            headers: {
                "Authorization": `${token}`
            }
        })
        const jsonRes = await res.json();
        if (res.status == 200) {
            alert('Blog updated successfully');
            navigate('/home')
        } else {
            alert('Error while fetching blog')
        }
    }

    useEffect(() => {
        async function BlogDetails() {
            const blog = await fetch(`http://localhost:8787/api/v1/blogs/${blogId}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `${token}`
                }
            })
            const jsonRes = await blog.json();
            setContent(jsonRes.blog[0].content)
            setTitle(jsonRes.blog[0].title)
            const isAdmin = await fetch(`${backend_url}/api/v1/verifyUser`, {
                method: 'POST',
                headers: {
                    "Authorization": `${token}`
                },
                body: JSON.stringify({
                    userId: userId
                })
            })
            const jsonIsAdminRes = await isAdmin.json();
            if (isAdmin.status == 200) {
                setisAdmin(true)
            }
        }
        BlogDetails()
    }, [])

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [admin, setisAdmin] = useState(false);
    const [editable, setEditable] = useState(true)
    return (
        title === '' ? (
            <>
                <AppBar />
            </>
        ) :
            (
                <>
                    <AppBar />
                    <div className="m-4" >
                        <div className="ml-[30vh] flex justify-center items-center m-2 min-w-full">
                            <textarea disabled={editable} value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 m-2 min-w-full min-h-[15vh] border-none outline-gray-5 00  text-5xl" placeholder="Title....." ></textarea>
                        </div>
                        <div className="flex justify-center items-center min-w-50">
                            <textarea onChange={(e) => setContent(e.target.value)} value={content} disabled={editable} className="p-2 min-w-full min-h-[60vh] border-none outline-gray-500 text-xl font-mono font-normal" autoComplete="true" placeholder="Write your story.."></textarea>
                        </div>
                        <div className="flex justify-evenly" >
                            {
                                admin === true ? (
                                    <>
                                        <button onClick={(e) => { setEditable(false); console.log(editable) }} className="bg-blue-600 p-2 m-2" >Edit</button>
                                        <button className="bg-orange-500 m-2 p-2" >Save as Draft</button>
                                        <button onClick={async () => { await saveUpdatedBlog() }} className="bg-green-500 m-2 p-2" >Publish</button>
                                        <button onClick={async () => { await deleteBlog() }} className="bg-red-500 m-2 p-2" >Delete</button>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </div>
                </>
            )
    )
}

export default Blog;
