'use client';

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="flex font-mono items-center justify-center h-screen">Loading...</div>;
  }

  console.log({ session });
  if (!session) {
    // redirect to login if not authenticated
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }
  return (
    <div className="font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        )}

        <p className="text-4xl">Welcome! {session?.user?.name}</p>
        <p>Signed in as {session?.user?.email}</p>

        <button
          className="bg-sky-500 rounded-lg shadow-md focus:shadow-xl focus-visible:ring-2 focus-visible:ring-sky-500 hover:shadow-xl transition-all focus:outline-0 text-white w-full p-3 font-semibold cursor-pointer disabled:opacity-50"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </main>
    </div>
  );
}
