
"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const supabase = createClientComponentClient();
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        try{
            const {error} = await supabase.from("posts").insert({title,photo})
            if (error) throw error;
            router.push("/")
        }catch(err:any){
            console.log(err)
        }
    }
  return (
    <div>
    <p>Create a new Post</p>
    <a href="/" className="underline text-purple-600">Go back to home</a>
    <form action="" className="flex flex-col gap-2">
        <input value={title || ""} onChange={e=>setTitle(e.target.value)} type="text" className="shadow-md" placeholder="title..." />
        <input value={photo || ""} onChange={e=>setPhoto(e.target.value)} type="text" className="shadow-md" placeholder="imageUrl..." />
        <div className="flex gap-2">
            <button onClick={(e)=>{e.preventDefault();handleSubmit()}} className="bg-green text-slate-100 px-4 bg-green-500">Add Post</button>
        </div>
    </form>
</div>
  )
}

export default page