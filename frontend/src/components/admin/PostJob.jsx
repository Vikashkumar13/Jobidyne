import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Footer from '../shared/Footer'

//ADMINT->POSTING A JOB
const PostJob = () => {
    const [input, setInput] = useState({
        title: "", description: "", requirements: "", salary: "", location: "",
        jobType: "", experience: "", position: null, companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='py-20'>
                <div className=' flex items-center justify-center w-screen my-5 '>
                    <form onSubmit={submitHandler} className='bg-blue-100 p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md max-sm:min-w-[96%] max-sm:my-10'>
                        <h1 className='text-2xl font-bold max-sm:text-2xl max-sm:font-bold max-sm:mb-5'>Post Job</h1>
                        <div className='grid grid-cols-2 gap-y-3 gap-x-8 max-sm:grid max-sm:grid-cols-1 max-sm:gap-6'>
                            <div>
                                <Input type="text" name="title" value={input.title} onChange={changeEventHandler}
                                    placeholder="Enter job title" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>
                                <Input type="text" name="description" value={input.description} onChange={changeEventHandler}
                                    placeholder="Enter job description" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>
                                <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler}
                                    placeholder="Enter job requirements" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>
                                <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler}
                                    placeholder="Enter job salary" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>
                                <Input type="text" name="location" value={input.location} onChange={changeEventHandler}
                                    placeholder="Enter job location" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>

                                <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler}
                                    placeholder="Enter job type" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>
                                <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler}
                                    placeholder="Enter experience year" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            <div>
                                <Input type="number" name="position" value={input.position} onChange={changeEventHandler}
                                    placeholder="Enter No of postion" className="max-sm:text-xl max-sm:py-7 max-sm:pl-4"
                                />
                            </div>
                            {
                                companies.length > 0 && (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className=" max-sm:py-6 max-sm:text-xl">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem value={company?.name?.toLowerCase()} className="max-sm:text-xl">{company.name}</SelectItem>
                                                        )
                                                    })
                                                }

                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }
                        </div>
                        {
                            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full text-blue-500 my-4 max-sm:text-xl max-sm:py-6 ">Post New Job</Button>
                        }
                        {
                            companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                        }
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PostJob