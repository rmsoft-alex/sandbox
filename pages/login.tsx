import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import rm from "../public/images/rm.png";

const RequiredInput = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 3px;
  font-size: 15px;
  padding: 0 10px;

  border: ${(props) => (props.errors ? "1px solid red" : "1px solid gray")};

  &:focus {
    outline: none;
  }
`;

const BlackDiv = styled.div`
  width: 300px;
  height: 140px;
  background-color: #eb6400;
`;

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

const ErrorMesage = styled.div`
  color: red;
`;

interface LoginInfo {
  id: string;
  pw: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();

  const handleLogin: SubmitHandler<LoginInfo> = (data) => {
    fetch("api/signIn", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.result));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <h1>로그인</h1>
        <BlackDiv>
          <Image alt="logo" src={rm} width={300} height={140} />
        </BlackDiv>
        <label htmlFor="id">아이디</label>
        <div>
          <RequiredInput
            id="id"
            type="text"
            placeholder="아이디를 입력해주세요."
            {...register("id", {
              required: { value: true, message: "필수 항목입니다." },
            })}
            errors={errors.id}
          />
          {errors.id && <ErrorMesage>{errors.id.message}</ErrorMesage>}
        </div>
        <label htmlFor="pw">비밀번호</label>
        <div>
          <RequiredInput
            id="pw"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("pw", {
              required: { value: true, message: "필수 항목입니다." },
            })}
            errors={errors.pw}
          />
          {errors.pw && <ErrorMesage>{errors.pw.message}</ErrorMesage>}
        </div>
        <div>
          <input type="checkbox" />
          <span> 아이디 저장</span>
        </div>
        <SubmitInput type="submit" value="로그인" />
      </form>
      <div>
        <Link href="/wrkr/join">회원가입</Link>
      </div>
      <div>
        <a href="#">아이디 찾기</a>
        <a href="#">비밀번호 찾기</a>
      </div>
    </div>
  );
};

export default Login;
