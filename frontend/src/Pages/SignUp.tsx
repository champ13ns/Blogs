import InputBox from './../Components/InputBox.tsx'
import Heading from './../Components/Heading.tsx'
import Button from './../Components/Button.tsx'
import { useState } from 'react'
import QuotePage from '../Components/QuotePage.tsx'
import Loader from '../Components/Loader.tsx'
import backend_url from '../BE_URL/url.tsx'


const Login = function(){

    async function handleSignUp(){
        setLoader(true)
        const resposne = await fetch(`${backend_url}/api/v1/user/signup`,{
            method : 'POST',
            body:JSON.stringify({
                email,
                password,
                name
            }),
            headers: {
                "Content-Type": "application/json",
              },
        });     
        if(resposne.status != 200){
            alert('Wrong Credentials');  
        } 
         else{
        const json_res = await resposne.json();
            alert('Sign Up Successful')
            localStorage.setItem('token',`Bearer ${json_res.token}`)
        }
        setLoader(false)
    }   
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name ,setName] = useState('')
    const [loader , setLoader] = useState(false)

    return(<div className="flex flex-row bg-blue-950">
            
            <div className="w-1/2 min-h-screen flex flex-col justify-center items-center">
                <div className="">   
                    <Heading title={"SignUp"} />
                    <InputBox value={email}  spanText={"Email"} onChange={(e)=>{setEmail(e.target.value)}} type={"email"} placeholder={"Email"}/>
                    <InputBox value={name}  spanText={"Name"} onChange={(e)=>{setName(e.target.value)}} type={"text"} placeholder={"Name"}/>
                    <InputBox value={password} spanText={"Password"} onChange={(e)=>{setPassword(e.target.value)}} type={"password"} placeholder={"Password"}/>
                    <Button loading={loader} bname={"SignUp"} onClick = {()=>{handleSignUp()}} />
                    {
                        loader === true ? 
                            (
                                <Loader />
                            )
                         : 
                            (
                                <></>
                            )
                    }
                </div>
            </div>
            <QuotePage quote={'"Dive into Diversity: Your Stories, Our Platform."'} />
    </div>)
}

export default Login;