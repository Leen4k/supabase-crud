import React from 'react'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers"

const page = async () => {
    const supabase = createServerComponentClient({cookies});
    const {data:countries} = await supabase.from("countries").select();

  return (
    <div className="my-auto text-foreground">
        {countries?.map(country=>(
            <div key={country.id} className="flex gap-2">
               <span>{country.id}</span> <p>{country.name}</p>
            </div>
        ))}
    </div>
  )
}

export default page