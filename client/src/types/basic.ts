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

// 책 수정 response type
export interface EditBookDetail {
  author: string;
  itemPage: number;
  currentPage: number;
  publisher: string;
  bookStatus: string;
  readStartDate: string | null;
  readEndDate: string | null;
  star: number;
  bookId?: string;
}
// 책 상세 페이지 response type
export interface BookDetail {
  bookId?: string;
  title: string;
  cover: string;
  author: string;
  publisher: string;
  createdAt: string;
  star: number;
  currentPage: number;
  itemPage: number;
  bookStatus: string;
  readStartDate: string | null;
  readEndDate: string | null;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
}
