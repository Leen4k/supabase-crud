"use client"
import React, { useCallback, useEffect, useState } from 'react'
import supabase from '@/utils/supabaseClient'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

type Props ={
    params: any;
}


const page = ({params}:Props) => {
    const supabase = createClientComponentClient()
    const [title, setTitle] = useState<string | null>("");
    const [photo, setPhoto] = useState<string | null>("");
    const router = useRouter();

    useEffect(()=>{
        const getPost = async () => {
            try{
                let {data, error, status} = await supabase.from("posts").select("title,photo").eq("id",params.id).single()

                if (error && status !== 406){
                    throw error;
                }

                if(data){
                    setTitle(data.title);
                    setPhoto(data.photo);
                }
            }catch(err){
                console.log(err)
            }
        }
        getPost();
    },[])

    const handleSubmit = async () => {
        try{
            let {error} = await supabase.from("posts").upsert({
                id: params.id,
                title: title,
                photo: photo,
            })
            if (error) throw error;
            router.push("/");
        }catch(err:any){
            throw new err;
        }
    }

    const handleDelete = async () => {
        try{
            const {error} = await supabase.from("posts")
            .delete().eq("id",params.id);
            if(error) throw error;
            router.push("/");
        }catch(err){
            console.log(err)
        }   
    }
    
  return (
    <div>
        <p>Update post {params.id}</p>
        <a href="/" className="underline text-purple-600">Go to home</a>
        <form action="" className="flex flex-col gap-2">
            <input value={title || ""} onChange={e=>setTitle(e.target.value)} type="text" className="shadow-md" placeholder="title..." />
            <input value={photo || ""} onChange={e=>setPhoto(e.target.value)} type="text" className="shadow-md" placeholder="imageUrl..." />
            <div className="flex gap-2">
                <button onClick={(e)=>{e.preventDefault();handleSubmit()}} className="bg-green text-slate-100 px-4 bg-green-500">Update</button>
                <button onClick={(e)=>{e.preventDefault();handleDelete()}} className="bg-green text-slate-100 px-4 bg-red-500">Delete</button>
            </div>
        </form>
    </div>
  )
}

export default page