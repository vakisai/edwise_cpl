// "use client";
// import {useState} from 'react';
// import Image from 'next/image';
// import {XMarkIcon} from '@heroicons/react/24/outline';



// const ChatBot=()=>{

// 	const [isOpen,setIsOpen]=useState(false);

// 	return (
// 		<div className={`fixed right-2 bottom-2 h-fit  border-2 shadow-lg ${isOpen ? 'rounded-md bg-slate-200' : 'rounded-full bg-blue-200'}`}>
// 		{
// 			isOpen ? <XMarkIcon onClick={()=>setIsOpen(false)} className="h-5 w-5 ml-auto m-2 cursor-pointer text-rose-500" /> :null
// 		}
// 		{
// 			isOpen ? <iframe width="350" height="430" allow="microphone" src="https://console.dialogflow.com/api-client/demo/embedded/21d8058f-3128-48e3-a4ed-069f9839d1f5"></iframe>
// 			:<section onClick={()=>setIsOpen(true)} className="flex items-center px-5 py-2 justify-between rounded-full cursor-pointer">
// 				<Image src="/assets/chat.svg" height={32} width={32} alt="logo" />
// 				<p className="text-lg font-bold ml-5">Chat</p>
// 			</section>
// 		}		
// 		</div>
// 	)
// }

// export default ChatBot;

"use client";
import { useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-5 bottom-5">
      {isOpen ? (
        <div className="relative bg-white border border-gray-300 shadow-2xl rounded-lg p-2">
          <XMarkIcon
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 absolute top-2 right-2 cursor-pointer text-rose-500 hover:text-rose-700 transition duration-300"
          />
          <iframe
            width="350"
            height="450"
            allow="microphone"
            className="rounded-lg"
            src="https://console.dialogflow.com/api-client/demo/embedded/21d8058f-3128-48e3-a4ed-069f9839d1f5"
          ></iframe>
        </div>
      ) : (
        <section
          onClick={() => setIsOpen(true)}
          className="flex items-center px-5 py-3 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:shadow-xl animate-bounce"
        >
          <Image src="/assets/chat.svg" height={32} width={32} alt="Chatbot" />
          <p className="text-lg font-semibold ml-3">Chat</p>
        </section>
      )}
    </div>
  );
};

export default ChatBot;
