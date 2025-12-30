import React from "react";
import Link from "next/link";

type Props = {
  showMenu: boolean;
  onClose: () => void;
};

const ShowMenu = ({ showMenu, onClose }: Props) => {
  if (!showMenu) return null;

  return (
    <div
      className="
        absolute top-[7vh] right-4
        bg-[#181818]
        rounded-lg shadow-2xl
        z-[9999]
        block lg:hidden
      "
    >
      <div
        className="flex flex-col gap-4 p-5 text-white font-medium text-lg"
        onClick={onClose}
      >
        <Link href="/home">Home</Link>
        <Link href="/Show">TV Shows</Link>
        <Link href="/Movie">Movies</Link>
        <Link href="/MyList">My List</Link>
      </div>
    </div>
  );
};

export default ShowMenu;
