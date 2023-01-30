import styled from "styled-components";
import { useRouter } from "next/router";
import React from "react";

const SubmitInput = styled.input`
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  text-align: center;
  background-color: #3498db;
  color: white;

  cursor: pointer;
`;

const Done = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    router.push("/login");
  };

  return (
    <div>
      <h3>회원 가입이 완료되었습니다.</h3>
      <SubmitInput type="button" value="로그인" onClick={handleClick} />
    </div>
  );
};

export default Done;
