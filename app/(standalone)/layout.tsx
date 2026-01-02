import { UserButton } from '@/features/auth/components/user-button';
import { LogoHeight, LogoWidth } from '@/utils/const';
import Image from 'next/image';
import Link from 'next/link';

type StandaloneLayoutProps = {
  children: Readonly<React.ReactNode>;
};

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <section className="mx-auto container p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={LogoWidth}
              height={LogoHeight}
            />
          </Link>

          <UserButton />
        </nav>

        <section className="flex flex-col items-center justify-center py-4">
          {children}
        </section>
      </section>
    </main>
  );
};

export default StandaloneLayout;
