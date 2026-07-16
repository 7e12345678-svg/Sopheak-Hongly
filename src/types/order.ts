export interface Order {
  _id: string;

  game: string;
  gameId: string;

  playerName: string;
  serverId: string;

  package: string;

  price: number;

  payment: string;

  phone: string;

  screenshot: string;

  status: "Pending" | "Completed";

  createdAt: string;
  updatedAt: string;
}