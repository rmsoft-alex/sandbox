import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

const ErrorMesage = styled.div`
  color: red;
`;

interface JoinDetail {
  email: string;
  email2: string;
  password: string;
  passwordCheck: string;
  nickName: string;
  address: string;
  collectionPrivacy: boolean;
  usePrivacy: boolean;
  advertisement: boolean;
}

const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinDetail>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const onSubmit: SubmitHandler<JoinDetail> = async (data) => {
    const res = await fetch("/api/signUp", {
      method: "POST",
      body: JSON.stringify({
        email: `${data.email}@${data.email2}`,
        password: data.password,
        nickName: data.nickName,
        address: data.address,
        collectionPrivacy: data.collectionPrivacy,
        usePrivacy: data.usePrivacy,
        advertisement: data.advertisement,
      }),
    }).then((res) => res.json());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>개인 정보 입력</h1>
      <label htmlFor="email">이메일</label>
      <div>
        <input
          id="email"
          type="text"
          {...register("email", { required: true })}
        />
        {errors.email && errors.email.type === "required" && (
          <ErrorMesage>이메일을 입력해 주세요!</ErrorMesage>
        )}
        @
        <input type="text" {...register("email2", { required: true })} />
        {errors.email2 && errors.email2.type === "required" && (
          <ErrorMesage>이메일을 입력해 주세요!</ErrorMesage>
        )}
      </div>
      <label htmlFor="password">비밀번호</label>
      <div>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: { value: true, message: "비밀번호를 확인 해주세요." },
            minLength: {
              value: 8,
              message: "최소 8자 이상의 비밀번호를 입력해주세요.",
            },
            maxLength: {
              value: 16,
              message: "16자 이하의 비밀번호만 사용가능합니다.",
            },
            pattern: {
              value: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
              message: "영문, 숫자, 특수문자를 혼용하여 입력해주세요.",
            },
          })}
        />
        {errors.password && (
          <ErrorMesage>{errors.password.message}</ErrorMesage>
        )}
      </div>
      <label htmlFor="passwordCheck">비밀번호 확인</label>
      <div>
        <input
          id="passwordCheck"
          type="password"
          {...register("passwordCheck", {
            required: true,
            validate: (passwordCheck) =>
              passwordCheck === passwordRef.current ||
              "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors.passwordCheck && (
          <ErrorMesage>{errors.passwordCheck.message}</ErrorMesage>
        )}
      </div>
      <label htmlFor="nickName">닉네임</label>
      <div>
        <input
          id="nickName"
          type="text"
          {...register("nickName", {
            required: { value: true, message: "닉네임을 입력해주세요." },
          })}
        />
        {errors.nickName && (
          <ErrorMesage>{errors.nickName.message}</ErrorMesage>
        )}
      </div>
      <label htmlFor="address">주소</label>
      <div>
        <input
          id="address"
          type="text"
          {...register("address", {
            required: { value: true, message: "주소를 입력해주세요." },
          })}
        />
        {errors.address && <ErrorMesage>{errors.address.message}</ErrorMesage>}
      </div>
      <div>
        <input
          id="usePrivacy"
          type="checkbox"
          {...register("usePrivacy", {
            required: {
              value: true,
              message: "개인정보활용 동의는 필수입니다.",
            },
          })}
        />
        개인정보활용 동의 (필수)
        <a href="#">보기</a>
      </div>
      {errors.usePrivacy && (
        <ErrorMesage>{errors.usePrivacy.message}</ErrorMesage>
      )}
      <div>
        <input
          id="collectionPrivacy"
          type="checkbox"
          {...register("collectionPrivacy", {
            required: {
              value: true,
              message: "개인정보수집 동의는 필수입니다.",
            },
          })}
        />
        개인정보수집 동의 (필수)
        <a href="#">보기</a>
      </div>
      {errors.collectionPrivacy && (
        <ErrorMesage>{errors.collectionPrivacy.message}</ErrorMesage>
      )}
      <div>
        <input
          id="advertisement"
          type="checkbox"
          {...register("advertisement", { required: false })}
        />
        광고 동의 (선택)
        <a href="#">보기</a>
      </div>
      <input type="submit" value="가입하기" />
    </form>
  );
};

export default Join;
