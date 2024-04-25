import { User } from 'firebase/auth';

export interface ImageListItemType {
  itemId: string;
  imageUrl: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
  storagePath: string;
}

export interface ContextType {
  user: User | null | undefined;
  isLoading: boolean;
}
