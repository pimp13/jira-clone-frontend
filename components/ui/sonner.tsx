'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon strokeWidth={2} className="size-5 text-green-600" />
        ),
        info: <InfoIcon className="size-4" />,
        warning: (
          <TriangleAlertIcon
            strokeWidth={2}
            className="size-5 text-amber-500"
          />
        ),
        error: <OctagonXIcon strokeWidth={2} className="size-5 text-red-500" />,
        loading: (
          <Loader2Icon strokeWidth={2} className="size-5 animate-spin" />
        ),
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
