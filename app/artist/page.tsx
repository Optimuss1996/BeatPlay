interface PageProps {
  params: Promise<{ id: string }>;
}
export const revalidate = 0;
export const metadata = {
  title: " Artist Page",
};
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const artistId = id;

  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <h1 className=" font-semibold text-3xl text-center">
        List of artist songs ! {artistId}
      </h1>
    </div>
  );
}
