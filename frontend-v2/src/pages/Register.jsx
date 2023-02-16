import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, registerUser } from "../redux/currentUserSlice";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [verifyPassword, setVerifyPassword] = useState('');

    const handleRegisterFormSubmit = async (e) => {
        e.preventDefault();

        if (password != verifyPassword) {
            alert('Password does not match');
            return;
        }

        await dispatch(registerUser({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }))
        .then(() => dispatch(getCurrentUser({
            email: email,
            password: password
        })))
        .then(() => navigate("/"));
    }
    
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-red-200">
            <h1 className="m-4 text-xl">Register</h1>
            <form onSubmit={handleRegisterFormSubmit} className="grid grid-cols-1 gap-4">
                <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-black"/>
                <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-black"/>
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-black"/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-black"/>
                <input type="password" placeholder="Re-enter Password" onChange={e => setVerifyPassword(e.target.value)} className="px-4 py-2 rounded-lg border-2 border-black"/>
                <input type="submit" className="px-4 py-2 rounded-lg border-2 border-black"/>
            </form>
        </div>
    )
}