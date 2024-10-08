import React, { forwardRef, useState } from "react";
import styled from "styled-components";

const InputStyle = styled.input`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin-bottom: ${(props) => props.marginBottom};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${(props) => props.backgroundColor};
    border: ${(props) => props.border || "4px solid black"};
    font-size: 18px;
    &::placeholder {
        font-size: 13px;
}
`;

const Input = forwardRef((props, ref) => {
    const { width, height, marginBottom, borderRadius, border, backgroundColor, type, onKeyDown, min, max, maxLength, onChange, textAlign, placeholder, oninput, value} = props;

    return (
        <InputStyle
            ref={ref}
            type={type}
            width={width}
            height={height}
            marginBottom={marginBottom}
            border={border}
            borderRadius={borderRadius}
            backgroundColor={backgroundColor}
            textAlign={textAlign}
            maxLength={maxLength}
            placeholder={placeholder}
            value={value}
            min={min}
            max={max}
            onChange={onChange}
            oninput={oninput}
            onKeyDown={onKeyDown} />
    );
});

export default Input;