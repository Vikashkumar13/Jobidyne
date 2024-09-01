import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import Footer from '../shared/Footer'

//ADMIN->JOBS
const AdminJobs = () => {

  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='py-20'>
        <div className='max-w-6xl mx-auto my-10 '>
          <div className='flex items-center justify-between my-5 max-sm:flex max-sm:flex-col-reverse max-sm:gap-5'>
            <Input className="w-fit max-sm:min-w-[90%] max-sm:text-xl max-sm:py-7" placeholder="Filter by name, role" onChange={(e) => setInput(e.target.value)} />
            <Button onClick={() => navigate("/admin/jobs/create")} className="max-sm:min-w-[60%] max-sm:text-xl max-sm:py-6 text-blue-500">New Jobs</Button>
          </div>
          <AdminJobsTable />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminJobs