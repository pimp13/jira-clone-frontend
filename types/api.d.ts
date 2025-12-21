export declare namespace ApiResponseType {
  //* User Auth Types
  type RegisterUser = {
    email: string;
    joined_at: Date;
    name: string;
  };

  type UserInfo = {
    email: string;
    id: string;
    name: string;
    avatarUrl: string | null;
    version: number;
    role: 'ADMIN' | 'USER';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  //* Workspace Type
  type Workspace = {
    id: string;
    name: string;
    slug: string;
    ownerId: string;
    imageUrl: string;
    fullDestination: string;
    owner: UserInfo;
    createdAt: Date;
    updatedAt: Date;
  };
}
