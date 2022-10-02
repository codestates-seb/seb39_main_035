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

//책 베스트셀러 조회 resoponse type
export interface RecommendBooks {
  title: string;
  author: string;
  cover: string;
  publisher: string;
  itemPage: number;
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
// 책 상세 페이지 조회 response type
export interface BookDetail {
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
  memosList: MemoResponse[];
  memoCount: number;
}

export interface BookDetailResponse extends BookDetail {
  bookId: number;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
}

export interface Memo {
  memoType: string; //'BOOK_CONTENT' | 'SUMMARY' | 'THOUGHT' | 'QUESTION';
  memoBookPage: number;
  memoContent: string;
}

export interface MemoResponse extends Memo {
  memoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AbandonBook extends Pageinfo {
  bookId: number;
  createdAt: string;
  title: string;
  cover: string;
}

export interface Pageinfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface memoBooks extends Pageinfo {
  bookId: number;
  title: string;
  cover: string;
  memoCount: number;
}
