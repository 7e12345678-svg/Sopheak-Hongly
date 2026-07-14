import type { GamePackage } from "./package";

export interface Game {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;

  packages: GamePackage[];

  featured: boolean;
  sortOrder: number;
  status: boolean;

  createdAt: string;
  updatedAt: string;
}