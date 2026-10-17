import { axios } from "@/lib/axios";
import { CreateUserFormValues } from "../schemas";

export interface User {
  id: number;
  name: string | null;
  username: string;
  email: string;
  isActive: boolean;
  roleId: number;
  role: {
    id: number;
    name: string;
  };
  createdAt: string;
}

interface DataWrapper {
  success?: boolean;
  data?: User[];
}

const API_URL = 'http://localhost:3000/api/v1';

export async function fetchUsersAll(): Promise<User[] | null> {
  try {
    const res = await fetch(`${API_URL}/users`, {
      credentials: 'include'
    });
    const result: DataWrapper = await res.json();
    return result?.data || [];
  } catch (err) {
    console.log("error in fetch users", err);
    return null;
  }
}


export async function createUser(data: CreateUserFormValues) {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'post',
      credentials: 'include'
    });
    const result = await res.json();
    return result?.data || {};
  } catch (err) {
    console.log('error in create user', err);
    return null;
  }
}
