import { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { UserInput } from "../MainPages/UserInput";

type FormProps = {
  route: string;
  method: string;
};

function Form({ route, method }: FormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try{
      console.log(username, password)
      const res = await api.post(route, { username, password });
      if(method === "login"){
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        console.log("logged in")
        navigate("/")
      } else{
        navigate("/login")
      }
    }
    catch(error){
      alert(error);
    } finally{
      setLoading(false);
    }

  };

  return (
    <form className="px-[1.5rem] py-4 max-w-[500px] m-auto mt-[200px] flex flex-col items-center shadow-md border-1 border-solid border-grey" onSubmit={handleSubmit}>
      <h1>{name}</h1>
      <UserInput header="Username" value={username} setValue={setUsername} />
      <UserInput header="Password" value={password} setValue={setPassword} />
      {method === "login" ? 
            <button className="px-[1.5rem] py-2 text-black underline" type="button" onClick={() => navigate("/register")}>Sign Up</button> 
          : 
            <button className="px-[1.5rem] py-2 text-black underline" type="button" onClick={() => navigate("/login")}>Already have an account?</button>
        }
      <button className="px-[1.5rem] py-2 bg-black text-white rounded-[4000px] mt-4" type="submit">{name}</button>
      
    </form>
  );
}

export default Form;
