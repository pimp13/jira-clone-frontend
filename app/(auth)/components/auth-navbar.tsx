'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Logout } from '@/features/auth/components/logout';

export const AuthNavbar = () => {
  const pathname = usePathname();
  const isSignIn = pathname === '/sign-in';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('_token='))
      ?.split('=')[1];

    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="flex justify-between items-center">
      <Image src="/logo.svg" alt="Logo" width={152} height={56} />
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <Logout />
        ) : (
          <Button asChild variant="secondary">
            <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
              {isSignIn ? 'Sign Up' : 'Login'}
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
};
