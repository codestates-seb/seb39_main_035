export interface Book {
  itemId: number;
  title: string;
  author: string;
  cover: string;
  publisher: string;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
}
