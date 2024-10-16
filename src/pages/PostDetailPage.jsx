import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import HomeUI from "../components/HomeUI";
import Button from "../components/Button";
import Comment from "../components/Comment";
import getBoardRequest from "../services/GetBoard";
import getCommentsRequest from "../services/GetComments";
import postComment from "../services/PostComment";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "../utils/LocalStorageManager";
import deleteBoardRequest from "../services/DeleteBoard";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: white;
    overflow-y: auto;
    flex: 1; /* 가용 공간을 다 차지하게 함 */
    overflow-x: hidden;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding : 20px;
    height: 100%;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 97%;
    position: relative;
    top: 15px;
`;

const PostInfo = styled.div`
    height: 40px;
    width: 1144px;
    display: flex;
    flex-direction: row;
`;

const Element = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #d9d9d9;
    width: 100px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    border: solid 1px black;
`;

const ElTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    font-size: 20px;
    width: 1045px;
    height: 20px;
    border-bottom: solid 1px black;
    border-right: solid 1px black;
    border-top: solid 1px black;
    padding: 10px;
`;

const ElBotTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    width: 265px;
    height: 20px;
    border-bottom: solid 1px black;
    border-right: solid 1px black;
    border-top: solid 1px black;
    padding: 10px;
`;

const ElBotTitleRmBorder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    font-size: 20px;
    width: 265px;
    height: 20px;
    border-bottom: solid 1px black;
    border-top: solid 1px black;
    padding: 10px;
`;

const Content = styled.div`
    flex-shrink: 0;
    font-size: 20px;
    margin-top: 10px;
    padding: 10px;
    height: 330px;
    width: 1123px;
    border: solid 1px black;
    overflow-y: auto;
    overflow-x: hidden;
    word-wrap: break-word;
`;

const ElComment = styled.div`
    display: flex;
    background-color: #d9d9d9;
    width: 1113px;
    height: 50px;
    font-size: 20px;
    padding: 15px;
    border: solid 1px black;
    margin-top: 10px;
`;

const CommentContainer = styled.div`
    margin-top: 10px;
`;

const CommentTitle = styled.div`
    color: white;
    padding: 10px;
    background-color: black;
    width: 1123px;
    border: solid 1px black;
    height: 20px;
    table-layout: fixed;
    font-size: 20px;
`;

const CommentTextArea = styled.textarea`
    width: 1123px;
    font-size: 20px;
    height: 100px;
    padding: 10px;
    resize: none;
    overflow: hidden;
    border: solid 1px black;
    table-layout: fixed;
