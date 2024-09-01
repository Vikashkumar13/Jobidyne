import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import Footer from '../shared/Footer'

//ADMIN-> CAN SEE THEIR REGISTER COMPANY
const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto py-20'>
                <div className='flex items-center justify-between my-5 max-sm:flex max-sm:flex-col-reverse max-sm:gap-8 max-sm:mt-20'>
                    <Input className="w-fit max-sm:text-2xl max-sm:min-w-[85%] max-sm:py-7" placeholder="Filter by name" onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")} className="text-blue-500 max-sm:text-xl max-sm:py-7">New Company</Button>
                </div>
                <CompaniesTable />
            </div>
            <Footer />
        </div>
    )
}

export default Companies