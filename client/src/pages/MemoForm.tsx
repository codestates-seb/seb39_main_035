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
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const MemoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { bookId, itemPage } = useSelector(
    (state: RootState) => state.book.bookDetail
  );
  const { isSuccess } = useSelector((state: RootState) => state.memo);
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
  const prevPath = `/books/library/${bookId}`;

  useEffect(() => {
    if (id) {
      const memo = location.state;
      setMemoContent(memo.memoContent);
      setType(memo.memoType);
      setMemoBookPage(memo.memoBookPage);
    }
  }, [id, location]);

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

    if (id) {
      await dispatch(editMemo({ memoData, memoId: Number(id) }));
    } else {
      await dispatch(createMemo({ memoData, bookId }));
    }
  };

  // 메모 등록 액션이 성공하면 페이지 이동
  if (isSuccess) {
    navigate(`/books/library/${bookId}`);
  }

  return (
    <Layout>
      <PageTitle title='메모 등록하기' path={prevPath} />
      <FormWrapper>
        <StyledForm onSubmit={onSubmitMemo}>
          <textarea
            name='content'
            id='content'
            placeholder='책을 읽으면서 떠오르는 생각, 질문을 기록해보세요'
            value={memoContent}
            onChange={(e) => setMemoContent(e.target.value)}
          ></textarea>
          {/* <Editor
            placeholder='책에 관한 메모를 등록해보세요'
            previewStyle='vertical' // 미리보기 스타일 지정
            height='300px' // 에디터 창 높이
            initialEditType='wysiwyg' // 초기 입력모드 설정(디폴트 markdown)
            toolbarItems={[
              // 툴바 옵션 설정
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['ul', 'ol', 'task', 'indent', 'outdent'],
              ['table', 'image', 'link'],
              ['code', 'codeblock'],
            ]}
          ></Editor> */}

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
