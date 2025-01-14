import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 4rem;
`;

export const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 3rem;
`;

export const InputBox = styled.div`
    width: 400px;
    margin-bottom: 25px;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: rgb(82, 62, 30);
`;

export const Input = styled.input`
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

export const ErrorMsg = styled.p`
    color: red;
    font-size: 12px;
    margin-top: 5px;
`;

export const SubmitButton = styled.button`
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