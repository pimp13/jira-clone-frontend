export declare namespace ApiResponseType {
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
}
