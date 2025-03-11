import Header from "../components/Header";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const artistId = params.id;

  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header />
      <h1 className=" font-semibold text-3xl text-center">
        List of artist songs ! {artistId}
      </h1>
    </div>
  );
}
