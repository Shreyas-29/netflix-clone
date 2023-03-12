import React, { useRef, useState, useEffect } from 'react'
import { Movie } from '../typings'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import Thumbnail from './Thumbnail'


interface Props {
    title: string,
    movies: Movie[]
}

function Rows({ title, movies }: Props) {

    const rowRef = useRef<HTMLDivElement>(null);
    const [isMove, setIsMove] = useState(false);

    const handleClick = (direction: string) => {
        setIsMove(true)
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current

            const scrollTo =
                direction === 'left'
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }


    return (
        <section>
            <div className='space-y-1 relative group md:space-y- text-white flex flex-col'>
                <h2 className='w-56 cursor-pointer text-sm font-semibold transition duration-200 text-slate-200 hover:text-white md:text-lg lg:text-2xl'>
                    {title}
                </h2>
                <div className='group relative md:-ml-1'>
                    {/* <HiChevronLeft className={`absolute top-1/3 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 group-hover:opacity-100 transition hover:scale-125 ${!isMove && 'hidden'}`} onClick={() => handleClick('left')} />

                    <div ref={rowRef} className='flex items-center space-x-1.5 overflow-scroll scrollbar-hide md:space-x-4 md:p-2'>
                        {movies?.map((movie) => (
                            <Thumbnail key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <HiChevronRight className={`absolute top-1/3 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 group-hover:opacity-100 transition hover:scale-125`} onClick={() => handleClick('right')} /> */}
                    <HiChevronLeft
                        className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMove && 'hidden'
                            }`}
                        onClick={() => handleClick('left')}
                    />
                    <div
                        ref={rowRef}
                        className="flex items-center space-x-1 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
                    >
                        {movies.map((movie) => (
                            <Thumbnail key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <HiChevronRight
                        className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                        onClick={() => handleClick('right')}
                    />
                </div>
            </div>
        </section>
    )
}

export default Rows
