import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Building2Icon, ComputerIcon, HomeIcon, LogOut, SearchCheckIcon, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

//NAVIGATIONBAR
const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <>
            {/* DESKTOP NAVBAR */}
            <div className='px-5 max-sm:hidden fixed z-10 w-full'>
                <div className='flex items-center justify-between mx-auto h-16'>
                    <div>
                        <h1 className='text-2xl font-bold'>Jobi<span className='text-[#F83002]'>dyne</span></h1>
                    </div>
                    <div className='flex items-center gap-12'>
                        <ul className='flex font-medium items-center gap-5'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li className='hover:text-blue-800'><Link to="/admin/companies">Companies</Link></li>
                                        <li className='hover:text-blue-800'><Link to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li className='hover:text-blue-800'><Link to="/">Home</Link></li>
                                        <li className='hover:text-blue-800'><Link to="/jobs">Jobs</Link></li>
                                        <li className='hover:text-blue-800'><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=''>
                                            <div className='flex gap-2 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* MOBILE NAVBAR */}
            <div className="navbar  bg-blue-300 hidden max-sm:block fixed">
                <div className="navbar-start flex items-center justify-between gap-5">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content rounded-md z-[1] mt-2 w-52 p-2 shadow bg-gray-300">
                            <ul className='flex flex-col font-medium gap-2'>
                                {
                                    user && user.role === 'recruiter' ? (
                                        <>
                                            <li ><Link to="/admin/companies" className='text-xl'><Building2Icon className='max-sm:mr-2' /> Companies</Link></li>
                                            <li><Link to="/admin/jobs" className='text-xl'><ComputerIcon className='max-sm:mr-2' /> Jobs</Link></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link to="/" className='text-xl'><HomeIcon className='mr-3' />Home</Link></li>
                                            <li><Link to="/jobs" className='text-xl'><ComputerIcon className='mr-3' />Jobs</Link></li>
                                            <li><Link to="/browse" className='text-xl'><SearchCheckIcon className='mr-3' />Browse</Link></li>
                                        </>
                                    )
                                }
                            </ul>
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold'>Jobi<span className='text-[#F83002]'>dyne</span></h1>
                    </div>
                    <div className=''>
                        {
                            !user ? (
                                <div className='flex items-center gap-5'>
                                    <Link to="/login"><Button variant="outline" className="text-lg font-bold">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-lg">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer ml-20">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-90">
                                        <div className=''>
                                            <div className='flex gap-4 space-y-2'>
                                                <Avatar className="cursor-pointer ">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" className="border-black" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium text-2xl'>{user?.fullname}</h4>
                                                    <p className='text-muted-foreground text-xl'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link" className="text-xl font-bold"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link" className="text-xl font-bold">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default Navbar