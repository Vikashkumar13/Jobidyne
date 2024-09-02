import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'

//LOGIN PAGE
const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "", });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //call while filling form
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    //call when user click on submit button
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
            toast.error(error.message)
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    //if user exist then take them on home page
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div>
            {/* NAVBAR */}
            <Navbar />
            {/* LOGIN FORM */}
            <div className='flex items-center justify-center max-w-7xl mx-auto py-20'>
                <form onSubmit={submitHandler} className='w-1/2 bg-gray-200 shadow-md border border-gray-200 rounded-md p-4 my-10 max-sm:min-w-[95%]'>
                    <h1 className='font-bold text-xl mb-5  max-sm:text-3xl'>Login</h1>
                    <div className='my-5'>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler}
                            placeholder="Enter registered email" className="max-sm:py-7 max-sm:text-xl"
                        />
                    </div>

                    <div className='my-5'>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler}
                            placeholder="Enter password" className="max-sm:py-7 max-sm:text-xl"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" checked={input.role === 'student'}
                                    onChange={changeEventHandler} className="cursor-pointer max-sm:size-5"
                                />
                                <Label htmlFor="r1" className="max-sm:text-xl">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer max-sm:size-5"
                                    checked={input.role === 'recruiter'} onChange={changeEventHandler}

                                />
                                <Label htmlFor="r2" className="max-sm:text-xl">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4  max-sm:text-xl max-sm:py-5">Login</Button>
                    }
                    <span className='text-sm max-sm:text-xl'>Don't have an account? <Link to="/signup" className='text-blue-600 max-sm:text-xl'>Signup</Link></span>
                </form>
            </div>
            {/* FOOTER */}
            <div className='max-sm:mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default Login