import React, { useState } from "react";
import styled from "styled-components";

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: inline-block;
  width: 100px;
  font-size: 16px;
  font-weight: 600;
`;

const Button = styled.input`
  width: ${(props) => (props.width ? props.width : "auto")};
  height: 40px;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  background-color: ${(props) =>
    props.value !== "취소" ? "#3498db" : "#e0e0e0"};
  color: ${(props) => (props.value !== "취소" ? "white" : "black")};
  margin-left: 15px;

  cursor: pointer;
`;

const RequiredInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 3px;
  font-size: 15px;
  padding: 0 10px;
  margin-bottom: 13px;

  border: ${(props) => (props.errors ? "1px solid red" : "1px solid gray")};

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #e0e0e0;
  }
`;

const Signiture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 110px;
  font-size: 15px;
  background-color: #f1f1f1;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 300px;
  height: 40px;
`;

const Bank = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsEdit(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsEdit(false);
  };

  return (
    <div>
      <h1>계좌 관리</h1>
      {isEdit ? (
        <FlexColumnDiv>
          <Label>은행명</Label>
          <RequiredInput placeholder="은행명" />
          <Label>예금주</Label>
          <RequiredInput placeholder="김철수" disabled />
          <Label>계좌번호</Label>
          <RequiredInput placeholder="'-'없이 숫자만 입력해주세요." />
          <Label>전자서명</Label>
          <Signiture>마우스로 서명하는 부분</Signiture>
          <ButtonWrapper>
            <Button
              type="button"
              value="취소"
              width="50px"
              onClick={handleCancel}
            />
            <Button type="button" value="수정" width="50px" />
          </ButtonWrapper>
        </FlexColumnDiv>
      ) : (
        <div>
          <div>
            <Label>은행명</Label>
            <span>카카오뱅크</span>
          </div>
          <div>
            <Label>예금주</Label>
            <span>김*수</span>
          </div>
          <div>
            <Label>계좌번호</Label>
            <span>3333***123456</span>
          </div>
          <div>
            <Label>전자서명</Label>
            <span>등록</span>
          </div>
          <Button
            type="button"
            value="수정하기"
            onClick={handleEdit}
            width="100px"
          />
        </div>
      )}
    </div>
  );
};

export default Bank;
