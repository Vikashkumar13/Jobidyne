import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Carousel, CarouselContent, } from './ui/carousel';

//USER-> LETEST JOB
const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.job);
    return (
        <div className='max-w-7xl my-20'>
            <h1 className='text-4xl font-semibold mx-5 max-sm:text-2xl'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <Carousel className="w-full my-20 max-sm:mx-2 max-sm:my-8 max-sm:w-full max-sm:max-w-[100%]">
                <CarouselContent>
                    {
                        allJobs.length <= 0 ? <span className='ml-10 text-2xl'>Sorry No Job Available</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                    }
                </CarouselContent>
            </Carousel>
        </div>

    )
}

export default LatestJobs