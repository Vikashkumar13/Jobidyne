import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import Footer from '../shared/Footer'

//ADMIN-> REGISTER COMPANY
const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            //validation-data
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='py-20'>
                <div className='max-w-4xl mx-auto bg-blue-100  rounded-md py-5 px-5 max-sm:min-w-[96%] max-sm:mx-2'>

                    <div className='my-10'>
                        <h1 className='font-bold text-2xl my-2'>Your Company Name</h1>
                        <p className='text-gray-800 max-sm:text-xl'>What would you like to give your company name? you can change this later.</p>
                    </div>
                    <Input type="text" onChange={(e) => setCompanyName(e.target.value)} className="my-2 max-sm:text-xl max-sm:py-7" placeholder="Enter your company name"
                    />
                    <div className='flex items-center gap-5 my-10'>
                        <Button variant="outline" onClick={() => navigate("/admin/companies")} className="max-sm:text-xl max-sm:py-6">Cancel</Button>
                        <Button onClick={registerNewCompany} className="max-sm:text-xl max-sm:py-6">Continue</Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CompanyCreate