import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Boxcontainer from '../components/BoxContainer';
import Layout from '../components/Layout';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../stores/store';
import { createMemo } from '../stores/memo/memoSlice';

const MemoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, itemPage } = location.state; // store -> bookDetail에서 가져오는게 맞을까?
  const dispatch = useDispatch<AppDispatch>();
  const [memoContent, setMemoContent] = useState<string>('');
  const [memoBookPage, setMemoBookPage] = useState<number>(0);
  const [type, setType] = useState('');
  const memoTypeList = [
    { typeId: 1, typeValue: 'BOOK_CONTENT', typeText: '책 속 문장' },
    { typeId: 2, typeValue: 'SUMMARY', typeText: '책 내용 요약' },
    { typeId: 3, typeValue: 'THOUGHT', typeText: '생각' },
    { typeId: 4, typeValue: 'QUESTION', typeText: '질문' },
  ];

  const onSubmitMemo = async (e: React.FormEvent<HTMLFormElement>) => {
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

    await dispatch(createMemo({ memoData, bookId }));
    navigate(`/books/library/${bookId}`);
  };

  return (
    <Layout>
      <PageTitle title='메모 등록하기' />
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
            {memoTypeList.map((type) => (
              <option key={type.typeId} value={type.typeValue}>
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
