import { Navbar } from './components/navbar';

type StandaloneLayoutProps = {
  children: Readonly<React.ReactNode>;
};

const StandaloneLayout = ({ children }: StandaloneLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <section className="mx-auto container p-4">
        <Navbar />

        <section className="flex flex-col items-center justify-center py-4">
          {children}
        </section>
      </section>
    </main>
  );
};

export default StandaloneLayout;
