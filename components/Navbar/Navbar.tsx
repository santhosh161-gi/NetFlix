"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiAlignCenter } from "react-icons/fi";
import Link from "next/link";
import ShowMenu from "./ShowMenu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="fixed z-[10000] w-full px-6 lg:px-10 h-[7vh] flex items-center justify-between bg-black/60">
        {/* LEFT */}
        <div className="flex gap-8 lg:gap-20 items-center text-white">
          <Image src="/netflix.png" alt="logo" width={100} height={40} />

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-10 text-sm font-bold">
            <Link href="/home" className="hover:text-[#e50914]">
              Home
            </Link>
            <Link href="/Show" className="hover:text-[#e50914]">
              Shows
            </Link>
            <Link href="/Movie" className="hover:text-[#e50914]">
              Movies
            </Link>
            <Link href="/MyList" className="hover:text-[#e50914]">
              My List
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5 text-white">
          <FaSearch className="hover:text-[#e50914]" />
          <IoMdNotificationsOutline
            className="hover:text-[#e50914]"
            size={20}
          />

          {/* TOGGLE (SM / MD ONLY) */}
          <FiAlignCenter
            size={22}
            className="hover:text-[#e50914] cursor-pointer lg:hidden"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>

      {/* MOBILE MENU */}
      <ShowMenu
        showMenu={showMenu}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
};

export default Navbar;

