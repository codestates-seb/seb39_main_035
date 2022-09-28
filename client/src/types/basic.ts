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
  author: string;
  publisher: string;
  itemPage: number;
  readStartDate: string | null;
  readEndDate: string | null;
  bookStatus: string;
  star: number;
  currentPage: number;
  bookId?: string;
}

export interface BooksDetail {
  author: string;
  publisher: string;
  itemPage: number;
  readStartDate: string | null;
  readEndDate: string | null;
  star: number;
  currentPage: number;
  bookId: number;
  title: string;
  cover: string;
  createdAt: string;
  bookStatus: string;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
}
