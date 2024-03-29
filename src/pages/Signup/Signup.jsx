import React, { useContext } from 'react';
import img from "../../assets/images/login/login.svg"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Signup = () => {

  const {createUser} = useContext(AuthContext);

    const handleSignup = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name,password,email)

        createUser(email,password)
        .then(result => {
            const user = result.user;
            console.log(user);
        })
        .catch(error => console.log(error))
      };
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
                <img src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold">Signup</h1>
                    <form onSubmit={handleSignup}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name='password' placeholder="password" className="input input-bordered" />
                            
                        </div>
                        <div className="form-control mt-6">
                           <input className="btn btn-primary" type="submit" value="Sign up" />
                        </div>
                    </form>
                    <p className='my-4 text-center'>Already have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Signup;