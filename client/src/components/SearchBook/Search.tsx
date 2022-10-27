import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border: ${(props) => props.theme.colors.border};
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;

  input {
    background: transparent;
    font-size: 1.2rem;
    outline: none;
    border: none;
    width: 100%;
    color: ${(props) => props.theme.colors.font};
    margin-left: 0.25rem;
    font-family: 'Pretendard-Regular';

    &::placeholder {
      font-size: 1rem;
      font-family: 'Pretendard-Regular';
    }
  }
`;

type Props = {
  path: string;
  setPath: Function;
  getBookList: Function;
};

const Search = ({ path, setPath, getBookList }: Props) => {
  // onKeyDown 'Enter' 일때 검색 기능
  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && path !== '') {
      event.preventDefault();
      getBookList(path);
    }
  };

  return (
    <SearchForm>
      <FiSearch size='1.5rem' />
      <input
        type='text'
        placeholder='책 제목 혹은 저자 입력 후 ENTER'
        onKeyDown={onSearch}
        value={path}
        onChange={(event) => setPath(event.target.value)}
        autoFocus={true}
      />
    </SearchForm>
  );
};

export default Search;
