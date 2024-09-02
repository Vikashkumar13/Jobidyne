import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

//JOB DESCRIPTION PAGE
const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    //call when user will click on apply button
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            //validation-data
            if (res.data.success) {
                setIsApplied(true); // Updating local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    //useEffect for fetching single job
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <Navbar />
            <div className="py-20">
                {
                    user ? (<>
                        <div className='py-10'>
                            <div className='max-w-4xl bg-blue-200 shadow-xl rounded-md px-5 py-5 mx-auto max-sm:max-w-[95%]'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <div className='flex flex-row items-center'>
                                            <div>
                                                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                                            </div>
                                            <div className='ml-10 max-sm:ml-10 '>
                                                <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied}
                                                    className={`rounded-md ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                                                    {isApplied ? 'Applied' : 'Apply Now'}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2 mt-4'>
                                            <Badge className={'text-blue-700 font-bold max-sm:text-lg'} variant="ghost">{singleJob?.position} Positions</Badge>
                                            <Badge className={'text-[#F83002] font-bold max-sm:text-lg'} variant="ghost">{singleJob?.jobType}</Badge>
                                            <Badge className={'text-[#7209b7] font-bold max-sm:text-lg'} variant="ghost">{singleJob?.salary}LPA</Badge>
                                        </div>
                                    </div>
                                </div>
                                <h1 className='border-b-2 border-b-gray-800 font-medium py-4 max-sm:text-xl'>Job Description</h1>
                                <div className='my-4 max-sm:text-lg max-sm:font-bold'>
                                    <h1 className='font-bold my-1'>Role : <span className='pl-1 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                                    <h1 className='font-bold my-1'>Location : <span className='pl-1 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                                    <h1 className='font-bold my-1'>Description : <span className='pl-1 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                                    <h1 className='font-bold my-1'>Experience : <span className='pl-1 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                                    <h1 className='font-bold my-1'>Salary : <span className='pl-1 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                                    <h1 className='font-bold my-1'>Total Applicants : <span className='pl-1 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                                    <h1 className='font-bold my-1'>Posted Date : <span className='pl-1 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                                </div>
                            </div>
                        </div>
                    </>) : (
                        <>
                            <div className='text-4xl text-gray-800 py-40 font-bold flex justify-center'>
                                <h1> Please signup / login first</h1>
                            </div>
                        </>
                    )
                }

            </div>

            <Footer />
        </>

    )
}

export default JobDescription