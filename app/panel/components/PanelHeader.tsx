"use client";

import {
  Bell,
  ChevronRight,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  onMenuClick?: () => void;
  user?: {
    name?: string | null;
    username?: string | null;
    email?: string | null;
    avatar?: string | null;
  };
}

const routeLabels: Record<string, string> = {
  admin: "Admin",
  authorization: "Authorization",
  users: "Users",
  roles: "Roles",
  permissions: "Permissions",
  dashboard: "Dashboard",
  settings: "Settings",
};

function getInitials(
  name?: string | null,
  username?: string | null
) {
  const value = name || username || "User";

  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname
    .split("/")
    .filter(Boolean);

  return segments.map((segment, index) => {
    const path =
      "/" +
      segments
        .slice(0, index + 1)
        .join("/");

    const label =
      routeLabels[segment] ||
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );

    return {
      label,
      path,
      isLast:
        index === segments.length - 1,
    };
  });
}

export function AdminHeader({
  onMenuClick,
  user,
}: AdminHeaderProps) {
  const pathname = usePathname();

  const breadcrumbs =
    getBreadcrumbs(pathname);

  const initials = getInitials(
    user?.name,
    user?.username
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {/* Mobile menu */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>

        {/* Mobile divider */}
        <Separator
          orientation="vertical"
          className="h-6 lg:hidden"
        />

        {/* Breadcrumb */}
        <div className="flex min-w-0 items-center">
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 items-center"
          >
            {breadcrumbs.map(
              (breadcrumb, index) => (
                <div
                  key={breadcrumb.path}
                  className="flex min-w-0 items-center"
                >
                  {index > 0 && (
                    <ChevronRight className="mx-1.5 size-4 shrink-0 text-muted-foreground/50" />
                  )}

                  {breadcrumb.isLast ? (
                    <span className="truncate text-sm font-medium">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <Link
                      href={breadcrumb.path}
                      className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
                    >
                      {breadcrumb.label}
                    </Link>
                  )}
                </div>
              )
            )}
          </nav>
        </div>

        {/* Desktop search */}
        <div className="ml-auto hidden items-center md:flex">
          <button
            type="button"
            className="group flex h-9 w-[240px] items-center gap-2 rounded-lg border bg-muted/30 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60"
          >
            <Search className="size-4 shrink-0" />

            <span className="flex-1 text-left">
              Search...
            </span>

            <kbd className="pointer-events-none hidden rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
              ⌘ K
            </kbd>
          </button>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-3">
          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Bell className="size-[19px]" />

                {/* Notification dot */}
                <span className="absolute right-1.5 top-1.5 flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />

                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80"
            >
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>

                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  3 new
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <div className="flex flex-col">
                <button
                  type="button"
                  className="flex gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <User className="size-4 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      New user registered
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      A new user has joined your platform.
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      5 minutes ago
                    </p>
                  </div>
                </button>

                <Separator />

                <button
                  type="button"
                  className="flex gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <Settings className="size-4 text-emerald-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      System update completed
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Your latest system update was completed.
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      1 hour ago
                    </p>
                  </div>
                </button>

                <Separator />

                <button
                  type="button"
                  className="flex gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                    <Bell className="size-4 text-orange-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      Review pending actions
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      There are actions waiting for your review.
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      2 hours ago
                    </p>
                  </div>
                </button>
              </div>

              <DropdownMenuSeparator />

              <Link
                href="/notifications"
                className="flex h-9 items-center justify-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                View all notifications
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator
            orientation="vertical"
            className="mx-1 hidden h-7 sm:block"
          />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
            >
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg p-1.5 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="size-8">
                  {user?.avatar && (
                    <AvatarImage
                      src={user.avatar}
                      alt={
                        user.name ||
                        user.username ||
                        "User"
                      }
                    />
                  )}

                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden max-w-[140px] text-left lg:block">
                  <p className="truncate text-sm font-medium leading-tight">
                    {user?.name ||
                      user?.username ||
                      "Admin User"}
                  </p>

                  <p className="truncate text-[11px] text-muted-foreground">
                    {user?.email ||
                      "admin@example.com"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium">
                    {user?.name ||
                      user?.username ||
                      "Admin User"}
                  </span>

                  <span className="text-xs font-normal text-muted-foreground">
                    {user?.email ||
                      "admin@example.com"}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 size-4" />

                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 size-4" />

                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => {
                  // Add your logout logic here
                  console.log("Logout");
                }}
              >
                <LogOut className="mr-2 size-4" />

                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}