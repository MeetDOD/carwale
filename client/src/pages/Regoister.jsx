import React, { useState } from 'react'
import axios from 'axios'
import './register.css'

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
            <div class="register-photo">
                <br />
                <br />
                <br />
                <div class="form-container">
                    <div class="image-holder"></div>
                    <form method="post">
                        <h2 class="text-center"><strong>Create</strong> an account.</h2>

                        <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Sign Up</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Regoister
