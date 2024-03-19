import AppBar from "./AppBar";
import { useState } from 'react'
import backend_url from "../BE_URL/url";
import { useNavigate, useParams } from "react-router-dom";
import App from "../App";
import Loader from "./Loader";

const CreateBlog = function () {

    const navigate = useNavigate();
    const params = useParams();
    const userId = params.id;

    const token = localStorage.getItem('token');


    async function saveBlog() {
        setLoading(true)
        setDisabled(true)
        const res = await fetch(`${backend_url}/api/v1/blogs/createBlog`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
                authorId: userId
            }),
            headers: {
                "Authorization": `${token}`
            }
        })
        const jsonRes = await res.json();
        if (res.status == 200) {
            alert('Blog created successfully');
            navigate('/home')
        } else {
            alert('Error while creating blog')
        }
        setLoading(false)
        setDisabled(false)
    }


    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('');
    const [disabled ,setDisabled] = useState(false);
    console.log("title is ", title)

    return (
        <>
            <AppBar />
            <div className="m-4" >
                <div className="flex justify-center items-center m-2 min-w-full">
                    <textarea value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 m-2 min-w-full min-h-[15vh] border-none outline-gray-5 00  text-5xl" placeholder="Title....." ></textarea>
                </div>
                <div className="flex justify-center items-center min-w-50">
                    <textarea onChange={(e) => setContent(e.target.value)} value={content} className="p-2 min-w-full min-h-[60vh] border-none outline-gray-500 text-xl font-mono font-normal" autoComplete="true" placeholder="Write your story.."></textarea>
                </div>
                <div className="flex justify-center items-center" >
                    <button disabled={disabled} onClick={async () => { await saveBlog() }} className="bg-green-500 m-2 p-2" >Publish</button>


                </div>
                <div className="flex justify-center items-center">
                {
                    loading === true && <Loader />
                }
                </div>
            </div>
        </>
    )
}

export default CreateBlog;