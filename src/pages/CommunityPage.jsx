import React from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import ic_search from "../assets/ic_search.png";
import { Friend, SearchFriend } from "../components/FriendsProfile";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const FriendListContainer = styled.div`
    width: 50%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height: 100%;
    padding: 20px;
    overflow-x: hidden;
    background-color: white;
    overflow-y: auto;
`;

const Search = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    font-size: 25px;
    width: 100%;
    margin-bottom: 40px;
`;

const SearchDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 43px;
`;

const SearchInput = styled.input`
     width: 260px;
     height: 17px;
     border-top: solid black 2px;
     border-bottom: solid black 2px;
     border-left: solid black 2px;
     border-right: none;
     padding: 10px;
     font-size: 18px;
`;

const SearchButton = styled.button`
    background-image: url(${ic_search});
    background-size: cover;
    background-color: white;
    border-top: solid black 2px;
    border-bottom: solid black 2px;
    border-left: none;
    border-right: solid black 2px;
    width: 41px;
    height: 41px;

    &:hover {
        background-color: rgb(227, 227, 227); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;

const Img = styled.div`
    background-color: #808080;
    width: 130px;
    height: 130px;
`;

const CommunityPage = () => {
    const Image = () => {
        return (
            <Img></Img>
        )
    }
    return (
        <HomeUI category={"친구 목록"}>
            <Container>
                <FriendListContainer>
                    <Friend username={"노영준나잘함"} score={"1점"} img={Image}></Friend>
                    <Friend username={"노영준나잘함"} score={"1점"} img={Image}></Friend>
                    <Friend username={"노영준나잘함"} score={"1점"} img={Image}></Friend>
                    <Friend username={"노영준나잘함"} score={"1점"} img={Image}></Friend>
                    <Friend username={"노영준나잘함"} score={"1점"} img={Image}></Friend>
                </FriendListContainer>
                <SearchContainer>
                    <Search>
                        <SearchButton />
                        <SearchInput></SearchInput>
                        <SearchDiv>&nbsp;친구 검색&nbsp;</SearchDiv>
                    </Search>
                    <SearchFriend img={Image} username={"노영준"} score={"3점"}></SearchFriend>
                </SearchContainer>
            </Container>
        </HomeUI>
    );
}

export default CommunityPage;