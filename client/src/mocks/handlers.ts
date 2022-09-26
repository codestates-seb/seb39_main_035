import { BookList } from './db';
import { rest } from 'msw';

export const handlers = [
  rest.get(`/boo`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        bookId: 1,
        title: '물고기는 존재하지 않는다',
        cover:
          'https://image.aladin.co.kr/product/29858/98/coversum/k432838027_2.jpg',
        author: '룰루 밀러',
        publisher: '곰출판',
        createdAt: '',
        start: 5,
        currentPage: 300,
        itempPage: 300,
        bookStatus: 1,
      })
    );
  }),
];
