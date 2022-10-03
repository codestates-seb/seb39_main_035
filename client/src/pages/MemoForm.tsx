import React, { useEffect, useState, useRef } from 'react';
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
import { reset } from '../stores/memo/memoSlice';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
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
  const editorRef = useRef<ToastEditor>(null);
  const onChangeEditor = () => {
    if (editorRef.current) {
      const data = editorRef.current.getInstance().getHTML();
      setMemoContent(data);
    }
  };

  const prevPath = `/books/library/${bookId}`;

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
    } else {
      dispatch(createMemo({ memoData, bookId }));
    }
    // console.log({ memoData, bookId });
    navigate(`/books/library/${bookId}`);
  };

  // 메모 등록 액션이 성공하면 페이지 이동
  // if (isSuccess) {
  //   navigate(`/books/library/${bookId}`);
  // }

  return (
    <Layout>
      <PageTitle title='메모 등록하기' path={prevPath} />
      <FormWrapper>
        <StyledForm onSubmit={onSubmitMemo}>
          <ToastEditor
            ref={editorRef}
            onChange={onChangeEditor}
            placeholder='책에 관한 메모를 등록해보세요'
            height='300px' // 에디터 창 높이
            initialEditType='wysiwyg' // 초기 입력모드 설정(디폴트 markdown)
            hideModeSwitch={true}
            toolbarItems={[
              // 툴바 옵션 설정
              [
                'heading',
                'bold',
                'italic',
                'strike',
                'hr',
                'quote',
                'image',
                'link',
              ],
            ]}
            language='ko-KR'
          ></ToastEditor>

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
