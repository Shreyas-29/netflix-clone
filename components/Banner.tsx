import React, { useEffect, useState } from 'react'
import { Movie } from '../typings'
import Image from 'next/image'
import { baseUrl } from '../constants/movie';
import { FaPlay } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { modalState, movieState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil'

interface Props {
    netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {

    const [movie, setMovie] = useState<Movie | null>(null);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);


    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals]);


    return (
        <section className='text-white flex items-center banner w-screen h-screen'>
            <div className='w-screen h-screen absolute top-0 left-0'>
                <div className='w-screen absolute h-20 top-[95vh] gradient z-10'></div>
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    alt='Banner'
                    width={1000}
                    height={1000}
                    unoptimized
                    draggable={false}
                    className='w-full h-full object-cover gradient'
                />
            </div>
            <div className='py-24 z-10 flex flex-col items-start space-y-2 md:space-y-4 h-screen justify-center lg:h-[75vh] lg:justify-end'>
                <h1 className='text-2xl md:text-4xl lg:text-7xl font-medium md:font-bold'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <p className='max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl'>
                    {movie?.overview.substr(0, 150)}...
                </p>
                <div className='flex items-center space-x-4'>
                    <button className='flex items-center space-x-2 px-4 py-2 text-sm font-semibold hover:opacity-75 md:px-8 md:py-2.5 md:text-base text-black bg-white rounded-md'>
                        <FaPlay className='h-4 w-4 text-black' />  <span>Play</span>
                    </button>

                    <button
                        onClick={() => {
                            setCurrentMovie(movie)
                            setShowModal(true)
                        }}
                        className='flex items-center space-x-2 px-4 py-2 text-sm font-semibold hover:opacity-75 md:px-8 md:py-2.5 md:text-base text-black bg-gray-500/90 rounded-md'>
                        <span>More Info</span>
                        <IoMdInformationCircleOutline className='h-5 w-5 text-black' />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Banner
