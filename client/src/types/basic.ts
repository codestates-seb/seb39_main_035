export interface Book {
  itemId: number;
  title: string;
  author: string;
  cover: string;
  publisher: string;
}

export interface Books {
  title: string;
  author: string;
  cover: string;
  publisher: string;
  itemPage: number;
  currentPage: number;
  bookStatus: string;
  readStartDate: string | null;
  readEndDate: string | null;
}

// 책 상세 페이지 type
export interface BookDetail {
  itemId: number;
  title: string;
  author: string;
  cover: string;
  createdAt: string;
  publisher: string;
  star: number;
  itemPage: number;
  currentPage: number;
  bookStatus: string;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
}
