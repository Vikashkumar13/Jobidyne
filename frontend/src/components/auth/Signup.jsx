import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { setLoading } from '@/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import Footer from '../shared/Footer'

//SIGNUP PAGE
const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);
    const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "", file: "" });
    //call during form filling
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    //file handling
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    //call when user click on submit button
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        //file validation
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    //if user exist then go to home page
    useEffect(() => {
        if (user) { navigate("/"); }
    }, [])
    return (
        <div>
            {/* NAVBAR */}
            <Navbar />
            {/* SIGNUP FORM */}
            <div className='flex items-center justify-center max-w-7xl mx-auto py-20 '>
                <form onSubmit={submitHandler} className='w-1/2 bg-gray-200 shadow-md border border-gray-200 rounded-md p-4 my-10 max-sm:min-w-[95%]'>
                    <h1 className='font-bold text-xl mb-5 max-sm:text-3xl'>Sign Up</h1>
                    <div className='my-3'>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler}
                            placeholder="Enter name" className="max-sm:py-7 max-sm:text-xl"
                        />
                    </div>
                    <div className='my-3'>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler}
                            placeholder="Enter email" className="max-sm:py-7 max-sm:text-xl"
                        />
                    </div>
                    <div className='my-3'>
                        <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler}
                            placeholder="Enter contact number" className="max-sm:py-7 max-sm:text-xl"
                        />
                    </div>
                    <div className='my-3'>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler}
                            placeholder="Enter passwor" className="max-sm:py-7 max-sm:text-xl"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='my-4'>
                            <Input accept="image/*" type="file" onChange={changeFileHandler} className=" cursor-pointer text-center max-sm:pb-10 max-sm:pt-5 max-sm:text-xl bg-gray-500"
                            />
                        </div>
                        <div>
                            <RadioGroup className="flex items-center gap-4 my-1">
                                <div className="flex items-center space-x-2 ">
                                    <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer max-sm:size-5 " />
                                    <Label htmlFor="r1 " className="max-sm:text-xl" >Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input type="radio" name="role" value="recruiter" className="cursor-pointer max-sm:size-5"
                                        checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                                    <Label htmlFor="r2" className="max-sm:text-xl">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 max-sm:text-xl max-sm:py-5">Signup</Button>
                    }
                    <span className='text-sm max-sm:text-xl'>Already have an account? <Link to="/login" className='text-blue-600  max-sm:text-xl'>Login</Link></span>
                </form>
            </div>
            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Signup