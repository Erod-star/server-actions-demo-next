'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarItem = ({ icon, path, title }: SidebarItemProps) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl transition
          hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white
          ${
            path === pathName
              ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
              : ''
          }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
