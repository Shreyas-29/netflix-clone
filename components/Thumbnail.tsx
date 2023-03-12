import React from 'react'
import { Movie } from '../typings'
import Image from 'next/image'
import { modalState, movieState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil'

interface Props {
    movie: Movie
}

function Thumbnail({ movie }: Props) {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);


    return (
        <div
            onClick={() => {
                setCurrentMovie(movie)
                setShowModal(true)
            }}
            className='h- min-w-[180px] cursor-pointer transition duration-200 ease-out md:h- md:min-w-[260px] md:hover:scale-105'>
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                alt=''
                width={1000}
                height={1000}
                unoptimized
                className='w-full h-auto rounded-md object-cover'
            />
        </div>
    )
}

export default Thumbnail
