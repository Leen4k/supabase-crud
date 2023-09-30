import React from 'react'
import supabase from '@/utils/supabaseClient'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers"
import Image from 'next/image';
import Link from 'next/link';

const page = async () => {
  const supabase = createServerComponentClient({cookies});
  const {data:posts} = await supabase.from("posts").select();
  console.log(posts)
  return (
    <div>
      <a href="/create" className="underline text-purple-600">Create a post</a>
      {posts?.map(post => (
        <Link href={`edit/${post.id}`} className="flex gap-2 shadow-lg p-2 hover:-translate-y-1 transition-all cursor-pointer">
          <p>{post.id}</p>
          <p>{post.title}</p>
          <Image className="w-[300px] h-[500px]" width={300} height={400} src={post.photo} alt={post.title+"img"}></Image>
        </Link>
      ))}
    </div>
  )
}

export default page