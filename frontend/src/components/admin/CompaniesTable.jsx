import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Delete, Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) { return true };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    return (
        <div className='bg-blue-100 rounded-sm shadow-md max-sm:ml-2 max-sm:max-w-[96%]'>
            <Table className="">
                <TableCaption className="mb-5 text-lg ">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="max-sm:text-xl">
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar className="max-sm:size-18">
                                        <AvatarImage src={company.logo} className="max-sm:size-fit" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="max-sm:text-md">{company.name}</TableCell>
                                <TableCell className="max-sm:text-md">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 mx-3 py-2">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer hover:text-blue-600 '>
                                                <Edit2 className='w-4 max-sm:mr-2 max-sm:size-6' />
                                                <span className='max-sm:text-xl'>Edit</span>
                                            </div>
                                            <div className='flex items-center gap-2 w-fit cursor-pointer mt-2 hover:text-blue-600'>
                                                <Trash2 className='w-4 max-sm:mr-2 max-sm:size-6' />
                                                <span className='max-sm:text-lg'>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable