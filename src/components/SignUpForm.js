import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

function SignUpForm() {
    const {
        handleSubmit, // 폼 제출 시 실행 함수
        register, // 입력 필드를 react hook form에 등록 (검증 규칙 적용할 수 있도록 함)
        watch, // register를 통해 받은 모든 값 확인
        formState: { errors }, // input 값들의 에러 정보 가지는 객체
        reset,
    } = useForm();

    const password = useRef();
    password.current = watch("password"); // watch 로 password 필드값 가져온 뒤 password.current 에 값 넣어줌

    const onSubmit = (data) => {
        console.log("회원가입 정보", data);
        localStorage.setItem("user", JSON.stringify(data));
        alert("회원가입이 완료되었습니다.");
        reset();
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Title>회원가입</Title>

            <InputBox>
                <Label>Email</Label>
                <Input
                    type="email"
                    {...register("email", {
                        required: { value: true, message: "이메일을 입력해주세요." },
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: '이메일 형식이 올바르지 않습니다.',
                        },
                    })}
                />
            </InputBox>
            {errors?.email && <ErrorMsg>{errors?.email?.message}</ErrorMsg>}

            <InputBox>
                <Label>Password</Label>
                <Input
                    type="password"
                    {...register("password", {
                        required: { value: true, message: "비밀번호를 입력해주세요." },
                        minLength: {
                            value: 8,
                            message: "비밀번호 길이를 8자리 이상 입력해주세요.",
                        },
                    })}
                />
            </InputBox>
            {errors.password && <ErrorMsg>{errors?.password?.message}</ErrorMsg>}

            <InputBox>
                <Label>Password Confirm</Label>
                <Input 
                    type="password"
                    {...register("passwordConfirm", {
                        required: { value: true, message: "비밀번호 확인을 입력해주세요." },
                        validate: (value) => value === password.current,
                    })}
                />
            </InputBox>
            {errors?.passwordConfirm?.type === "required" && (
                <ErrorMsg>{errors?.passwordConfirm?.message}</ErrorMsg>
            )}
            {errors?.passwordConfirm?.type === "validate" && (
                <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>
            )}

            <InputBox>
                <Label>Nickname</Label>
                <Input 
                    type="text"
                    {...register("nickname", {
                        required: "닉네임을 입력해주세요.",
                        minLength: {
                            value: 2,
                            message: "닉네임은 최소 2자 이상이어야 합니다.",
                        },
                    })}
                />
            </InputBox>
            {errors.nickname && <ErrorMsg>{errors?.nickname?.message}</ErrorMsg>}
            
            <SubmitButton type="submit">회원가입</SubmitButton>
        </FormContainer>
    )

}

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 4rem;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 3rem;
`;

const InputBox = styled.div`
    width: 400px;
    margin-bottom: 25px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: rgb(82, 62, 30);
`;

const Input = styled.input`
    padding: 12px;
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    background: transparent;

    &:focus {
        border-color: #007BFF;
    }
`;

const ErrorMsg = styled.p`
    color: red;
    font-size: 12px;
    margin-top: 5px;
`;

const SubmitButton = styled.button`
    padding: 6px 15px;
    font-size: 12px;
    color: #574240;
    background: transparent;
    border: 1px solid #574240;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s;

    &:hover {
        background-color: rgb(66, 49, 48);
        color: #fff;
    }
`;

export default SignUpForm;