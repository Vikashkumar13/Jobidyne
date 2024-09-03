import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import Footer from '../shared/Footer'

//ADMIN-> COMPANY SETUP
const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({ name: "", description: "", website: "", location: "", file: null });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => { setInput({ ...input, [e.target.name]: e.target.value }) }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <div className='py-20'>
                <div className='max-w-xl bg-blue-100 rounded-md px-5 py-5 mt-10 mr-auto ml-auto max-sm:min-w-[96%] max-sm:my-10 max-sm:mx-2'>
                    <div className='mb-2 text-blue-600'>
                        <Link to={"/admin/companies"} className='flex gap-1' ><ArrowLeft />Back</Link>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className='my-5'>
                            <h1 className='font-bold text-xl max-sm:text-2xl'>Company Setup</h1>
                        </div>
                        <div className='grid grid-cols-2 gap-6 max-sm:grid max-sm:grid-cols-1 max-sm:gap-6'>
                            <div>
                                <Input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Enter company name" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4" />
                            </div>
                            <div>
                                <Input type="text" name="description" value={input.description} onChange={changeEventHandler} placeholder="Enter company description" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>
                                <Input type="text" name="website" value={input.website} onChange={changeEventHandler} placeholder="Enter company website url" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4" />
                            </div>
                            <div>
                                <Input type="text" name="location" value={input.location} onChange={changeEventHandler} placeholder="Enter company location" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4" />
                            </div>
                            <div>
                                {/* <Label>Logo</Label> */}
                                <Input type="file" accept="image/*" onChange={changeFileHandler} placeholder="Enter company logo" className="max-sm:text-xl max-sm:py-4 max-sm:pb-10 bg-gray-600" />
                            </div>
                        </div>
                        {
                            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-8 max-sm:text-xl max-sm:py-6">Update</Button>
                        }
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CompanySetup