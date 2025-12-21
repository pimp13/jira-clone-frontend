import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPublicEnv } from '@/lib/get-env';

type WorkspaceAvatarProps = {
  fullDistination?: string;
  name: string;
  className?: string;
};

export const WorkspaceAvatar = ({
  name,
  className,
  fullDistination,
}: WorkspaceAvatarProps) => {
  const nodeEnv = getPublicEnv('NEXT_PUBLIC_NODE_ENV');
  if (fullDistination) {
    return (
      <div
        className={cn('size-10 relative rounded-md overflow-hidden', className)}
      >
        {/* TODO: change to production mode to Image */}
        {nodeEnv === 'development' ? (
          <img src={fullDistination} alt={name} className="object-center" />
        ) : (
          <Image
            src={fullDistination}
            alt={name}
            fill
            className="object-center"
          />
        )}
      </div>
    );
  }

  return (
    <Avatar className={cn('size-10', className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
