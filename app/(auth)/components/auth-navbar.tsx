'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { LogoHeight, LogoWidth } from '@/utils/const';

export const AuthNavbar = () => {
  const pathname = usePathname();
  const isSignIn = pathname === '/sign-in';

  return (
    <nav className="flex justify-between items-center">
      <Image src="/logo.svg" alt="Logo" width={LogoWidth} height={LogoHeight} />
      <div className="flex items-center gap-2">
        <Button asChild variant="secondary">
          <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
            {isSignIn ? 'Sign Up' : 'Login'}
          </Link>
        </Button>
      </div>
    </nav>
  );
};
