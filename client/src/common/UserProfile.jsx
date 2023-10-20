import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
        window.scrollTo(0, 0)
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/user/profileUpdate`, {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
                navigate('/')
            }
        } catch (error) {
        }
    };
    return (
        <div className='container marginStyle'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 my-3'>
                        <h3 className='text-center'>Update Profile</h3>
                        <div className="card text-black mb-5" >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <form className="mx-1 mx-md-4">
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" for="form3Example1c">Name</label>
                                                <input value={name} onChange={(e) => setName(e.target.value)} type="email" id="form3Example1c" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" for="form3Example1c">Email</label>
                                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example1c" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" for="form3Example4c">Password</label>
                                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4c" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" for="form3Example1c">Phone</label>
                                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="email" id="form3Example1c" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label" for="form3Example1c">Address</label>
                                                <textarea rows={4} value={address} onChange={(e) => setAddress(e.target.value)} type="email" id="form3Example1c" className="form-control" required />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mx-4">
                                            <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
