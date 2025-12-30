"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { addToMyList } from "@/lib/myList";
import { TMDBItem } from "@/type/tmdb";

const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE;

const Details = ({
  tvshow,
  onClose,
}: {
  tvshow: TMDBItem;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!tvshow.poster_path) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center px-2 sm:px-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full sm:w-[90%] lg:w-[80%]
          max-h-[90vh]
          bg-[#181818]
          rounded-lg
          overflow-y-auto
          overflow-x-hidden

        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            text-2xl font-bold text-white
            hover:scale-110 transition
            z-10
          "
        >
          ✕
        </button>

        {/* CONTENT */}
        <div
          className="
            flex flex-col lg:flex-row
            gap-6
            p-4 sm:p-6
          "
        >
          {/* POSTER */}
          <div
            className="
              relative
              w-full sm:w-[260px] lg:w-[300px]
              h-[380px] sm:h-[420px] lg:h-[500px]
              mx-auto
              flex-shrink-0
            "
          >
            <Image
              src={`${IMAGE_BASE}${tvshow.poster_path}`}
              alt={tvshow.title || tvshow.name || "TV Show"}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1 text-white lg:mt-10">
            {/* TITLE */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {tvshow.title || tvshow.name || "TV Show"}
            </h2>

            {/* DATE */}
            <p className="text-sm text-gray-400 mb-4">
              {tvshow.release_date || tvshow.first_air_date || "Unknown date"}
            </p>

            {/* OVERVIEW */}
            <p className="text-sm sm:text-base leading-relaxed text-gray-200">
              {tvshow.overview}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                className="
                  bg-white text-black
                  px-6 py-2
                  rounded font-semibold
                  hover:bg-red-600 hover:text-white
                  transition
                "
              >
                ▶ Play
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToMyList(tvshow);
                  onClose();
                }}
                className="
                  bg-gray-700 text-white
                  px-6 py-2
                  rounded
                  hover:bg-gray-600
                  transition
                "
              >
                + My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
  