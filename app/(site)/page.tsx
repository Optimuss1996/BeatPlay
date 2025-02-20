import getSongs from "@/action/getSongs";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <main className="bg-neutral-900 w-full h-full overflow-hidden overflow-y-auto rounded">
      <Header>
        <div className=" mb-2">
          <h1 className=" text-white text-3xl font-semibold ">Welcome back</h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem name="Liked Songs" href="Liked" />
          </div>
        </div>
      </Header>
      <div className=" px-6 mt-2 mb-7">
        <div className=" flex justify-between items-center">
          <p className=" font-semibold text-2xl text-white">Newest Songs</p>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </main>
  );
}
