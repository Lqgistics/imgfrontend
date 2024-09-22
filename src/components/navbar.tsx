import Link from "next/link";

const navLinks = [
  {
    display: "Home",
  },
  {
    display: "Features",
  },
  {
    display: "Login",
  },
  {
    display: "Plans",
  },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex justify-center items-center h-24 w-auto z-10 ">
      <ul className="flex items-center gap-10 text-sm py-4 px-6 dark:text-white bg-[#131327]/20 backdrop-blur-lg rounded-2xl">
        {navLinks.map((link) => (
          <li key={link.display} className="cursor-pointer font-medium">
            {link.display}
          </li>
        ))}
      </ul>
    </nav>
  );
}
