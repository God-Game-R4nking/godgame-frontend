// 화면 컴포넌트
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StartDisplay from './StartDisplay';
import Button from './Button';
import Input from './Input';
import BirthDaySelect from './BirthDaySelect';
import { valifySignIn, valifySignUp, valifyChangePassword } from '../utils/Validation';
import { useNavigate } from 'react-router-dom';
import {Title, ColorText, SubTitle, Content, Content2, Presskey} from '../components/Texts';

export const ModeStyle = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ModeStyle2 = styled.div`
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

export const Form = styled.div`
    justify-content: left;
    text-align: left;
`

const Margin = ({ value }) => {
    const DivStyle = {
        margin: value,
    };

    return <div style={DivStyle} />
}

const SelectMode = ({ mode }) => {
    const Select = () => {
        switch (mode) {
            case 0:
                return <div>
                    <Content>●&nbsp;</Content>
                    <Content>&nbsp;</Content>
                    <Content>&nbsp;</Content>
                </div>
            case 1:
                return <div>
                    <Content>&nbsp;</Content>
                    <Content>●&nbsp;</Content>
                    <Content>&nbsp;</Content>
                </div>
            case 2:
                return <div>
                    <Content>&nbsp;</Content>
                    <Content>&nbsp;</Content>
                    <Content>●&nbsp;</Content>
                </div>
        }
    }

    return <ModeStyle>
        <Select />
        <div>
            <Content>Sign in</Content>
            <Content>Sign up</Content>
            <Content>Find Password</Content>
        </div>
    </ModeStyle>
}

// 메인 컴포넌트
const Scene = ({ scene, mode, setScene, gameboyRef }) => {
    const signInRefs = [useRef(null), useRef(null)];
    const signUpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const findPasswordRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const changePasswordRefs = [useRef(null), useRef(null)];
    const passButton = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (scene === 2 && signInRefs[0]?.current) {
            signInRefs[0].current.focus();
        }

        if (scene === 3.2 && passButton?.current) {
            passButton.current.focus();
        }

        if (scene === 3.3 && signUpRefs[0]?.current) {
            signUpRefs[0].current.focus();
        }

        if (scene === 4 && findPasswordRefs[0]?.current) {
            findPasswordRefs[0].current.focus();
        }

        if (scene === 4.1 && changePasswordRefs[0]?.current) {
            changePasswordRefs[0].current.focus();
        }

    }, [scene]);

    const handleSignIn = () => {
        const id = signInRefs[0].current.value; // ID 값 가져오기
        const password = signInRefs[1].current.value; // 비밀번호 값 가져오기

        console.log("로그인 시도:", { id, password })
        let result = valifySignIn(id, password) ? true : false;

        // TODO : 로그인 비즈니스 로직 구현
        if (result) {
            navigate("/loading");
        }
    };

    const handleSignUp = () => {
        const id = signUpRefs[0].current.value;
        const password = signUpRefs[1].current.value;
        const reEnterPassword = signUpRefs[2].current.value;
        const nickname = signUpRefs[3].current.value;

        let result = valifySignUp(id, password, reEnterPassword, nickname, signUpRefs) ? true : false;

        if (result) {
            console.log("회원가입 시도", { id, password, nickname });
            setScene(3.4)
            gameboyRef.current.focus();
            // TODO : 회원가입 비즈니스 로직 구현
        }
    }

    const handleFindPassword = () => {
        const name = findPasswordRefs[0].current.value;
        const phoneNumber = findPasswordRefs[1].current.value;
        const year = findPasswordRefs[2].current.value;
        const month = findPasswordRefs[3].current.value;
        const day = findPasswordRefs[4].current.value;

        // TODO : 패스워드 찾기 비즈니스 로직 구현, 성공시 result 값 변경하여 다음 프로세스로

        console.log("패스워드 찾기\n" + "이름 : " + name +
            " 폰넘버 : " + phoneNumber + "생년월일 : " + year + month + day);
        let result = true;

        if (result) {
            setScene(4.1);
        }
    }

    const handleChangePassword = () => {
        const password = changePasswordRefs[0].current.value;
        const reEnterPassword = changePasswordRefs[1].current.value;

        // TODO : 패스워드 찾기 비즈니스 로직 구현, 성공시 result 값 변경하여 다음 프로세스로

        console.log("패스워드 변경\n" + "패스워드 : " + password +
            " reEnterPassword : " + reEnterPassword);
        let result = valifyChangePassword(password, reEnterPassword, changePasswordRefs) ? true : false;

        if (result) {
            setScene(1);
        }
    }

    const handlePassAuth = () => {
        console.log("패스 인증 시도");
        // TODO : 패스 인증 비즈니스 로직 구현
        let result = true;

        if (result) {
            setScene(3.3);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSignIn(); // 마지막 입력란에서 Enter 키를 누르면 로그인 처리
        }
    };

    switch (scene) {
        // 첫 화면
        case 0:
            return <StartDisplay>
                <Title><ColorText color={"red"}>GOD</ColorText> GAME</Title>
                <Presskey>Press <ColorText color="yellow">Enter</ColorText> Key</Presskey>
            </StartDisplay>
        // 로그인, 회원가입, 비밀번호 찾기 화면
        case 1:
            return <StartDisplay>
                <div>
                    <SubTitle>Welcome to</SubTitle>
                    <Title><ColorText color={"red"}>GOD</ColorText> GAME</Title>
                    <Margin value={10} />
                    <SelectMode mode={mode} />
                </div>
            </StartDisplay>
        // 로그인
        case 2:
            return (
                <StartDisplay mode={"findpassword"}>
                    <ModeStyle2>
                        <SubTitle>Sign in</SubTitle>
                        <Margin value={15} />
                        <Content>ID</Content>
                        <Input
                            width={"250px"}
                            height={"30px"}
                            type={"text"}
                            ref={signInRefs[0]}
                        />
                        <Margin value={5} />
                        <Margin value={15} />
                        <Content>Password</Content>
                        <Input
                            type="password"
                            width={"250px"}
                            height={"30px"}
                            ref={signInRefs[1]}
                            onKeyDown={handleKeyDown}
                        />
                        <Margin value={25} />
                        <Button
                            style={"gray"}
                            width={"255px"}
                            height={"40px"}
                            onClick={handleSignIn}
                            onKeyDown={handleSignIn}
                        >Sign in</Button>
                    </ModeStyle2>
                </StartDisplay>
            );
        // 회원가입
        case 3:
            return <StartDisplay>
                <div>
                    <SubTitle><ColorText color={"green"}>Welcome to</ColorText></SubTitle>
                    <Title><ColorText color={"red"}>GOD</ColorText> GAME</Title>
                    <Title><ColorText color={"yellow"}>Membership</ColorText></Title>
                    <Margin value={10} />
                    <Content>{"next : → Key"}</Content>
                    <Content>{"prev : ← Key"}</Content>
                </div>
            </StartDisplay>
        // 회원가입 - 약관
        case 3.1:
            return <StartDisplay>
                <div>
                    <SubTitle>약관</SubTitle>
                </div>
            </StartDisplay>
        // 회원가입 - 본인인증
        case 3.2:
            return <StartDisplay>
                <Button
                    ref={passButton}
                    tabIndex={0}
                    style={"pass"}
                    width={"205px"}
                    height={"50px"}
                    onClick={handlePassAuth}
                >
                    PASS 본인인증하기</Button>
            </StartDisplay>
        // 회원가입 - 정보 입력
        case 3.3:
            return <StartDisplay mode={"signup"}>
                <SubTitle>Sign up</SubTitle>
                <Margin value={15}></Margin>
                <Form>
                    <Content>ID</Content>
                    <Input
                        width={"250px"}
                        height={"30px"}
                        type="text"
                        placeholder={" 8 ~ 20자, 영어와 숫자로 구성"}
                        ref={signUpRefs[0]}
                    />
                </Form>
                <Margin value={10} />
                <Form>
                    <Content>Password</Content>
                    <Input
                        type="password"
                        width={"250px"}
                        height={"30px"}
                        placeholder={" 8 ~ 20자 영어, 숫자, 특수문자 1개씩 포함"}
                        ref={signUpRefs[1]}
                    />
                </Form>
                <Margin value={10} />
                <Form>
                    <Margin value={10} />
                    <Content>Re-enter Password</Content>
                    <Input
                        type="password"
                        width={"250px"}
                        height={"30px"}
                        placeholder={" Password 재입력"}
                        ref={signUpRefs[2]}
                    />
                </Form>
                <Margin value={10} />
                <Form>
                    <Content>Nickname</Content>
                    <Input
                        width={"250px"}
                        height={"30px"}
                        placeholder={" 2 ~ 12자 사이로 입력"}
                        ref={signUpRefs[3]}
                    />
                </Form>
                <Margin value={10} />
                <Button
                    style={"gray"}
                    width={"255px"}
                    height={"40px"}
                    onClick={handleSignUp}
                    onKeyDown={handleSignUp}
                >
                    Submit</Button>
                <Margin value={10} />
            </StartDisplay>

        case 3.4:
            return <StartDisplay>
                <div>
                    <SubTitle>Membership</SubTitle>
                    <SubTitle>registration</SubTitle>
                    <SubTitle>has been</SubTitle>
                    <SubTitle>completed.</SubTitle>
                    <Margin value={10}></Margin>
                    <Presskey>Press <ColorText color="yellow">Enter</ColorText> Key</Presskey>
                </div>
            </StartDisplay>

        case 4:
            return <StartDisplay mode={"findpassword"}>
                <SubTitle>Find Password</SubTitle>
                <Margin value={15}></Margin>
                <Form>
                    <Content2>what's your name?</Content2>
                    <Input
                        ref={findPasswordRefs[0]}
                        width={"250px"}
                        height={"30px"}
                        type="text"
                    />
                </Form>
                <Margin value={10} />
                <Form>
                    <Content2>what's your phone number?</Content2>
                    <Input
                        ref={findPasswordRefs[1]}
                        type="number"
                        width={"60px"}
                        textAlign={"center"}
                        height={"30px"}
                    />
                    &nbsp;-&nbsp;
                    <Input
                        ref={findPasswordRefs[2]}
                        type="number"
                        width={"60px"}
                        textAlign={"center"}
                        height={"30px"}
                    />
                    &nbsp;-&nbsp;
                    <Input
                        ref={findPasswordRefs[3]}
                        type="number"
                        width={"60px"}
                        textAlign={"center"}
                        height={"30px"}
                    />
                </Form>
                <Margin value={10} />
                <Form>
                    <Margin value={10} />
                    <Content2>What's your birthday?</Content2>
                    <BirthDaySelect
                        ref1={findPasswordRefs[4]}
                        ref2={findPasswordRefs[5]}
                        ref3={findPasswordRefs[6]}
                    />
                </Form>
                <Margin value={10} />
                <Form>
                    <Button
                        style={"gray"}
                        width={"255px"}
                        height={"40px"}
                        onClick={handleFindPassword}
                    >
                        Submit</Button>
                </Form>
                <Margin value={10} />
            </StartDisplay>

        case 4.1:
            return <StartDisplay mode={"findpassword"}>
                <SubTitle>Change Password</SubTitle>
                <Margin value={15}></Margin>
                <Form>
                    <Content2>New Password</Content2>
                    <Input
                        ref={changePasswordRefs[0]}
                        type="password"
                        width={"250px"}
                        height={"30px"}
                    />
                </Form>
                <Margin value={10} />
                <Form>
                    <Content2>Re-enter Password</Content2>
                    <Input
                        ref={changePasswordRefs[1]}
                        type="password"
                        width={"250px"}
                        height={"30px"}
                    />
                </Form>
                <Margin value={15} />
                <Form>
                    <Button
                        style={"gray"}
                        width={"255px"}
                        height={"40px"}
                        onClick={handleChangePassword}
                    >
                        Submit</Button>
                </Form>
            </StartDisplay>
    }
}

export default Scene;