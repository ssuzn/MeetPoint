import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import * as S from "./styles/FormStyles";

function SignUpForm() {
    const {
        handleSubmit, // 폼 제출 시 실행 함수
        register, // 입력 필드를 react hook form에 등록 (검증 규칙 적용할 수 있도록 함)
        watch, // register를 통해 받은 모든 값 확인
        formState: { errors }, // input 값들의 에러 정보 가지는 객체
    } = useForm();

    const password = useRef();
    password.current = watch("password"); // watch 로 password 필드값 가져온 뒤 password.current 에 값 넣어줌

    const onSubmit = (data) => {
        console.log("회원가입 정보", data);
        localStorage.setItem("user", JSON.stringify(data));
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/login";
    };

    return (
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.Title>회원가입</S.Title>

            <S.InputBox>
                <S.Label>Email</S.Label>
                <S.Input
                    type="email"
                    {...register("email", {
                        required: { value: true, message: "이메일을 입력해주세요." },
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: '이메일 형식이 올바르지 않습니다.',
                        },
                    })}
                />
            </S.InputBox>
            {errors?.email && <S.ErrorMsg>{errors?.email?.message}</S.ErrorMsg>}

            <S.InputBox>
                <S.Label>Password</S.Label>
                <S.Input
                    type="password"
                    {...register("password", {
                        required: { value: true, message: "비밀번호를 입력해주세요." },
                        minLength: {
                            value: 8,
                            message: "비밀번호 길이를 8자리 이상 입력해주세요.",
                        },
                    })}
                />
            </S.InputBox>
            {errors.password && <S.ErrorMsg>{errors?.password?.message}</S.ErrorMsg>}

            <S.InputBox>
                <S.Label>Password Confirm</S.Label>
                <S.Input 
                    type="password"
                    {...register("passwordConfirm", {
                        required: { value: true, message: "비밀번호 확인을 입력해주세요." },
                        validate: (value) => value === password.current,
                    })}
                />
            </S.InputBox>
            {errors?.passwordConfirm?.type === "required" && (
                <S.ErrorMsg>{errors?.passwordConfirm?.message}</S.ErrorMsg>
            )}
            {errors?.passwordConfirm?.type === "validate" && (
                <S.ErrorMsg>비밀번호가 일치하지 않습니다.</S.ErrorMsg>
            )}

            <S.InputBox>
                <S.Label>Nickname</S.Label>
                <S.Input 
                    type="text"
                    {...register("nickname", {
                        required: "닉네임을 입력해주세요.",
                        minLength: {
                            value: 2,
                            message: "닉네임은 최소 2자 이상이어야 합니다.",
                        },
                    })}
                />
            </S.InputBox>
            {errors.nickname && <S.ErrorMsg>{errors?.nickname?.message}</S.ErrorMsg>}
            
            <S.SubmitButton type="submit">회원가입</S.SubmitButton>
        </S.FormContainer>
    )
}

export default SignUpForm;