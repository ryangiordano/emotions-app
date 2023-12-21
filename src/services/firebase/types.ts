import { Emotions } from "../../components/face/constants";

export type User = {
  accountId: string;
  name: string;
  id: string;
};

export type Journal = {
  accountId: string;
  emotion: Emotions;
  text: string;
  timestamp: number;
  user: User;
};
