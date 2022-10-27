import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Boxcontainer from '../components/common/BoxContainer';
import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import Button from '../components/common/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../stores/store';
import { createMemo, editMemo } from '../stores/memo/memoSlice';
import { useSelector } from 'react-redux';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const MemoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { bookId, itemPage } = useSelector(
    (state: RootState) => state.book.bookDetail
  );
  const { token } = useSelector((state: RootState) => state.user);
  const { isSuccess } = useSelector((state: RootState) => state.memo);
  const dispatch = useDispatch<AppDispatch>();
  const [memoContent, setMemoContent] = useState<string>('');
  const [memoBookPage, setMemoBookPage] = useState<number>(0);
  const [type, setType] = useState('BOOK_CONTENT');
  const memoTypeList = [
    { typeValue: 'BOOK_CONTENT', typeText: '책 속 문장' },
    { typeValue: 'SUMMARY', typeText: '책 내용 요약' },
    { typeValue: 'THOUGHT', typeText: '나만의 생각' },
    { typeValue: 'QUESTION', typeText: '나만의 질문' },
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
      setType(memo.memoType);
      setMemoBookPage(memo.memoBookPage);
      setMemoContent(memo.memoContent);
      // 에디터 편집 영역에 memoContent표시하기
      editorRef.current?.getInstance().setHTML(memo.memoContent);
    }
  }, [id, location]);

  useEffect(() => {
    // 이미지 업로드 훅 제거
    editorRef.current?.getInstance().removeHook('addImageBlobHook');
    // // 이미지 업로드 훅 추가
    editorRef.current
      ?.getInstance()
      .addHook('addImageBlobHook', async (blob, callback) => {
        const imgUrl = await imageUpload(blob);
        console.log(imgUrl);
        callback(imgUrl, 'upload image');
      });
    // eslint-disable-next-line
  }, []);

  const imageUpload = async (file: string) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_BASE_URL + '/memos/image-memo',
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      toast.error('용량이 더 작은 이미지를 올려주세요');
    }
  };

  // form 제출
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

    navigate(`/books/library/${bookId}`);
  };

  return (
    <Layout>
      {id && <PageTitle title='메모 수정하기' path={prevPath} />}
      {!id && <PageTitle title='메모 등록하기' path={prevPath} />}
      <FormWrapper>
        <form onSubmit={onSubmitMemo}>
          <StyledTilte>페이지 </StyledTilte>
          <StyledInput
            id='memopage'
            type='number'
            value={memoBookPage}
            min='0'
            max={itemPage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMemoBookPage(Number(e.target.value))
            }
          />
          <StyledTilte>메모 타입</StyledTilte>
          <StyledSelect>
            {memoTypeList.map((el, index) => {
              return (
                <li
                  key={index}
                  value={el.typeValue}
                  className={el.typeValue === type ? 'active' : 'inactive'}
                  onClick={() => setType(el.typeValue)}
                >
                  {el.typeText}
                </li>
              );
            })}
          </StyledSelect>
          <StyledTilte>메모 내용</StyledTilte>
          <StyledEditor
            ref={editorRef}
            onChange={onChangeEditor}
            // placeholder='책에 관한 메모를 등록해보세요'
            height='300px' // 에디터 창 높이
            initialEditType='wysiwyg' // 초기 입력모드 설정(디폴트 markdown)
            hideModeSwitch={true}
            toolbarItems={[
              // 툴바 옵션 설정
              ['bold', 'italic', 'strike', 'hr', 'quote'],
              ['image', 'link'],
            ]}
            language='ko-KR'
          ></StyledEditor>
          <Button color='mint' fullWidth>
            저장하기
          </Button>
        </form>
      </FormWrapper>
    </Layout>
  );
};

export default MemoForm;

const FormWrapper = styled(Boxcontainer)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin-bottom: 0.6rem;
  font-size: 1rem;
`;

const StyledTilte = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
`;

const StyledEditor = styled(ToastEditor)`
  .toast-editor-contents {
    font-size: 1.2rem;
  }
`;

const StyledSelect = styled.ul`
  margin-bottom: 0.6rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  color: #f9f9f9;
  font-size: 0.88rem;
  li {
    padding: 0.6rem;
    border-radius: 3rem;
    margin-right: 0.6rem;
  }

  .inactive {
    display: flex;
    cursor: pointer;
    background-color: #a5a5a5;
  }
  .active {
    background-color: var(--light-blue);
    transition: 0.5s;
  }
`;
