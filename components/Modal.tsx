import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal';
import { modalState, movieState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil'
import { HiOutlineVolumeOff, HiVolumeUp, HiX } from 'react-icons/hi';
import { Element, Genre } from '../typings';
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineThumbUpOffAlt, MdThumbUp } from 'react-icons/md'

function Modal() {

    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState("");
    const [genre, setGenre] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        if (!movie) return

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then((response) => response.json())

            if (data?.videos) {
                const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
                setTrailer(data.videos?.results[index]?.key)
            }

            if (data?.genre) {
                setGenre(data.genre);
            }

        }
        fetchMovie()
    }, [movie])

    const handleClose = () => {
        setShowModal(false);
    }


    return (
        <MuiModal open={showModal} onClose={handleClose} className='fixed flex flex-col !top-8 left-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'>
            <>
                <button
                    onClick={handleClose}
                    className='absolute right-5 top-5 !z-40 p-1.5 rounded-full hover:bg-slate-900/100 border-none bg-slate-800 border'>
                    <HiX className='w-6 h-6 text-white' />
                </button>
                <div className='relative pt-[56.25%]'>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                    <div className='absolute bottom-10 flex w-full items-center justify-between px-4 sm:px-10'>
                        <div className='flex space-x-4 items-center'>
                            <button className='flex items-center space-x-2 px-3 py-2 text-xs md:text-sm font-semibold hover:opacity-75 md:px-5 md:py-2 text-black bg-white rounded-md'>
                                <FaPlay className='h-3 md:h-4 w-3 md:w-4 text-black' />  <span>Play</span>
                            </button>

                            <button className='border-white border-2 p-1 rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center'>
                                <FiPlus className='h-4 md:h-6 w-4 md:w-6 text-white m-auto' />
                            </button>

                            <button className='border-white border-2 p-1 rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center'>
                                <MdOutlineThumbUpOffAlt className='h-4 md:h-6 w-4 md:w-6 text-white m-auto' />
                            </button>
                        </div>
                        <button
                            className='border-white border-2 p-1 rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center'
                            onClick={() => setMuted(!muted)}>
                            {muted ? (
                                <HiOutlineVolumeOff className='h-4 md:h-6 w-4 md:w-6 text-white m-auto' />
                            ) : (
                                <HiVolumeUp className='h-4 md:h-6 w-4 md:w-6 text-white m-auto' />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-4 sm:px-10 py-8 text-white">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-400">
                                {movie!.vote_average * 10}% Match
                            </p>
                            <p className="font-light">
                                {movie?.release_date || movie?.first_air_date}
                            </p>
                            <div className="flex items-center justify-center rounded-md border border-white/40 px-1.5 py-0.5 bg-white text-black font-medium text-xs">
                                HD
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="sm:w-5/6 text-sm">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">Genres:</span>{' '}
                                    {genre.map((genre) => genre.name)} Action
                                </div>

                                <div>
                                    <span className="text-[gray]">Original language:</span>{' '}
                                    {movie?.original_language}
                                </div>

                                <div>
                                    <span className="text-[gray]">Total votes:</span>{' '}
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal
