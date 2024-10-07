import React, { forwardRef } from "react";
import styled from "styled-components";

const ButtonStyleGray = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 1px solid black;
    background-color: rgb(198, 198, 198);
    font-family: Pixel;
    font-size: 22px;

    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */

    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

const ButtonStylePass = styled.button`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 1px solid black;
    background-color: rgb(236, 99, 99);
    font-family: Pixel;
    font-size: 22px;

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
    const { style, tabIndex, width, height, onClick, onKeyDown, children } = props;

    switch (style) {
        case 'gray': {
            return (
                <ButtonStyleGray
                    ref={ref}
                    tabIndex={tabIndex}
                    width={width}
                    height={height}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
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
    }
});

export default Button;
