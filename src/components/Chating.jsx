import React from "react";
import styled from "styled-components";
import LayoutStyle from "./LayoutStyle";
import Input from "./Input";
import Button from "./Button";

export const ScrollDiv = styled.div`
    overflow-y: auto;
    margin: 10px;
    margin-right: 10px;
    border: solid 5px #D9D9D9;
    border-radius: 10px;
    width: 500px;
    display: flex; /* Flexbox 사용 */
    flex-direction: column-reverse;
    align-items: center;
    background-color: #FFFFFF;
    &::-webkit-scrollbar {
        height: 15px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ccc;
    }
`;

const Chating = (props) => {
    return (
        <ScrollDiv>
            <Input
                width={"310px"}
                height={"45px"}
                marginBottom={"5px"}
                borderRadius={"10px"}
                backgroundColor={"#808080"}
                border={"none"}
                paddingLeft={"10px"}
            ></Input>
            <LayoutStyle
                position={"relative"}
                left={"120px"}
                top={"39px"}
            >
                <Button
                    style={"gray"}
                    width={"70px"}
                    height={"30px"}
                    borderRadius={"10px"}
                >
                    SEND</Button>
            </LayoutStyle>
        </ScrollDiv>
    );
};

export default Chating;