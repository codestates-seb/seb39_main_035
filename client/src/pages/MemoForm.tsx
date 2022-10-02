import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Boxcontainer from '../components/BoxContainer';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { createMemo, editMemo } from '../stores/memo/memoSlice';
import { useSelector } from 'react-redux';

const MemoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { bookId, itemPage } = useSelector(
    (state: RootState) => state.book.bookDetail
  );
  const dispatch = useDispatch<AppDispatch>();
  const [memoContent, setMemoContent] = useState<string>('');
  const [memoBookPage, setMemoBookPage] = useState<number>(0);
  const [type, setType] = useState('BOOK_CONTENT');
  const memoTypeList = [
    { typeValue: 'BOOK_CONTENT', typeText: '책 속 문장' },
    { typeValue: 'SUMMARY', typeText: '책 내용 요약' },
    { typeValue: 'THOUGHT', typeText: '생각' },
    { typeValue: 'QUESTION', typeText: '질문' },
  ];

  useEffect(() => {
    if (id) {
      const memo = location.state;
      setMemoContent(memo.memoContent);
      setType(memo.memoType);
      setMemoBookPage(memo.memoBookPage);
    }
  }, [id, location]);

  const onSubmitMemo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //유효성 검사
    if (!memoContent) {
      return;
    }
    const memoData = {
      memoBookPage,
      memoContent,
      memoType: type,
    };

    if (id) {
      dispatch(editMemo({ memoData, memoId: Number(id) }));
      // console.log({ ...memoData, memoId: Number(id) });
    } else {
      dispatch(createMemo({ memoData, bookId }));
      // console.log({ memoData, bookId });
    }
    navigate(`/books/library/${bookId}`);
  };
  const path = `/books/library/${bookId}`;

  return (
    <Layout>
      <PageTitle title='메모 등록하기' path={path} />
      <FormWrapper>
        <StyledForm onSubmit={onSubmitMemo}>
          <textarea
            name='content'
            id='content'
            placeholder='책을 읽으면서 떠오르는 생각, 질문을 기록해보세요'
            value={memoContent}
            onChange={(e) => setMemoContent(e.target.value)}
          ></textarea>
          <input
            type='number'
            value={memoBookPage}
            min='0'
            max={itemPage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMemoBookPage(Number(e.target.value))
            }
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {memoTypeList.map((type, index) => (
              <option key={index} value={type.typeValue}>
                {type.typeText}
              </option>
            ))}
          </select>
          <Button color='mint' fullWidth>
            저장하기
          </Button>
        </StyledForm>
      </FormWrapper>
    </Layout>
  );
};

export default MemoForm;

const FormWrapper = styled(Boxcontainer)`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  > textarea {
    display: block;
    width: 100%;
    height: 160px;
    border: none;
    border-radius: 5px;
    resize: none;
    font-family: RIDIBatang;
    padding: 2rem;
    font-size: 16px;
    background-color: #eaeaea;
    &:focus {
      outline: none;
    }
  }
`;
