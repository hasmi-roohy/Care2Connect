import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from "../context/AdminContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password });
                if (data.success) {
                    localStorage.setItem('atoken',data.token);
                    setAToken(data.token); // Store token in context
                } else {
                  toast
                }
            } else {
                // Handle Doctor login here
             toast.error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-black text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-amber-500">{state}</span>
                </p>
                <div className="w-full">
                    <p>Email:</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-b rounded w-full p-2 mt-1"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password:</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-b rounded w-full p-2 mt-1"
                        type="password"
                        required
                    />
                </div>
                <button className="bg-amber-400 text-black w-full py-2 rounded-md text-base">Login</button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login? <span className="text-amber-400 underline cursor-pointer" onClick={() => setState('Doctor')}>Click me</span></p>
                        : <p>Admin Login? <span className="text-amber-400 underline cursor-pointer" onClick={() => setState('Admin')}>Click me</span></p>
                }
            </div>
        </form>
    );
};

export default Login;
