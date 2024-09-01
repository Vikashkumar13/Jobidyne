import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'

const isResume = true;
//USER PROFILE
const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className='py-20'>

                <div className='max-w-4xl mx-auto bg-blue-100 border border-gray-200 rounded-md my-5 p-8 max-sm:p-3 max-sm:max-w-[96%]'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24 max-sm:h-10 max-sm:w-10">
                                <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                                <p>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                    </div>
                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'><Mail /><span>{user?.email}</span></div>
                        <div className='flex items-center gap-3 my-2'> <Contact /><span>{user?.phoneNumber}</span></div>
                    </div>
                    <div className='my-5'>
                        <h1 className='font-bold'>Skills</h1>
                        <div className=' flex items-center flex-wrap gap-3 my-2'>
                            {
                                user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <h1 key={index} className='max-sm:flex'><span className='text-blue-600'>{item}</span> <span className='text-red-500 mx-2'>||</span></h1>) : <span>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-bold">Resume</Label>
                        {
                            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='max-w-4xl overflow-x-auto mx-auto bg-blue-100 rounded-md px-5 py-5 max-sm:max-w-[96%]'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    {/* Applied Job  */}
                    <AppliedJobTable />
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
            <Footer />
        </div>
    )
}

export default Profile