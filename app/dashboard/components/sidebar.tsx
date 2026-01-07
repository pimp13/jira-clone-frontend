import Image from 'next/image';
import Link from 'next/link';

import { Navigation } from './navigation';
import { LogoHeight, LogoWidth } from '@/utils/const';
import { DottedSeparator } from '@/components/dotted-separator';
import { WorkspaceSwitcher } from '@/features/workspaces/components/workspace-switcher';
import { Suspense } from 'react';

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={LogoWidth}
          height={LogoHeight}
        />
      </Link>

      <DottedSeparator className="my-4" />
      <Suspense fallback={'Loading ........'}>
        <WorkspaceSwitcher />
      </Suspense>

      <DottedSeparator className="my-4" />

      <Navigation />
    </aside>
  );
};
