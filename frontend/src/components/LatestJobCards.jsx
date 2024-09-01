import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

//LATEST JOB CARD
const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className='min-w-[30%] p-5 mx-6 rounded-md shadow-sm bg-blue-100 border border-gray-100 cursor-pointer max-sm:mr-5 max-sm:min-w-[90%]'>
            <div>
                <h1 className='font-medium text-lg max-sm:text-3xl max-sm:font-bold'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-700 max-sm:text-xl'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 max-sm:text-2xl max-sm:font-bold'>{job?.title}</h1>
                <p className='text-sm text-gray-700 max-sm:text-xl'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold max-sm:text-xl'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold max-sm:text-xl'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold max-sm:text-xl'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards