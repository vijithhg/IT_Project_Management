import { useEffect, useState } from "react";
import Authentication from "../services/Authentication";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
    const navigate = useNavigate()
  const [token, setToken] = useState();
  const [password, setPassword] = useState({
    newPassword:''
  });

  useEffect(() => {
    const urlParms = new URLSearchParams(location.search);
    const tokenParams = urlParms.get("token");
    setToken(tokenParams)
  }, []);

  
  const resetHandler = async () => {
    try {
      const resetResponse = await Authentication.resetPassword(token,password);
      if(resetResponse){
        toast.success(resetResponse.message)
        setPassword('')
        navigate('/')

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password.newPassword}
        onChange={(e) => setPassword({newPassword:e.target.value})}
      ></input>
      <button onClick={resetHandler}>Reset password</button>
    </>
  );
};

export default ResetPassword;
