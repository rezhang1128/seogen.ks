"use client";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event:any) => {
        event.preventDefault();
        
        // Handle form submission logic here (e.g., authentication)
    };
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="flex justify-center items-center text-center">
        <svg>logo</svg>
        <div className="text-5xl">SEO GEN</div>
      </div>
      <div className="text-2xl flex justify-center items-center text-center">
        <svg className="bg-black" height="1" width="250"></svg>
        <div className="p-2">Log In</div>
        <svg className="bg-black" height="1" width="250"></svg>
      </div>
      <form onSubmit={handleSubmit} className="border-1 border-black rounded-2xl h-unit-7xl w-unit-9xl flex flex-col items-center text-center">
        
        <div className="flex flex-col space-y-4 mt-6">
            <Input onChange={(e) => setUsername(e.target.value)} className="mt-2 w-unit-8xl" type="text" label="Username" placeholder="Enter your username" isRequired/>
            <Input onChange={(e) => setPassword(e.target.value)} className=" w-unit-8xl" type="text" label="Password" placeholder="Enter your password" isRequired/>
        </div>
        <div className="mt-16">
           <Button className=" w-unit-8xl" type="submit" color="primary">Sign In</Button> 
        </div>
    
      </form>
    </div>
  );
}
