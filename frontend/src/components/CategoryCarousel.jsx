import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Data Science",
    "Database Admin",
    "Graphic Designer",
]
//BUTTON CAROUSEL COMPONENT
const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //call when click on any carousel button
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-5 max-sm:px-2 max-sm:w-full max-sm:max-w-[70%]">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/3 lg:basis-1/3 max-sm:basis-1/1 max-sm:mx-1">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-md max-sm:py-8 max-sm:text-xl">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel