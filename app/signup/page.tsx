'use client';

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="font-mono min-h-screen flex items-center justify-center">

      <div className="flex-col">
        <h1 className="text-4xl mb-8">Signup yet to be implemented!</h1>
        <p>Need to handle user registration and add a DB to store user credentials.</p>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => router.push('/login')}>
          Go to Login
        </button>
      </div>
    </div>
  );
}