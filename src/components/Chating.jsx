import React from "react";
import styled from "styled-components";
import LayoutStyle from "./LayoutStyle";
import Input from "./Input";

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

const Chat = styled.input`
    width: 320px;
    height: 30px;
    margin-bottom: 5px;
    border-radius: 10px;
    background-color: #808080;
`;

const Chating = (props) => {
    return (
        <ScrollDiv>
            <Input
                width={"320px"}
                height={"35px"}
                marginBottom={"5px"}
                borderRadius={"10px"}
                backgroundColor={"#808080"}
                border={"none"}
            ></Input>
        </ScrollDiv>
    );
};

export default Chating;