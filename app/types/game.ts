export interface Game {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  status: boolean;
  featured?: boolean;
  sortOrder?: number;
}