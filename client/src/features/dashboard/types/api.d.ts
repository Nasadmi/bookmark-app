export interface Link {
  url: string;
  archived: boolean;
  tags: string[];
  favicon: string | null;
  description: string | null;
  title: string;
  last_visited: Date;
  createdAt: Date;
}

export interface UserData {
  id: number;
  email: string;
  img: string | null;
  img_id: string | null;
  createdAt: Date;
  links: Link[];
}