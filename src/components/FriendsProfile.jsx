import React from "react";
import styled from "styled-components";
import ic_dm from "../assets/ic_dm.png";
import ic_delete_member from "../assets/ic_delete_member.png"
import ic_plus from "../assets/ic_plus.png";

const Container = styled.div`
    width: 554px;
    height: 170px;
    margin-top: 10px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Img = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #d9d9d9;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 180px;
    height: 170px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #d9d9d9;
    width: 235px;
    height: 170px;
    justify-content: center;
    font-size: 20px;
`

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #d9d9d9;
    width: 139px;
    height: 170px;
`

const DMButton = styled.button`
    background-image: url(${ic_dm});
    background-size: cover;
    background-color: #d9d9d9;
    border: none;
    width: 40px;
    height: 40px;
    margin-right: 15px;
        
    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */
    
    &:hover {
        transform: scale(1.2); /* 클릭 시 버튼 크기 축소 */
    }

    &:active {
        transform: scale(0.90); /* 클릭 시 버튼 크기 축소 */
    }
`;

const RemoveFriendButton = styled.button`
    background-image: url(${ic_delete_member});
    background-size: cover;
    background-color: #d9d9d9;
    border: none;
    width: 40px;
    height: 40px;
        
    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */
    
    &:hover {
        transform: scale(1.2); /* 클릭 시 버튼 크기 축소 */
    }

    &:active {
        transform: scale(0.90); /* 클릭 시 버튼 크기 축소 */
    }
`;

export const Friend = (props) => {
    const { username, score, img } = props;

    return (
        <Container>
            <ContentContainer>
                <Img>
                    {img()}
                </Img>
                <Info>
                    <div>{username}</div>
                    <div>점수 : {score}</div>
                </Info>
                <Menu>
                    <DMButton></DMButton>
                    <RemoveFriendButton></RemoveFriendButton>
                </Menu>
            </ContentContainer>
        </Container>
    );
};

const SFContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
    height: 350px;
    border-radius: 10px;
    background-color: #d9d9d9;
`;

const SFInfo = styled.div`
    margin-top: 15px;
    font-size: 23px;
    margin-bottom: 6px;
`;

const PlusButton = styled.button`
    background-image: url(${ic_plus});
    background-size: cover;
    background-color: #808080;
    border-radius: 100%;
    border: none;
    width: 50px;
    height: 50px;
    margin-top: 20px;
        
    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */
    
    &:hover {
        transform: scale(1.2); /* 클릭 시 버튼 크기 축소 */
    }

    &:active {
        transform: scale(0.90); /* 클릭 시 버튼 크기 축소 */
    }
`;

export const SearchFriend = (props) => {
    const { img, username, score } = props;

    return (
        <SFContainer>
            <div>{img()}</div>
            <SFInfo>{username}</SFInfo>
            <div>점수 : {score}</div>
            <PlusButton></PlusButton>
        </SFContainer>
    );
};
