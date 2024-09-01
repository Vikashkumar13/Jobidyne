import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';
//BROWSE PAGE
const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => { dispatch(setSearchedQuery("")); }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto py-20'>
                {
                    user ? (
                        <>
                            <h1 className='font-bold text-xl my-10 mx-5'>Search Results ({allJobs.length})</h1>
                            <div className='grid grid-cols-3 gap-4 max-sm:grid-cols-1'>
                                {
                                    allJobs.map((job) => { return (<Job key={job._id} job={job} />) })
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='text-4xl text-gray-800 py-40 font-bold flex justify-center'>
                                <h1> Please signup / login first</h1>
                            </div>
                        </>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}

export default Browse