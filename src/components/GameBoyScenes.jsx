// 화면 컴포넌트
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StartDisplay from './StartDisplay';
import Button from './Button';
import Input from './Input';
import BirthDaySelect from './BirthDaySelect';
import ic_pass from '../assets/ic_pass.webp';
import { valifySignIn, valifySignUp, valifyChangePassword } from '../utils/Validation';
import { useNavigate } from 'react-router-dom';
import { Title, ColorText, SubTitle, Content, Content2, Content3, Presskey } from './Texts';
import { setLocalStorage, getLocalStorage } from '../utils/LocalStorageManager';
import sendPostIdentityVerify from '../services/VerifyIdentity';
import sendPostIdentityVerifySecond from '../services/VerifyIdentityAdd';
import Swal from 'sweetalert2';
import sendSignUpRequest from '../services/PostMember';
import sendLoginRequest from '../services/LoginRequest';
import { useMember } from '../hooks/GetMemberhook';

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
    const passRef = [useRef(null), useRef(null), useRef(null)];
    const findPasswordRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const changePasswordRefs = [useRef(null), useRef(null)];
    const passButton = useRef(null);
    const navigate = useNavigate();
    const [lastJuminNum, setLastJuminNum] = useState('');
    const [firstJuminNum, setFirstJuminNum] = useState('');
    const [middlePhoneNum, setMiddlePhoneNum] = useState('');
    const [lastPhoneNum, setLastPhoneNum] = useState('');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userJumin, setUserJumin] = useState('');
    const { fetchMember } = useMember();


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

    const handleSignIn = async () => {
        const id = signInRefs[0].current.value; // ID 값 가져오기
        const password = signInRefs[1].current.value; // 비밀번호 값 가져오기

        console.log("로그인 시도:", { id, password })
        let result = valifySignIn(id, password) ? true : false;

        // TODO : 로그인 비즈니스 로직 구현
        try {
            const response = await sendLoginRequest(id, password);
            if (response) {
                await fetchMember(); // 로그인 성공 시 멤버 정보 가져오기
                navigate("/loading");
            } else {
                // 로그인 실패 처리
                console.error("로그인 실패");
            }
        } catch (error) {
            console.error("로그인 에러", error);
        }
    };

    const handleSignUp = async () => {
        const id = signUpRefs[0].current.value;
        const password = signUpRefs[1].current.value;
        const reEnterPassword = signUpRefs[2].current.value;
        const nickname = signUpRefs[3].current.value;
        const jumin = userJumin.substring(0, 6) + "*******";
        const phone = userPhone.substring(0, 3) + "-" + userPhone.substring(3, 7) + "-" + userPhone.substring(7, 11);

        console.log(jumin);
        console.log(phone);
        let result = valifySignUp(id, password, reEnterPassword, nickname, signUpRefs) ? true : false;
        const requestBody = { id: id, password: password, memberName: userName, nickName: nickname, phone: phone, identificationNumber: jumin }
        let response;
        try {
            response = await sendSignUpRequest(requestBody);
        } catch {
            console.log("error");
            alert("서버 에러입니다.");
        }

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

    const handlePassAuth = async () => { // async 키워드 추가
        const name = passRef[0].current.value;
        const jumin = firstJuminNum + "" + lastJuminNum;
        const phone = passRef[1].current.value + "" + middlePhoneNum + "" + lastPhoneNum;
        const telecom = parseInt(passRef[2].current.value);

        console.log("패스 인증 시도 : " + name + " " + jumin + " " + phone + " " + telecom);

        const params = { name: name, identity: jumin, phoneNo: phone, telecom: telecom };
        console.log(params);
        let result;
        try {
            result = await sendPostIdentityVerify(params); // await 추가
            console.log(params);
            // response.response를 JSON으로 파싱
            const parsedResponse = JSON.parse(result.response);
            // 응답 처리: 결과에 따라 scene 설정
            console.log(parsedResponse.result.code)
            // 응답 처리: 결과에 따라 scene 설정
            if (parsedResponse.result.code === "CF-03002") {
                // PASS 인증 확인을 요청
                const { isConfirmed } = await Swal.fire({
                    title: 'PASS 인증을 해주세요',
                    text: "인증이 완료된 후에 확인 버튼을 눌러주세요",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                });

                if (isConfirmed) {
                    // 확인을 누르면 두 번째 인증 요청을 보냄
                    const secondResult = await sendPostIdentityVerifySecond(params);
                    const parsedResponse2 = JSON.parse(secondResult.response);
                    // 추가 처리: secondResult에 따라 처리
                    console.log(parsedResponse2.result.code);
                    if (parsedResponse2.result.code === "CF-00000" || parsedResponse2.result.code === "CF-00025") { // 성공 코드로 대체
                        Swal.fire('성공', '인증이 성공했습니다.', 'success');
                        setScene(3.3); // 새로운 씬으로 변경
                    } else {
                        Swal.fire('실패', '인증에 실패했습니다. 다시 시도해주세요.', 'error');
                    }
                } else {
                    console.log("인증 요청이 취소되었습니다.");
                }
            } else {
                // 인증 실패 처리
                console.error("인증 실패:", result.message); // 서버에서 받은 오류 메시지
                Swal.fire('실패', '인증에 실패했습니다. 다시 시도해주세요.', 'error');
            }
        } catch (error) {
            console.error('Error during identity verification:', error);
            Swal.fire('서버 오류', '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.', 'error');
        }

        setUserName(name);
        setUserJumin(jumin);
        setUserPhone(phone);
        console.log(result);
    };


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSignIn(); // 마지막 입력란에서 Enter 키를 누르면 로그인 처리
        }
    };

    const handleChangJuminNum = (e) => {
        const input = e.target.value;

        // 숫자와 소수점만 허용하고, 두 번째 소수점은 제거
        const filteredInput = input
            .replace(/[^0-9]/g, '')  // 숫자와 소수점 외의 문자는 제거

        setFirstJuminNum(filteredInput);
    }

    const handleChangLastJumin = (e) => {
        const input = e.target.value;

        // 숫자와 소수점만 허용하고, 두 번째 소수점은 제거
        const filteredInput = input
            .replace(/[^0-9]/g, '')  // 숫자와 소수점 외의 문자는 제거

        setLastJuminNum(filteredInput);
    }


    const handleMiddlePhoneNum = (e) => {
        const input = e.target.value;

        // 숫자와 소수점만 허용하고, 두 번째 소수점은 제거
        const filteredInput = input
            .replace(/[^0-9]/g, '')  // 숫자와 소수점 외의 문자는 제거

        setMiddlePhoneNum(filteredInput);
    }

    const handleLastPhoneNum = (e) => {
        const input = e.target.value;

        // 숫자와 소수점만 허용하고, 두 번째 소수점은 제거
        const filteredInput = input
            .replace(/[^0-9]/g, '')  // 숫자와 소수점 외의 문자는 제거

        setLastPhoneNum(filteredInput);
    }

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
            return <StartDisplay mode={"signup"}>
                <img
                    src={ic_pass}
                    style={{ width: '50px', height: '50px' }} />
                <Margin value={10}></Margin>
                <Form>
                    <Content2>이름</Content2>
                    <Input
                        width={"295px"}
                        height={"30px"}
                        type="text"
                        maxLength={4}
                        ref={passRef[0]}
                    />
                </Form>
                <Margin value={5} />
                <Form>
                    <Content2>주민번호</Content2>
                    <Input
                        type={"text"}
                        width={"142px"}
                        height={"30px"}
                        value={firstJuminNum}
                        onChange={handleChangJuminNum}
                        maxLength={6}
                    />
                    <Input
                        type={"password"}
                        width={"142px"}
                        height={"30px"}
                        value={lastJuminNum}
                        maxLength={7}
                        onChange={handleChangLastJumin}
                    />
                </Form>
                <Margin value={5} />
                <Form>
                    <Content2>휴대폰 번호</Content2>
                    <select
                        name="phone"
                        ref={passRef[1]}
                        style={{ width: '85px', height: '30px', fontSize: '18px' }}
                    >
                        <option value="010">010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                    </select>
                    <Input
                        type={"text"}
                        width={"100px"}
                        height={"30px"}
                        value={middlePhoneNum}
                        onChange={handleMiddlePhoneNum}
                        maxLength={4}
                    />
                    <Input
                        width={"100px"}
                        height={"30px"}
                        value={lastPhoneNum}
                        onChange={handleLastPhoneNum}
                        maxLength={4}
                    />
                </Form>
                <select
                    name="telecom"
                    ref={passRef[2]}
                    style={{ width: '100px', height: '30px', fontSize: '18px' }}
                >
                    <option disabled="true">통신사</option>
                    <option value="0">SKT</option>
                    <option value="1">KT</option>
                    <option value="2">LG</option>
                </select>
                <Margin value={5} />
                <ModeStyle><Button
                    tabIndex={0}
                    style={"gray"}
                    width={"100px"}
                    height={"50px"}
                >
                    닫기</Button>

                    <Button
                        ref={passButton}
                        tabIndex={0}
                        style={"pass"}
                        width={"205px"}
                        height={"50px"}
                        onClick={handlePassAuth}
                    >
                        인증 요청</Button></ModeStyle>
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