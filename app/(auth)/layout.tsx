import { AuthNavbar } from './components/auth-navbar';

type AuthLayoutProps = {
  children: Readonly<React.ReactNode>;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <section className="mx-auto max-w-screen-2xl p-4">
        <AuthNavbar />
        <section className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </section>
      </section>
    </main>
  );
};

export default AuthLayout;
