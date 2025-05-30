'use client';

import {useState} from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent)=>{
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();

        if (!res.ok){
            setError(data.error || 'Something went wrong');

        } else {
            router.push('/');
        }
    };
    return (
        <form onSubmit={handleRegister} className='space-y-4'>
            <h1 className='text-xl font-bold'>Register</h1>
            <input 
            type="text" 
            placeholder='Name'
            className='border p-2 w-full'
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
            />
             <input 
            type="email" 
            placeholder='Email'
            className='border p-2 w-full'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            />
            <input 
            type="password" 
            placeholder='Password'
            className='border p-2 w-full'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
            />
            {error && <p className='text-red-500'>{error}</p>}
            <button type = 'submit' className='bg-blue-500 text-white p-2 w-full'>Register</button>
        </form>
    )
}