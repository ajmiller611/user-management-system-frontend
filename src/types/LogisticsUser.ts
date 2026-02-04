export interface LogisticsUser {
  userId: number;
  username: string;
  email: string;
  authorities?: { authority: string }[];
}