`;

const CommentSubmitButton = styled.button`
    width: 80px;
    height: 30px;
    font-size: 15px;
    text-align: center;
    background-color: #d9d9d9;
    border: solid 1px black;
    position: relative;
    left: 1059px;
    bottom: 40px;

    transition: background-color 0.3s, transform 0.1s; /* 애니메이션 효과 추가 */

    &:hover {
        background-color: rgb(160, 160, 160); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
    
`;

const NoneComment = styled.div`
    padding: 10px;
`;

const BottomContent = styled.div`
    display: flex;
    flex-direction: row;
    height: 10.03%;
    align-items: center;
    justify-content: center;
    margin: 20px;
    background-color: white;
`;

const DirectionButton = styled.button`
    border: none;
    width: 50px;
    height: 40px;
    background-color: #d9d9d9;
    font-size: 35px;
    font-family: "Goblin One", serif;
    font-weight: 400;
    font-style: normal;

    &:hover {
        background-color: rgb(227, 227, 227); /* 호버 시 색상 변경 */
    }

    &:active {
        transform: scale(0.95); /* 클릭 시 버튼 크기 축소 */
        background-color: rgb(140, 140, 140); /* 클릭 시 색상 변경 */
    }
`;
const IndexText = styled.div`
    font-size: 30p;
    font-family: "Goblin One", serif;
    font-weight: 400;
    font-style: normal;
    margin: 15px;
`;

const PixelFont = styled.div`
    font-family: Pixel;
`;

const PostDetailPage = () => {
    const navigate = useNavigate();
    const commentRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const commentTitleRef = useRef(null);
    const [postResponse, setPostResponse] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const { id } = useParams();
    const [index, setIndex] = useState(1);
    const [pageInfo, setPageInfo] = useState({});
    const [maxIndex, setMaxIndex] = useState(1);

    const data = JSON.parse(getLocalStorage('member'));
    const memberData = JSON.parse(data);

    const getBoard = async () => {
        const response = await getBoardRequest(id, 1, 10);
        if (response.status === 404) {
            navigate('/exception/404');
        }
        setPostResponse(response.data);
    };

    const getComments = async (index) => {
        const response = await getCommentsRequest(id, index ? index : 1, 10);
        setComments(response.data.data);
        setPageInfo(response.data.pageInfo);
        setMaxIndex(pageInfo.totalPages);
    };

    useEffect(() => {
        getBoard();
        getComments();
    }, []);

    useEffect(() => {
        getComments(index);
    }, [index]);

    useEffect(() => {
        getComments();
        getBoard();
        setIndex(1);
        scrollContainerRef.current.scrollTo({
            top: commentTitleRef.scrollTop - 1000, // 현재 스크롤 위치에서 100px 위로
            behavior: 'smooth' // 부드럽게 스크롤
        });
    }, [newComment]);

    const handleComment = async () => {
        const commentString = commentRef.current.value;

        const postResponse = await postComment(commentString, id, memberData.data.memberId);
        if (postResponse.status === 201) {
            alert("댓글 등록이 완료되었습니다.")
            setNewComment(postResponse);
            commentRef.current.value = '';
        }
    };

    const handleEdit = async () => {
        const title = postResponse.title;
        const content = postResponse.content;
        const memberId = postResponse.memberId;
        const currentMemberId = memberData.data.memberId;
        const boardId = id;

        if (memberId === currentMemberId) {
            navigate("/board/edit", { state: { title, content, boardId } });
        } else alert("올바른 접근이 아닙니다.")
    };

    const handleDelete = async () => {
        const response = await deleteBoardRequest(id);
        if (response.status === 204) alert('게시물 삭제가 완료되었습니다.')
        if (response.status === 404) {
            navigate('/exception/404');
        }
    };

    const handleDisplayButton = () => {
        const memberId = postResponse.memberId;
        const currentMemberId = memberData.data.memberId;
        if (memberId !== currentMemberId) {
            return "none";
        }
    };

    const Index = () => {
        return (
            <BottomContent>
                <DirectionButton onClick={handleLeft}>{"<"}</DirectionButton>
                <IndexText><PixelFont>{index}</PixelFont></IndexText>
                <DirectionButton onClick={handleRight}>{">"}</DirectionButton>
            </BottomContent>
        );
    }

    const handleLeft = async () => {
        if (index === 1) {
            setIndex(1);
        } else {
            setIndex(index - 1);
        }
    };

    const handleRight = () => {
        if (index === maxIndex) {
            setIndex(index);
        } else {
            setIndex(index + 1);
        }
    };

    return (
        <HomeUI category={"게시물 보기"}>
            <Container ref={scrollContainerRef}>
                <ButtonsContainer>
                    <Button
                        width={"70px"}
                        height={"35px"}
                        backgroundColor={"#828282"}
                        color={"white"}
                        fontSize={"18px"}
                        marginRight={"5px"}
                        onClick={() => alert("준비중...")}
                    >
                        신고
                    </Button>
                    <Button
                        width={"70px"}
                        height={"35px"}
                        backgroundColor={"black"}
                        color={"white"}
                        fontSize={"18px"}
                        marginRight={"5px"}
                        onClick={handleDelete}
                        display={handleDisplayButton}
                    >
                        삭제
                    </Button>
                    <Button
                        width={"70px"}
                        height={"35px"}
                        fontSize={"18px"}
                        marginRight={"5px"}
                        onClick={handleEdit}
                        display={handleDisplayButton}
                    >
                        수정
                    </Button>
                </ButtonsContainer>
                <ContentContainer>
                    <PostInfo>
                        <Element>제목</Element>
                        <ElTitle>{postResponse?.title}</ElTitle>
                    </PostInfo>
                    <PostInfo>
                        <Element>작성자</Element>
                        <ElBotTitleRmBorder>{postResponse?.nickName}</ElBotTitleRmBorder>
                        <Element>등록일</Element>
                        <ElBotTitleRmBorder>{postResponse?.createdAt}</ElBotTitleRmBorder>
                        <Element>조회수</Element>
                        <ElBotTitle>{postResponse?.viewCount}</ElBotTitle>
                    </PostInfo>
                    <Content>{postResponse?.content}</Content>
                    <ElComment>
                        &nbsp;&nbsp;댓글 {postResponse?.commentCount}
                    </ElComment>
                    {comments.length > 0 ? (
                        comments.map((data) => (
                            <Comment
                                author={data.nickName}
                                dateTime={data.createdAt}
                                views={data.viewCount}
                                memberId={memberData.data.memberId}
                                commentMemberId={data.memberId}
                                commentId={data.commentId}
                                setNewComment={setNewComment}
                            >
                                {data.commentContent}</Comment>
                        ))) : (
                        <NoneComment>댓글이 없습니다.</NoneComment>
                    )}
                    <CommentContainer>
                        <Index></Index>
                        <CommentTitle
                            ref={commentTitleRef}
                        >댓글 등록</CommentTitle>
                        <CommentTextArea
                            ref={commentRef}
                        />
                        <CommentSubmitButton
                            onClick={handleComment}
                        >등록</CommentSubmitButton>
                    </CommentContainer>
                </ContentContainer>
            </Container>
        </HomeUI>
    );
}

export default PostDetailPage;