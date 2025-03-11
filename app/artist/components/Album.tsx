import { AlbumType } from "@/types";

interface AlbumProps {
  artistAlbums: AlbumType[];
}

export default function Album({ artistAlbums }: AlbumProps) {
  return (
    <section className="mt-20 px-3 md:px-6">
      <p className="text-3xl md:text-5xl text-black dark:text-white font-semibold">
        Albums
      </p>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
        {artistAlbums.map((album) => (
          <div key={album.id} className=" flex flex-col gap-y-4 ">
            <div className=" relative w-36 h-auto md:w-48  overflow-hidden">
              <img
                src={album.cover_medium}
                alt={album.title}
                className="object-cover rounded-md"
              />
            </div>
            <div className=" flex flex-col gap-y-3">
              <p className="  md:text-base text-black dark:text-white">
                {album.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
