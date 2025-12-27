import React from 'react'
import { CiBoxList } from 'react-icons/ci'
import { FaPlayCircle } from 'react-icons/fa'
import Image from 'next/image'
import TVshows from '@/components/Shows/TVshows'

const page = () => {



  return (
     <>
      {/* 🔥 HERO SECTION */}
      <div className="relative w-full h-[70vh] sm:h-[90vh] md:h-screen overflow-hidden">
        {/* IMAGE */}
       
         <div className="w-full h-full">
          <Image
            src={'/boys.jpg'}
            alt="Hulk"
            fill
            priority
            className="object-cover"
          />
         </div>

        {/* VIDEO */}
       <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <video
            src="/theboys.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
       </div>
         

        {/* OVERLAY */}
        <div className="absolute inset-0 flex items-center ">
          <div className="px-6 sm:px-10 md:px-20 max-w-2xl text-white">
            <Image
              src="/netflix.png"
              alt="Netflix"
              width={90}
              height={90}
              className="w-16 sm:w-20 mb-4"
            />

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              The Boys
            </h1>

            <p className="mt-3 font-bold">
              Unlimited movies, TV shows, and more.
            </p>

            <p className="mt-3 text-slate-300">
              The Boys is an American satirical superhero television series developed by Eric Kripke for Amazon Prime Video.
            </p>

            <div className="flex gap-4 mt-6">
              <button
                
                className="bg-white text-black flex items-center gap-2 px-6 py-2 rounded
                           hover:bg-[#e50914] hover:text-white transition"
              >
                Play <FaPlayCircle />
              </button>

              <button className="bg-slate-500 text-white flex items-center gap-2 px-6 py-2 rounded">
                My List <CiBoxList />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent " />
      </div>

      {/* 🔥 COLLECTION ROWS (NORMAL FLOW) */}
      <div className="relative bg-black/60 z-10">
       <TVshows name="TV Shows" />

      </div>
    </>
  )
}

export default page