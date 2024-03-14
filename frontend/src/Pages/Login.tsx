import InputBox from "./../Components/InputBox.tsx";
import Heading from "./../Components/Heading.tsx";
import Button from "./../Components/Button.tsx";
import { useState } from "react";
import QuotePage from "../Components/QuotePage.tsx";
import Loader from "../Components/Loader.tsx";
import { useNavigate } from "react-router-dom";

const Login = function () {
  const navigate = useNavigate();
  async function handleClick() {
    setLoading(true);
    const response = await fetch("http://localhost:8787/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status != 200) {
      alert('Wrong Credentials')
    }
    else {
      const jsonRes = await response.json();
      localStorage.setItem('token', `Bearer ${jsonRes.token}`)
      navigate('/home')
    }
    setLoading(false)
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-row bg-blue-950">
      <div className="w-1/2 min-h-screen flex flex-col justify-center items-center">
        <div className="">
          <Heading title={"Login"} />
          <InputBox
            value={email}
            spanText={"Email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type={"email"}
            placeholder={"Email"}
          />
          <InputBox
            value={password}
            spanText={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={"password"}
            placeholder={"Password"}
          />
          <Button loading={loading} bname={"Get Guest User Credentials"} onClick={(e) => {
            setEmail("guest@guest.com")
            setPassword("12345678")
            handleClick()
          }} />
          <Button
            loading={loading}
            bname={"Login"}
            onClick={() => {
              handleClick();
            }}
          />
          <>
            {loading === false ? (
              <></>
            ) : (
              <div className="flex justify-center content-center">
                <Loader />
              </div>
            )}
          </>
        </div>
      </div>
      <QuotePage quote={'"Unleash Your Voice, Inspire the World"'} />
    </div>
  );
};

export default Login;
