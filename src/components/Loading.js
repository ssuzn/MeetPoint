import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import spinner from '../assets/spinner.gif';

export const Loading = () => {
    const { isLoading, message } = useSelector((state) => state.loading);

    if (!isLoading) return null;

    return (
        <Background>
            <NoticeSection>
                { message }
            </NoticeSection>

            <img src={spinner} alt="loading..." />
        </Background>
    );
};

export default Loading;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const NoticeSection = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
    font-weight: bold;
    background-color: transparent;
`;