import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
    email: string,
    password: string,
}

function Login() {

    const [login, setLogin] = useState(false);
    const { signIn, signUp } = useAuth();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        if (login) {
            await signIn(email, password); 
        }
        else {
            await signUp(email, password);
        }
    }


    return (
        <section className='z-50 flex items-center justify-center h-screen px-4 py-4 transition lg:px-10'>
            <Head>
                <title>Login - Netflix</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Image
                src="https://rb.gy/p2hphi"
                alt=''
                layout="fill"
                unoptimized
                className="!hidden opacity-60 sm:!inline"
                objectFit="cover"
            />
            {/* <div className='z-10'>
                <Image src={'/netflix.svg'} alt='Logo' width={100} height={100} className='' />
            </div> */}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='relative flex items-center justify-center text-white'
            >
                <div className='rounded-lg sm:bg-black/60 py-10 px-6 md:px-14'>
                    <h1 className='text-white font-semibold text-lg md:text-3xl'>Sign In</h1>
                    <div className='space-y-3 flex flex-col mt-6'>
                        <label htmlFor="email">
                            <input
                                type="email"
                                placeholder='Email'
                                {...register('email', { required: true })}
                                className='w-full rounded bg-[#333] px-5 py-3 placeholder:text-gray-500 outline-none'
                            />
                            {errors.email && (
                                <p className='text-xs p-1 font- text-red-600'>Please enter valid email</p>
                            )}
                        </label>
                        <label htmlFor="password">
                            <input
                                type="password"
                                placeholder='Password'
                                {...register('password', { required: true })}
                                className='w-full rounded bg-[#333] px-5 py-3 placeholder:text-gray-500 outline-none'
                            />
                            {errors.password && (
                                <p className='text-xs p-1 font- text-red-600'>Your password must contain 8 characters</p>
                            )}
                        </label>
                    </div>
                    <button
                        onClick={() => setLogin(true)}
                        className='py-3 bg-red-500 hover:bg-red-600 font-medium text-white rounded w-full mt-4 text-sm'
                    >
                        Sign In
                    </button>

                    <div className='text-sm mt-4 text-gray-300'>
                        New to Netflix? {" "}
                        <button
                            onClick={() => setLogin(false)}
                            type='submit' className='text-white hover:underline'
                        >
                            Sign up now
                        </button>
                    </div>

                </div>
            </form>

        </section>
    )
}

export default Login
