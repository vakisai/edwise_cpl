import Image from "next/image";
import Link from "next/link";
import Menu from "@components/Menu";
import { getServerSession } from "next-auth";
import authOptions from "@utils/auth.js";
import { UserIcon } from "@heroicons/react/24/outline";
import { LoginButton, LogoutButton } from "@components/ClientComponents";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  const is_admin = session?.user?.is_admin;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[99%] max-w-7xl flex items-center justify-between h-24 px-12 py-5
  rounded-full backdrop-blur-lg border border-gray-300 shadow-lg z-50 mb-100 transition-all
  bg-white/30 dark:bg-white/10`}
    >
      {/* Logo */}
      <Link href="/" className="font-bold flex items-center">
        <Image height={60} width={60} alt="Logo" src="/logo.svg" />
        <p className="text-lg min-w-fit ml-2 max-sm:hidden">
          Community Premier League
        </p>
      </Link>

      {/* Navigation Links */}
      {!is_admin && (
        <div className="hidden md:flex gap-10">
          <Link href="/" className="nav-link">
            Home
          </Link>
          {session?.user && (
            <Link href="/team-details" className="nav-link">
              Team
            </Link>
          )}
          <Link href="/learn-more" className="nav-link">
            Info
          </Link>
          <Link href="/contact-us" className="nav-link">
            Contact
          </Link>
        </div>
      )}

      {/* User Section */}
      <div className="flex items-center gap-4">
        {session?.user ? (
          <div className="flex items-center gap-3">
            <LogoutButton />
            <Link
              href={
                session.user.is_admin ? "/admin/dashboard" : "/team-details"
              }
            >
              <Image
                src={session?.user.image || "/assets/profile.png"}
                width={37}
                height={37}
                className="rounded-full border border-gray-300"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="btn_black flex items-center rounded-full px-4 py-2 transition hover:bg-black hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white mr-2"
                
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Admin Signin
            </Link>
            <Link
              href="/acknowledgement"
              className="btn_black flex items-center rounded-full px-4 py-2 transition hover:bg-black hover:text-white"
            >
              <UserIcon className="h-5 w-5 text-white mr-2" />
              Sign in
            </Link>
          </div>
        )}
        <Menu session={session} />
      </div>
    </div>
  );
};

export default NavBar;
