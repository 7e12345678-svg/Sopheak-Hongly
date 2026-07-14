export interface Package {
  name: string;
  price: number;
}

export interface GamePackage {
  _id: string;
  name: string;
  slug: string;
  image: string;

  description: string;

  featured: boolean;

  sortOrder: number;

  status: boolean;

  packages: Package[];
}