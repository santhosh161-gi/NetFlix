"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import Collectio from "@/components/Dashboard/Gems";

const Home = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
      {/* 🔥 HERO SECTION */}
      <div className="relative w-full h-[70vh] sm:h-[90vh] md:h-screen overflow-hidden">
        {/* IMAGE */}
        {!playVideo && (
          <Image
            src="/avengers.jpg"
            alt="Hulk"
            fill
            priority
            className="object-cover"
          />
        )}

        {/* VIDEO */}
        {playVideo && (
          <video
            src="/hulkclip.mp4.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-[70vh] sm:h-[90vh] md:h-screen object-cover"
          />
        )}

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
              Avengers: Age of Ultron
            </h1>

            <p className="mt-3 font-bold">
              Unlimited movies, TV shows, and more.
            </p>

            <p className="mt-3 text-slate-200">
              Avengers: Age of Ultron is a 2015 American superhero film based on the
              Marvel Comics character Iron Man.
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setPlayVideo(true)}
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
      <div className="relative bg-black/60 z-10 pt-12 pb-24 md:pb-32 sm:pb-40 ">
        <Collectio name="Gems for you" />
        <Collectio name="Trending Now" />
        <Collectio name="Top Rated" />
      </div>
    </>
  );
};

export default Home;

