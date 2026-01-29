export interface LogisticsUser {
  userId: number;
  username: string;
  email: string;
  createdAt: string;
  authorities?: { authority: string }[];
}
