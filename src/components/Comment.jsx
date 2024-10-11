import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import sendCommentPatchRequest from "../services/PatchComment";
import deleteCommentRequest from "../services/DeleteComment";

const Container = styled.div`
    background-color: #d9d9d9;
    width: 1125px;
    height: 100%;
    padding: 10px;
    margin-top: 5px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Author = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    align-items: center;
`

const DateTime = styled.div`
    margin-left: 10px;
    font-size: 15px;
`

const Content = styled.div`
    font-size: 18px;
    margin-top: 10px;
    min-width: min-content;
    max-width: max-content;
    background-color: #d9d9d9;
    word-wrap: break-word; 
`;

const TextArea = styled.textarea`
    font-size: 18px;
    margin-top: 10px;
    width: 1110px;
    height: 100px;
    background-color: #d9d9d9;
    border: 1px solid black;
    resize: none;
`;

const Comment = (props) => {
    const { author, dateTime, children, memberId, commentMemberId, commentId } = props;
    const [edit, setEdit] = useState(false);
    const ref = useRef(null);

    const handleEdit = () => {
        setEdit(true);
    }

    const handleEditRequest = async () => {
        setEdit(false);
        const commentContent = ref.current.value;
        const response = await sendCommentPatchRequest(commentId, commentContent);
        if (response.status === 200) {
            alert("댓글수정이 완료되었습니다.");
            props.setNewComment(response);
        }
    }

    const handleDelete = async () => {
        const response = await deleteCommentRequest(props.commentId);
        if (response.status === 204) {
            alert("댓글 삭제가 완료되었습니다.");
            props.setNewComment(response);
        }
    }

    return (
        <Container>
            <Info>
                <Author>{author}&nbsp;<DateTime>{dateTime}</DateTime></Author>
                <div>
                    {edit ?
                        <Button
                            width={"70px"}
                            height={"35px"}
                            fontSize={"18px"}
                            marginRight={"5px"}
                            display={memberId === commentMemberId ? "visable" : "none"}
                            onClick={handleEditRequest}
                        >
                            등록
                        </Button>
                        :
                        <Button
                            width={"70px"}
                            height={"35px"}
                            fontSize={"18px"}
                            marginRight={"5px"}
                            display={memberId === commentMemberId ? "visable" : "none"}
                            onClick={handleEdit}
                        >
                            수정
                        </Button>}
                    <Button
                        width={"70px"}
                        height={"35px"}
                        backgroundColor={"black"}
                        color={"white"}
                        fontSize={"18px"}
                        marginRight={"5px"}
                        display={memberId === commentMemberId ? "visable" : "none"}
                        onClick={handleDelete}
                    >
                        삭제
                    </Button>
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
                </div>
            </Info>
            {edit ? <TextArea
                defaultValue={children}
                ref={ref}
            ></TextArea> : <Content>&nbsp;{children}</Content>}
        </Container>
    );
}

export default Comment;