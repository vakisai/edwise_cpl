// import Link from "next/link";
// import Image from "next/image";

// const Footer = () => {
//   return (
//     <div className="text-white  py-10 bg-gray-800 flex items-center justify-center  w-full ">
//       <div className="footer-container container flex flex-row items-start justify-between px-10 max-sm:flex-col max-sm:items-center max-sm:h-[450px]">
//         <section className="sponser-contaier flex items-start">
//           <Image
//             src="/logo.svg"
//             className="mr-2"
//             height={32}
//             width={32}
//             alt="logo"
//           />
//           <section className="sponser-info flex flex-col items-start justify-between">
//             <p className="text-lg font-bold mb-1">Community Premier League</p>
//             <p className="text-slate-400 text-sm mb-3">Powered By</p>
//             <Link target="_blank" href="https://www.edwiseinternational.com/">
//               <Image
//                 src="/assets/edwise.svg"
//                 height={60}
//                 width={110}
//                 className="w-auto h-auto"
//                 alt="sponser-edwise-international"
//               />
//             </Link>
//           </section>
//         </section>
//         <section className="imp-links flex flex-col justify-between gap-2">
//           <p className="text-lg font-bold mb-4">Important Links</p>
//           <Link
//             href="https://www.edwiseinternational.com/study-abroad-consultants/about.aspx"
//             target="_blank"
//             className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300"
//           >
//             About Us
//           </Link>
//           <Link
//             href="/contact-us"
//             className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300"
//           >
//             Contact Us
//           </Link>
//           <Link
//             href="/terms-and-conditions"
//             className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300"
//           >
//             Terms & Conditions
//           </Link>
//           <Link
//             href="/privacy-policy"
//             className="text-sm font-medium hover:text-slate-400 hover:underline transition-colors duration-300"
//           >
//             Privacy Policy
//           </Link>
//         </section>
//         <section className="flex-col">
//           <p className="text-lg font-bold mb-4">Social Links</p>
//           <section className="flex">
//             <Link
//               href="https://www.instagram.com/edwiseint"
//               target="_blank"
//               className="hover:bg-slate-600 p-1 bg-slate-700 rounded-md  transition-colors duration-100 mr-2"
//             >
//               <Image
//                 src="/assets/instagram.svg"
//                 height={32}
//                 width={32}
//                 alt="instagram"
//               />
//             </Link>
//             <Link
//               href="https://www.facebook.com/edwiseinternational"
//               target="_blank"
//               className="hover:bg-slate-600 p-1 bg-slate-700 rounded-md transition-colors duration-100 mr-2"
//             >
//               <Image
//                 src="/assets/facebook.svg"
//                 height={32}
//                 width={32}
//                 alt="facebook"
//               />
//             </Link>
//             <Link
//               href="https://www.linkedin.com/company/edwise-international/?originalSubdomain=in"
//               target="_blank"
//               className="hover:bg-slate-600 p-1 bg-slate-700 rounded-md transition-colors duration-100"
//             >
//               <Image
//                 src="/assets/linkedin.svg"
//                 height={32}
//                 width={32}
//                 alt="linkedin"
//               />
//             </Link>
//           </section>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6 md:px-16">
      <div className="container mx-auto flex flex-wrap justify-between items-center md:items-start gap-8">
        {/* Logo and Sponsor Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" height={40} width={40} alt="logo" />
            <h2 className="text-xl font-bold">Community Premier League</h2>
          </div>
          <p className="text-gray-400 text-sm mt-2">Powered By</p>
          <Link target="_blank" href="https://www.edwiseinternational.com/">
            <Image
              src="/assets/edwise.svg"
              height={60}
              width={110}
              alt="sponsor-edwise-international"
              className="mt-2 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </div>

        {/* Important Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Important Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://www.edwiseinternational.com/study-abroad-consultants/about.aspx"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/terms-and-conditions"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/edwiseint" target="_blank">
              <Image
                src="/assets/instagram.svg"
                height={32}
                width={32}
                alt="instagram"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <Link href="https://www.facebook.com/edwiseinternational" target="_blank">
              <Image
                src="/assets/facebook.svg"
                height={32}
                width={32}
                alt="facebook"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <Link href="https://www.linkedin.com/company/edwise-international/?originalSubdomain=in" target="_blank">
              <Image
                src="/assets/linkedin.svg"
                height={32}
                width={32}
                alt="linkedin"
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-10">© {new Date().getFullYear()} Community Premier League. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
