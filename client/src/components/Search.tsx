import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid rgba(0 0 0 / 20%);
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;

  input {
    background: transparent;
    font-size: 1.2rem;
    outline: none;
    border: none;
    width: 100%;
    color: rgba(0 0 0 / 70%);
    margin-left: 0.25rem;
    font-family: 'Pretendard-Regular';

    &::placeholder {
      font-size: 1rem;
      font-family: 'Pretendard-Regular';
    }
  }
`;

type Props = {
  query: string;
  setQuery: Function;
  getBookList: Function;
};

const Search = ({ query, setQuery, getBookList }: Props) => {
  // onKeyDown 'Enter' 일때 검색 기능
  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query !== '') {
      event.preventDefault();
      getBookList({
        Query: query,
      });
    }
  };

  return (
    <SearchForm>
      <FiSearch size='1.5rem' />
      <input
        type='text'
        placeholder='책 제목 혹은 저자 입력 후 ENTER'
        onKeyDown={onSearch}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoFocus={true}
      />
    </SearchForm>
  );
};

export default Search;
