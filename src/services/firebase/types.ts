import { type Emotions } from "../../components/face/constants";

export interface User {
  accountId: string;
  name: string;
  id: string;
}

export interface Journal {
  accountId: string;
  emotion: Emotions;
  text: string;
  timestamp: { seconds: number; nanoseconds: number };
  user: User;
}
