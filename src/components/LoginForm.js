import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as S from "./styles/FormStyles";
import { loginSuccess } from '../redux/userSlice';

function LoginForm() {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: {errors },
    } = useForm();

    const onSubmit = (data) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            alert("가입된 계정이 없습니다. 회원가입을 진행해주세요.");
            window.location.href = "/signup";
        }

        if (storedUser.email === data.email && storedUser.password === data.password) {
            dispatch(
                loginSuccess({
                    email: storedUser.email,
                    nickname: storedUser.nickname,
                })
            );

            alert(`${storedUser.nickname} 님, 반갑습니다.`);
            window.location.href = "/";
        } else {
            alert("이메일 또는 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
                <S.Title>로그인</S.Title>

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
                        })}
                    />
                </S.InputBox>
                {errors.password && <S.ErrorMsg>{errors?.password?.message}</S.ErrorMsg>}
                
                <S.SubmitButton type="submit">로그인</S.SubmitButton>
            </S.FormContainer>
    )
}

export default LoginForm;
