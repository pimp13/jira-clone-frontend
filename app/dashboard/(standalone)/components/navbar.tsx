'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LogoHeight, LogoWidth } from '@/utils/const';
import { UserButton } from '@/features/auth/components/user-button';
import { useMedia } from 'react-use';
import { Navigation } from '@/app/dashboard/(panel)/components/navigation';

export const Navbar = () => {
  const isDesktop = useMedia('(min-width: 1024px)', true);
  return (
    <nav className="flex justify-between items-center h-[73px]">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={LogoWidth}
          height={LogoHeight}
        />
      </Link>

      {isDesktop && <Navigation classNames="flex flex-row" />}

      <UserButton />
    </nav>
  );
};
