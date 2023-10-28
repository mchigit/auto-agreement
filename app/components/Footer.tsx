"use client";
import { Typography } from "@material-tailwind/react";
 
export function SimpleFooter() {
  return (
<footer className=" p-8 fixed bottom-0 w-full flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between max-h-20 bg-white">
  <Typography color="blue-gray" className="font-normal">
    &copy; 2023 Material Tailwind
  </Typography>
  <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
    <li>
      <Typography
        as="a"
        href="#"
        color="blue-gray"
        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
      >
        Terms &amp; Conditions
      </Typography>
    </li>
    <li>
      <Typography
        as="a"
        href="#"
        color="blue-gray"
        className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
      >
        Privacy Policy
      </Typography>
    </li>
  </ul>
</footer>
  );
}