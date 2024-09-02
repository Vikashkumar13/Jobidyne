import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';

//ALL JOBS WILL SHOW HERE
const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        }
        else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto py-20'>
                {
                    user ? (
                        <>
                            <div className='flex gap-5 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
                                <div className='w-20% max-sm:min-w-[95%] max-sm:my-5'>
                                    <FilterCard />
                                </div>
                                {
                                    filterJobs.length <= 0 ? <span className='text-3xl mx-10 max-sm:text-2xl mb-5'>Job not found</span> : (
                                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5 no-scrollbar'>
                                            <div className='grid grid-cols-3 gap-1 max-sm:flex max-sm:flex-col'>
                                                {
                                                    filterJobs.map((job) => (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 100 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -100 }}
                                                            transition={{ duration: 0.3 }}
                                                            key={job?._id}>
                                                            <Job job={job} />
                                                        </motion.div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
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

export default Jobs