import React from "react";
import styled from "styled-components";

export const ColorText = ({ color, children }) => {
    const TextStyle = {
        color: color,
    };

    return <span style={TextStyle}>{children}</span>;
}

export const Title = styled.h1`
    font-size: 50px;
    margin: 0;
    `;

export const SubTitle = styled.h2`
    font-size: 35px;
    margin: 0;
`;

export const Content = styled.p`
    font-size: 25px;
    text-align: start;
    margin: 0;
`;

export const Content2 = styled.p`
    font-size: 20px;
    text-align: start;
    margin: 0;
`;

export const ValidationText = styled.p`
    font-size: 15px;
    text-align: start;
    color: red;
    margin: 0;
`;

export const Presskey = styled.p`
    font-size: 30px;
    animation: blink 1.5s infinite;
    margin: 5px;

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
`;