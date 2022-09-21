import Button from './Button';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  flex: row;
  align-items: center;
  margin-bottom: 20px;
  input {
    flex-grow: 1;
    height: 40px;
    padding: 10px;
    font-size: 18px;
    margin-right: 20px;
    border-radius: 10px;
    border: 1px solid var(--scandal);
  }
`;

const SearchBar = () => {
  return (
    <Wrapper>
      <input type='text' />
      <Button color='mint'>검색</Button>
    </Wrapper>
  );
};

export default SearchBar;
