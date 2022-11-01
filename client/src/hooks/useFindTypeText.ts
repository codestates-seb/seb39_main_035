import { useState, useEffect } from 'react';

const useFindTypeText = (type: string) => {
  const [typeText, setTypeText] = useState('');

  useEffect(() => {
    const memoTypeList = [
      { typeValue: 'BOOK_CONTENT', typeText: '책 속 문장' },
      { typeValue: 'SUMMARY', typeText: '책 내용 요약' },
      { typeValue: 'THOUGHT', typeText: '나만의 생각' },
      { typeValue: 'QUESTION', typeText: '나만의 질문' },
    ];
    const obj = memoTypeList.find((it) => it.typeValue === type);
    if (obj) {
      setTypeText(obj.typeText);
    }
  }, [type]);
  return { typeText };
};

export default useFindTypeText;
