"use client";

import {
  Activity,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  FileText,
  FolderTree,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

interface AdminSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface NavigationItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Management",
    icon: UsersRound,
    children: [
      {
        title: "Users",
        href: "/panel/authorization/users",
        icon: UserRound,
      },
      {
        title: "Roles",
        href: "/panel/authorization/roles",
        icon: ShieldCheck,
      },
      {
        title: "Permissions",
        href: "/panel/authorization/permissions",
        icon: LockKeyhole,
      },
    ],
  },

  {
    title: "Content",
    icon: FileText,
    children: [
      {
        title: "Posts",
        href: "/admin/posts",
        icon: FileText,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
      },
    ],
  },

  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },

  {
    title: "System",
    icon: Settings,
    children: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Activity Logs",
        href: "/admin/activity-logs",
        icon: Activity,
      },
    ],
  },
];

function getInitials(
  name?: string | null
) {
  if (!name) {
    return "AD";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

export function AdminSidebar({
  open = false,
  onOpenChange,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] =
    useState(false);

  const [openGroups, setOpenGroups] =
    useState<Record<string, boolean>>({
      Management: true,
      Content: true,
      System: true,
    });

  const isActive = (href?: string) => {
    if (!href) {
      return false;
    }

    if (href === "/dashboard") {
      return pathname === href;
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const isGroupActive = (
    item: NavigationItem
  ) => {
    return item.children?.some((child) =>
      isActive(child.href)
    );
  };

  const toggleGroup = (
    title: string
  ) => {
    setOpenGroups((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  const handleNavigation = () => {
    // Close mobile sidebar after navigation
    onOpenChange?.(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
          onClick={() =>
            onOpenChange?.(false)
          }
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex flex-col
          border-r bg-background
          transition-all duration-300 ease-in-out

          ${collapsed
            ? "w-[72px]"
            : "w-64"
          }

          ${open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div
          className={`
            flex h-16 shrink-0 items-center
            border-b
            ${collapsed
              ? "justify-center px-2"
              : "justify-between px-4"
            }
          `}
        >
          {/* Logo */}
          <Link
            href="/dashboard"
            onClick={handleNavigation}
            className="flex items-center gap-3"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <span className="text-sm font-bold">
                B
              </span>
            </div>

            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">
                  Bordo
                </span>

                <span className="text-[10px] text-muted-foreground">
                  Admin Panel
                </span>
              </div>
            )}
          </Link>

          {/* Mobile close */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() =>
              onOpenChange?.(false)
            }
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* -------------------------------- */}
        {/* Workspace */}
        {/* -------------------------------- */}

        {!collapsed && (
          <div className="px-3 pt-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border bg-muted/30 p-2.5 text-left transition-colors hover:bg-muted/60"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                B
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">
                  Bordo Workspace
                </p>

                <p className="truncate text-[10px] text-muted-foreground">
                  Administration
                </p>
              </div>

              <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* -------------------------------- */}
        {/* Navigation */}
        {/* -------------------------------- */}

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {!collapsed && (
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Navigation
              </p>
            )}

            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                isActive(item.href);

              const groupActive =
                isGroupActive(item);

              const groupOpen =
                openGroups[item.title] ??
                false;

              /*
               * Single link
               */
              if (!item.children) {
                return (
                  <Link
                    key={item.title}
                    href={item.href!}
                    onClick={handleNavigation}
                    title={
                      collapsed
                        ? item.title
                        : undefined
                    }
                    className={`
                      group relative flex h-10
                      items-center gap-3
                      rounded-lg px-3
                      text-sm font-medium
                      transition-all

                      ${active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }

                      ${collapsed
                        ? "justify-center px-0"
                        : ""
                      }
                    `}
                  >
                    <Icon
                      className={`
                        size-[18px] shrink-0
                        ${active
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                        }
                      `}
                    />

                    {!collapsed && (
                      <span className="truncate">
                        {item.title}
                      </span>
                    )}

                    {/* Active indicator */}
                    {active && (
                      <span className="absolute right-2 size-1.5 rounded-full bg-primary-foreground/80" />
                    )}
                  </Link>
                );
              }

              /*
               * Group
               */
              return (
                <div
                  key={item.title}
                  className="space-y-1"
                >
                  <button
                    type="button"
                    title={
                      collapsed
                        ? item.title
                        : undefined
                    }
                    onClick={() => {
                      if (collapsed) {
                        setCollapsed(false);

                        setOpenGroups(
                          (current) => ({
                            ...current,
                            [item.title]: true,
                          })
                        );

                        return;
                      }

                      toggleGroup(
                        item.title
                      );
                    }}
                    className={`
                      group flex h-10 w-full
                      items-center gap-3
                      rounded-lg px-3
                      text-sm font-medium
                      transition-colors

                      ${groupActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }

                      ${collapsed
                        ? "justify-center px-0"
                        : ""
                      }
                    `}
                  >
                    <Icon className="size-[18px] shrink-0" />

                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">
                          {item.title}
                        </span>

                        {groupOpen ? (
                          <ChevronDown className="size-4" />
                        ) : (
                          <ChevronLeft className="size-4" />
                        )}
                      </>
                    )}
                  </button>

                  {/* Children */}
                  {!collapsed &&
                    groupOpen && (
                      <div className="ml-4 space-y-1 border-l pl-3">
                        {item.children.map(
                          (child) => {
                            const ChildIcon =
                              child.icon;

                            const childActive =
                              isActive(
                                child.href
                              );

                            return (
                              <Link
                                key={
                                  child.title
                                }
                                href={
                                  child.href!
                                }
                                onClick={
                                  handleNavigation
                                }
                                className={`
                                  group relative flex h-9
                                  items-center gap-3
                                  rounded-lg px-3
                                  text-sm
                                  transition-colors

                                  ${childActive
                                    ? "bg-primary/10 font-medium text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                  }
                                `}
                              >
                                <ChildIcon
                                  className={`
                                    size-4 shrink-0
                                    ${childActive
                                      ? "text-primary"
                                      : ""
                                    }
                                  `}
                                />

                                <span className="truncate">
                                  {
                                    child.title
                                  }
                                </span>

                                {childActive && (
                                  <span className="ml-auto size-1.5 rounded-full bg-primary" />
                                )}
                              </Link>
                            );
                          }
                        )}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* -------------------------------- */}
        {/* Bottom */}
        {/* -------------------------------- */}

        <div className="mt-auto shrink-0 border-t p-3">
          {!collapsed ? (
            <div className="space-y-2">
              {/* User */}
              <div className="flex items-center gap-3 rounded-xl p-2">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    AD
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    Admin User
                  </p>

                  <p className="truncate text-[11px] text-muted-foreground">
                    Administrator
                  </p>
                </div>
              </div>

              <Separator />

              {/* Logout */}
              <button
                type="button"
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  console.log(
                    "Logout"
                  );
                }}
              >
                <LogOut className="size-[18px]" />

                <span>Log out</span>
              </button>

              {/* Collapse */}
              <button
                type="button"
                onClick={() =>
                  setCollapsed(true)
                }
                className="hidden h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:flex"
              >
                <ChevronLeft className="size-[18px]" />

                <span>
                  Collapse sidebar
                </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {/* User */}
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  AD
                </AvatarFallback>
              </Avatar>

              {/* Logout */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground hover:text-destructive"
                onClick={() => {
                  console.log(
                    "Logout"
                  );
                }}
                title="Log out"
              >
                <LogOut className="size-4" />
              </Button>

              {/* Expand */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9"
                onClick={() =>
                  setCollapsed(false)
                }
                title="Expand sidebar"
              >
                <Menu className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}