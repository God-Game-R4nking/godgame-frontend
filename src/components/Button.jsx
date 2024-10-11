import React, { forwardRef } from "react";
import styled from "styled-components";

const ButtonStyleGray = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: ${(props) => props.border || "1px solid black"};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${(props) => props.backgroundColor || 'rgb(198, 198, 198)'};
    font-family: Pixel;
    font-size: ${(props) => props.fontSize || '22px'};
    margin-right: ${(props) => props.marginRight};
    display: ${(props) => props.display};

    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */

    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

const ButtonStyleDefault = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: ${(props) => props.border || "1px solid black"};
    border-radius: ${(props) => props.borderRadius};
    background-color: ${(props) => props.backgroundColor || 'rgb(198, 198, 198)'};
    font-family: Pixel;
    font-size: ${(props) => props.fontSize || '22px'};
    color: ${(props) => props.color};
    margin-right: ${(props) => props.marginRight};
    display: ${(props) => props.display};
    
    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */
    
    &:hover {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
    }

    &:active {
        transform: scale(0.90); /* 클릭 시 버튼 크기 축소 */
    }
`;

const ButtonStylePass = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: ${(props) => props.border || "1px solid black"};
    border-radius: ${(props) => props.borderRadius};
    background-color: rgb(236, 99, 99);
    font-family: Pixel;
    font-size: ${(props) => props.fontSize || '22px'};

    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */

    &:hover {
        background-color: rgb(248, 120, 120); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(235, 44, 44); /* 클릭 시 색상 변경 */
    }
`;

const Button = forwardRef((props, ref) => {
    const { style, tabIndex, width, height, display, onClick, onKeyDown, marginRight, children, border, color, backgroundColor, borderRadius, fontSize } = props;

    switch (style) {
        case 'gray': {
            return (
                <ButtonStyleGray
                    ref={ref}
                    tabIndex={tabIndex}
                    width={width}
                    height={height}
                    onClick={onClick}
                    border={border}
                    borderRadius={borderRadius}
                    fontSize={fontSize}
                    onKeyDown={onKeyDown}
                    backgroundColor={backgroundColor}
                    color={color}
                    display={display}
                >
                    {children}
                </ButtonStyleGray>
            );
        }

        case 'pass': {
            return (
                <ButtonStylePass
                    ref={ref}
                    tabIndex={tabIndex}
                    width={width}
                    height={height}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                >
                    {children}
                </ButtonStylePass>
            );
        }

        default:
            return (
                <ButtonStyleDefault
                    ref={ref}
                    tabIndex={tabIndex}
                    width={width}
                    height={height}
                    onClick={onClick}
                    border={border}
                    borderRadius={borderRadius}
                    fontSize={fontSize}
                    onKeyDown={onKeyDown}
                    backgroundColor={backgroundColor}
                    color={color}
                    display={display}
                    marginRight={marginRight}
                >
                    {children}
                </ButtonStyleDefault>
            );
    }
});

export default Button;
