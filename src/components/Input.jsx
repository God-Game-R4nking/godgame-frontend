import React, { forwardRef, useState } from "react";
import styled from "styled-components";

const InputStyle = styled.input`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 4px solid black;
    font-size: 18px;
    &::placeholder {
        font-size: 13px;
}
`;

const Input = forwardRef((props, ref) => {
    const { width, height, type, onKeyDown, textAlign, placeholder } = props;

    return (
        <InputStyle
            ref={ref}
            type={type}
            width={width}
            height={height}
            textAlign={textAlign}
            placeholder={placeholder}
            onKeyDown={onKeyDown} />
    );
});

export default Input;