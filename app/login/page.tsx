"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import './styles.css';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (session) {
      router.push('/');
      return;
    }
  }, [session, router]);

  if (status === "loading") {
    return <div className="flex font-mono items-center justify-center h-[100dvh]">Loading...</div>;
  }

  const validateEmail = (value: string) => {
    // simple email regex for client-side validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push('/')
    }

    setLoading(false);
  };

  return (
    <div className="font-mono h-[100dvh] relative overflow-hidden w-screen bg-gradient-to-tl from-fuchsia-200 via-sky-200 to-amber-100 flex items-center justify-center">
      <div className="bg-overlay w-full h-full absolute"></div>
      <div className="title text-white font-sans fixed z-10 text-shadow-lg" aria-hidden="true">
        <div>LOGIN</div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="z-20 backdrop-blur-sm shadow-2xl rounded-xl p-8 md:p-8 flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-lg"
        aria-labelledby="login-heading"
      >
        <h2 id="login-heading" className="sr-only">Sign in to your account</h2>

        <div className="flex-col text-gray-600 md:w-md w-full">
          <div className="mb-6">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              autoFocus
              name="email"
              type="email"
              value={email}
              onKeyDown={handleEmailKeyDown}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              enterKeyHint="go"
              className="py-3 px-4 transition-all outline-0 w-full bg-white/40 rounded-lg shadow-md focus:shadow-xl  hover:bg-white/70 focus:bg-white/70 placeholder:text-gray-400"
              aria-invalid={!!error && (!email || !validateEmail(email))}
              aria-describedby={error ? "form-error" : undefined}
              autoComplete="email"
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              ref={passwordRef}
              name="password"
              enterKeyHint="done"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="py-3 px-4 pr-12 outline-0 transition-all w-full bg-white/40 rounded-lg shadow-md focus:shadow-xl hover:bg-white/70 focus:bg-white/70 placeholder:text-gray-400"
              aria-invalid={!!error && !password}
              aria-describedby={error ? "form-error" : undefined}
              autoComplete="current-password"
            />

            {/* Show/Hide Button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md outline-none cursor-pointer"
            >
              {showPassword ? (
                // Eye-slash icon (hide)
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                // Eye icon (show)
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-sky-500 rounded-lg shadow-md focus:shadow-xl focus-visible:ring-2 focus-visible:ring-sky-500 hover:shadow-xl transition-all focus:outline-0 text-white w-full p-3 font-semibold cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* Add google, github and apple logins */}
          <div className="flex gap-4 mt-6" role="group" aria-label="Sign in with social accounts">
            {/* Google */}
            <button
              type="button"
              aria-label="Sign in with Google"
              title="Sign in with Google"
              className="bg-white/50 hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-sky-500 outline-none transition-all rounded-lg shadow-md focus:shadow-xl text-gray-800 w-full p-3 font-semibold cursor-pointer flex items-center justify-center gap-2"
              onClick={() => signIn("google", { redirect: false})}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.5h147.2c-6.4 34.7-25.8 64.1-55 83.8v69.7h88.7c51.9-47.8 81.6-118.4 81.6-198.6z"/>
                <path fill="#34A853" d="M272 544.3c74.4 0 136.9-24.6 182.5-66.7l-88.7-69.7c-24.6 16.5-56.1 26.2-93.8 26.2-72 0-133-48.6-154.7-113.9H28.9v71.4C74.5 486.7 167.5 544.3 272 544.3z"/>
                <path fill="#FBBC05" d="M117.3 324.1c-10.4-30.7-10.4-63.9 0-94.6V158h-88.4C7.9 212.7 0 243.9 0 278.4s7.9 65.7 28.9 120.4l88.4-74.7z"/>
                <path fill="#EA4335" d="M272 107.7c39.5-.6 77.6 14.2 106.6 40.8l79.8-79.8C407.4 24.6 344.9 0 272 0 167.5 0 74.5 57.6 28.9 143.4l88.4 71.4c21.7-65.3 82.7-113.9 154.7-113.9z"/>
              </svg>
            </button>

            {/* GitHub */}
            <button
              type="button"
              aria-label="Sign in with GitHub"
              title="Sign in with GitHub"
              className="bg-white/50 hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-sky-500 outline-none transition-all rounded-lg shadow-md focus:shadow-xl text-gray-800 w-full p-3 font-semibold cursor-pointer flex items-center justify-center gap-2"
              onClick={() => signIn("github")}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M8 .198a8 8 0 00-2.53 15.59c.4.074.547-.174.547-.386 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.171-.89-1.171-.727-.497.055-.487.055-.487.803.057 1.225.825 1.225.825.715 1.223 1.874.87 2.33.665.072-.517.279-.87.507-1.07-1.777-.202-3.644-.888-3.644-3.95 0-.873.312-1.588.824-2.148-.083-.203-.357-1.018.078-2.12 0 0 .672-.215 2.2.82a7.65 7.65 0 012.003-.269c.68.003 1.366.092 2.003.269 1.527-1.035 2.198-.82 2.198-.82.437 1.102.163 1.917.08 2.12.513.56.824 1.275.824 2.148 0 3.07-1.87 3.744-3.653 3.943.286.246.54.73.54 1.473 0 1.062-.01 1.918-.01 2.178 0 .214.145.463.55.384A8 8 0 008 .198z" />
              </svg>
            </button>

            {/* Apple */}
            <button
              type="button"
              aria-label="Sign in with Apple"
              title="Sign in with Apple"
              className="bg-white/50 hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-sky-500 outline-none transition-all rounded-lg shadow-md focus:shadow-xl text-gray-800 w-full p-3 font-semibold cursor-pointer flex items-center justify-center gap-2"
              onClick={() => alert("Apple sign-in requires Apple Developer Account that costs $99 dollars a year 😅.")}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 384 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path d="M318.7 268.7c-.2-36.7 16-64.4 50.4-84.8-19-27.6-47.8-42.8-85.4-45.8-35.9-2.9-75.3 21.1-89.3 21.1-14.4 0-47.4-20.1-73.5-20.1C71.4 139 0 193.4 0 301.7c0 54.8 20.2 113.6 45.1 151.3 21.2 31.9 46.3 67.6 79.6 66.3 31.8-1.2 43.9-20.8 82.3-20.8 38.3 0 49.1 20.8 83.4 20.1 34.5-.7 56.2-32.5 77.3-64.7 24.2-36.5 34.2-71.7 34.5-73.5-0.8-0.3-66.1-25.4-66.5-101.7zm-60.4-182.2c27.2-32.8 24.7-62.4 24-73.5-23.5 1.4-50.6 15.8-66.5 34.6-17.6 20.5-27.9 45.9-25.7 73.5 26.2 2 51-11.2 68.2-34.6z"/>
              </svg>
            </button>

            {/* Spotify */}
            <button
              type="button"
              aria-label="Sign in with Spotify"
              title="Sign in with Spotify"
              className="bg-white/50 hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-sky-500 outline-none transition-all rounded-lg shadow-md focus:shadow-xl text-gray-800 w-full p-3 font-semibold cursor-pointer flex items-center justify-center gap-2"
              onClick={() => signIn("spotify")}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 496 512"
                fill="#1DB954"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/>
              </svg>
            </button>
          </div>


          {error && (
          <p id="form-error" className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
          )}

          <div className="mt-4 text-xs text-gray-500 text-center flex justify-between">
            <button
              type="button"
              className="underline cursor-pointer hover:text-gray-900 bg-transparent p-0 border-0"
              onClick={() => alert("Requires dedicated system, placeholder for now. \n\n Use these creds - Username - test@gmail.com\n Password - password")}
            >
              Reset password
            </button>
            <Link href="/signup" className="underline hover:text-gray-900">
              Create new account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
