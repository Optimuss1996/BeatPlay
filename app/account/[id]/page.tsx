interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "account",
};

export default async function PlaylistPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className=" p-3 bg-white dark:bg-slate-900  w-full h-full overflow-hidden overflow-y-auto ">
      account : {id}
    </div>
  );
}
