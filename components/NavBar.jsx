// import Image from "next/image";
// import Link from "next/link";
// import Menu from "@components/Menu";

// import { getServerSession } from "next-auth";
// import authOptions from "@utils/auth.js";

// import { UserIcon, Bars3BottomRightIcon } from "@heroicons/react/24/outline";

// import { LoginButton, LogoutButton } from "@components/ClientComponents";

// const NavBar = async () => {
//   const session = await getServerSession(authOptions);
//   console.log(session?.user);
//   const is_admin = session?.user?.is_admin;

//   return (
//     <div
//       className={`flex items-center justify-between h-14 px-4 w-full ${
//         is_admin ? null : "bg-slate-200"
//       }`}
//     >
//       <Link href="/" className="font-bold flex items-center justify-between">
//         <Image height={32} width={32} alt="Logo" src="/logo.svg" />
//         <p className="text-lg min-w-fit ml-2 max-sm:hidden">
//           Community Premier League
//         </p>
//       </Link>
//       {!is_admin && (
//         <div className="flex w-96 items-center justify-between max-md:hidden">
//           <Link href="/" className="nav-link">
//             Home
//           </Link>
//           {session?.user ? (
//             <Link href="/team-details" className="nav-link">
//               Team
//             </Link>
//           ) : null}
//           <Link href="/learn-more" className="nav-link">
//             Info
//           </Link>
//           <Link href="/contact-us" className="nav-link">
//             ContactUs
//           </Link>
//         </div>
//       )}
//       <div className="flex">
//         {session?.user ? (
//           <div className="flex gap-3 md:gap-5">
//             <LogoutButton />
//             <Link
//               href={
//                 session.user.is_admin ? "/admin/dashboard" : "/team-details"
//               }
//             >
//               <Image
//                 src={session?.user.image}
//                 width={37}
//                 height={37}
//                 className="rounded-full"
//                 alt="profile"
//               />
//             </Link>
//           </div>
//         ) : (
//           <Link href="/acknowledgement">
//             <p className="btn_black rounded-full group min-w-fit">
//               <UserIcon className="h-5 w-5 text-white mr-2 group-hover:text-black transition-colors duration-75" />
//               Sign in
//             </p>
//           </Link>
//         )}
//         <Menu session={session} />
//       </div>
//     </div>
//   );
// };

// export default NavBar;

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
              href={session.user.is_admin ? "/admin/dashboard" : "/team-details"}
            >
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full border border-gray-300"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <Link href="/acknowledgement" className="btn_black flex items-center rounded-full px-4 py-1 transition hover:bg-black hover:text-white">
            <UserIcon className="h-5 w-5 text-white mr-2" />
            Sign in
          </Link>
        )}
        <Menu session={session} />
      </div>
    </div>
  );
};

export default NavBar;
