import React, { useState } from 'react'
import axios from 'axios'

const Regoister = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/user/register', {
                name, email, password, phone, address
            });
            if (res.data.success) {
                alert(res.data.message)
            } else {
                alert(res.data.message)
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <section class=" my-5" >
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black" >
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <form class="mx-1 mx-md-4">

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Name</label>
                                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="form3Example1c" class="form-control" required />
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Email</label>
                                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example1c" class="form-control" required />
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example4c">Password</label>
                                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4c" class="form-control" required />
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Phone</label>
                                                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" id="form3Example1c" class="form-control" required />
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <div class="form-outline flex-fill mb-0">
                                                        <label class="form-label" for="form3Example1c">Address</label>
                                                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" id="form3Example1c" class="form-control" required />
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button onClick={handleSubmit} type="button" class="btn btn-primary btn-lg">Register</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Regoister
