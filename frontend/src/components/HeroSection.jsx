import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
//HERO SECTION
const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 py-20 '>
                <h1 className='text-4xl font-bold max-sm:text-3xl max-sm:mt-5'>Search Job and Apply<br /> <span className='text-[#6A38C2]'>Get Job</span></h1>
                <p className='max-sm:mx-3 max-sm:text-xl max-sm:font-semibold'>Welcome, Here you can search and apply many profiles job. Hurryup apply and get your dream job</p>
                <div className='flex w-[40%] bg-gray-200 shadow-md mt-4 rounded-md items-center mx-auto max-sm:w-[90%]'>
                    <input type="text" placeholder='Search Jobs...'
                        onChange={(e) => setQuery(e.target.value)} className='bg-gray-200 border-none rounded-tl-md rounded-bl-md w-full p-2 pl-3 max-sm:py-4 max-sm:text-2xl '
                    />
                    <Button onClick={searchJobHandler} className=" flex justify-center items-center rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none bg-gray-200">
                        <Search color='black' className='max-sm:h-10 max-sm:w-10' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection