import Link from 'next/link';
import { IconType } from 'react-icons/lib';
import {
  GoHome,
  GoHomeFill,
  GoCheckCircleFill,
  GoCheckCircle,
} from 'react-icons/go';
import { SettingsIcon, UsersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavigationRoutes = {
  label: string;
  href: string;
  icon: IconType;
  activeIcon: IconType;
};

const routes: NavigationRoutes[] = [
  {
    label: 'Home',
    href: '/',
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: 'My Tasks',
    href: '/tasks',
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: 'Members',
    href: '/members',
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex flex-col">
        {routes.map((item) => {
          const isActive = false;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500',
                  isActive &&
                    'bg-white shadow-sm hover:opacity-100 text-primary',
                )}
              >
                <Icon className="size-5 text-neutral-500" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
