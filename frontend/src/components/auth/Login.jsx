import{ useState } from "react";
import Authentication from "../services/Authentication";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate()
     const[formData, setFormData] = useState({
        email:'',
        password : ''
     })

    const submitHandler = async(e) => {
        e.preventDefault()
        try{
            const loginResponse = await Authentication.login(formData)
            if(loginResponse.success){
                toast.success(loginResponse.message,{autoClose:2000})
                localStorage.setItem('authToken',loginResponse.token)
                navigate(loginResponse.redirectTo)
            }else{
                toast.error(loginResponse.message)
            }
          
        }catch(error){
            console.log(error)

        }
    }

    return (
        <>
            <section className="vh-100 ">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-5">
                            <img src="./public/login-banner.jpg" className="img-fluid"/>
                        </div>
                        <div className="col-7">
                            <form onSubmit={submitHandler}>
                                <fieldset>
                                    <legend className="text-center">Login Form</legend>
                                    <div className="mb-3">
                                        <label htmlFor="email" className=" form-label">Email:</label>
                                        <input type="email" id="email" className="form-control" onChange={e=>setFormData({...formData,email:e.target.value})} value={formData.email} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label ">Password:</label>
                                        <input type="password" className="form-control" id="password" onChange={e=>setFormData({...formData,password:e.target.value})} value={formData.password}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login