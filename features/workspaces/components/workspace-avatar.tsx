import Image from 'next/image';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPublicEnv } from '@/lib/get-env';

type WorkspaceAvatarProps = {
  imageUrl?: string;
  name: string;
  className?: string;
};

export const WorkspaceAvatar = ({
  name,
  className,
  imageUrl,
}: WorkspaceAvatarProps) => {
  const nodeEnv = getPublicEnv('NEXT_PUBLIC_NODE_ENV');
  if (imageUrl) {
    return (
      <div
        className={cn('size-10 relative rounded-md overflow-hidden', className)}
      >
        {/* TODO: change to production mode to Image */}
        {nodeEnv === 'development' ? (
          <img src={imageUrl} alt={name} className="object-center" />
        ) : (
          <Image src={imageUrl} alt={name} fill className="object-center" />
        )}
      </div>
    );
  }

  return (
    <Avatar className={cn('size-10', className)}>
      <AvatarFallback className="rounded-md! text-white bg-blue-600 font-semibold text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
