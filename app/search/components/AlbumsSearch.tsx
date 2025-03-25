import { AlbumType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface AlbumProps {
  albums: AlbumType[];
}

export default function AlbumsSearch({ albums }: AlbumProps) {
  if (albums.length === 0) {
    return null;
  }
  return (
    <section className="mt-20 px-3 md:px-6">
      <p className="text-3xl md:text-5xl text-black dark:text-white font-semibold mb-8">
        Albums
      </p>
      <div className=" grid gap-x-6  grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-y-8 ">
        {albums.map((album) => (
          <Link href={`/album/${album.id}`} key={album.id}>
            <div className=" flex flex-col  justify-center items-center  gap-y-4 bg-purple-200 dark:bg-slate-700 rounded-md h-64  pb-3 hover:opacity-70 transition cursor-pointer">
              <div className="relative w-full h-5/6 overflow-hidden rounded-md">
                <Image
                  src={album.cover_big}
                  alt={album.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              </div>

              <p className=" h-1/6 text-sm text-black  dark:text-white px-1 ">
                {album.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
