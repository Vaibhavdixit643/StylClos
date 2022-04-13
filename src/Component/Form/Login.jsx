import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from "../../Services/user.service";

function Login() {

    const errRef = useRef();
    const [ errMsg, setErrMsg ] = useState('');

    const nav = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname || "/";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('CUSTOMER');
    let [loading, setLoading] = useState(false);
    let [userState, setUserState] = useState(null); 

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(userState));
    }, [userState])

    const signin = (e) => {
        e.preventDefault();
        loading = setLoading(true);
        const user = { email, password, role };

        if (email) {
            userService.signin(user)
                .then(response => {
                    alert(response.data.role);
                    console.log("login successful", response.data);
                    loading = setLoading(false);
                    setUserState(response.data);
                    nav(from, { replace : true });
                })
                .catch(err => {
                    loading = setLoading(false);
                    console.log("Invalid email/password : " + err);
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    } else if (err.response?.status === 400) {
                        setErrMsg('Missing Username or Password');
                    } else if (err.response?.status === 401) {
                        setErrMsg('Unauthorized');
                    } else {
                        setErrMsg('Login Failed');
                    }
                    errRef.current.focus();
                });
        }
        else {
            loading = setLoading(false);
            alert("Invalid email/password");
        }
        return false;
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <p ref={errRef} className={ errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{errMsg}</p>
                                <h3 className="mb-5">Login</h3>
                                <form onSubmit={(e) => signin(e)}>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" autoFocus />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                                    </div>

                                    {/*Checkbox*/}
                                    {/* <div className="form-check d-flex justify-content-start mb-4">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="form1Example3"
                                        /> 
                                        <label className="form-check-label" htmlFor="form1Example3"> &emsp;Remember Me </label>
                                    </div>*/}

                                    <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>&emsp; Login &emsp;</span>
                                        </button>
                                </form>

                                <div>
                                    <br />
                                    <span >Don't have an account <a href="/signup">Register here</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
