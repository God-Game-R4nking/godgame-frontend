import React from "react";

/**
 * ID -> 길이제한 // 8 ~ 20 영어 + 숫자, 특수문자만 제한
 * password -> 길이제한 // 8 ~ 20 영어 숫자 특수문자 1개씩 이상
 * nickname -> 길이제한 // 2 ~ 12 
 */

export const valifySignIn = (id, password) => {
    const invalidCharRegex = /^[A-Za-z0-9]+$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]).{8,20}$/;


    // ID 유효성 검사: 8 ~ 20자, 영어 + 숫자만 허용
    if (!invalidCharRegex.test(id)) {
        alert("❌ 올바른 형식의 ID가 아닙니다.");
        return false;
    } else if (!id || id.length < 8 || id.length > 20) {
        alert("❌ 올바른 형식의 ID가 아닙니다.");
        return false;
    }

    // 비밀번호 유효성 검사: 8 ~ 20자, 영어, 숫자, 특수문자 1개 이상 포함
    if (!password || password.length < 8 || password.length > 20) {
        alert("❌ 올바른 형식의 Password가 아닙니다.");
        return false;
    }
    return true;
};

export const valifySignUp = (id, password, reEnterPassword, nickname, signUpRefs) => {
    const refs = signUpRefs;
    const idRegex = /^[A-Za-z0-9]{8,20}$/;
    const green = "#42D61D";

    // ID 유효성 검사
    if (!idRegex.test(id)) {
        refs[0].current.style.borderColor = 'red';
        alert("ID는 8 ~ 20자, 영어와 숫자만 포함해야 합니다.");
        return false;
    } else {
        refs[0].current.style.borderColor = green;
    }

    // 비밀번호 길이 검사
    if (password.length < 8 || password.length > 20) {
        refs[1].current.style.borderColor = 'red';
        alert("비밀번호는 8 ~ 20자이어야 합니다.");
        return false;
    } else {
        refs[1].current.style.borderColor = green;
    }

    const hasEnglish = /[A-Za-z]/.test(password); // 영어 알파벳 포함
    const hasNumber = /\d/.test(password); // 숫자 포함
    const hasSpecialChar = /[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password); // 특수문자 포함

    if (!hasEnglish) {
        refs[1].current.style.borderColor = 'red';
        alert("비밀번호는 영어 알파벳을 포함해야 합니다.");
        return false;
    }

    if (!hasNumber) {
        refs[1].current.style.borderColor = 'red';
        alert("비밀번호는 숫자를 포함해야 합니다.");
        return false;
    }

    if (!hasSpecialChar) {
        refs[1].current.style.borderColor = 'red';
        alert("비밀번호는 특수문자를 포함해야 합니다.");
        return false;
    }

    // 비밀번호 확인
    if (password !== reEnterPassword) {
        refs[1].current.style.borderColor = 'red';
        refs[2].current.style.borderColor = 'red';
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    } else {
        refs[1].current.style.borderColor = green;
        refs[2].current.style.borderColor = green;
    }

    // 닉네임 유효성 검사
    if (nickname.length < 2 || nickname.length > 12) {
        refs[3].current.style.borderColor = 'red';
        alert("닉네임은 2 ~ 12자이어야 합니다.");
        return false;
    } else {
        refs[3].current.style.borderColor = green;
    }

    return true;
};

export const valifyChangePassword = (password, reEnterPassword, refs) => {
    const green = "#42D61D";

    const hasEnglish = /[A-Za-z]/.test(password); // 영어 알파벳 포함
    const hasNumber = /\d/.test(password); // 숫자 포함
    const hasSpecialChar = /[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password); // 특수문자 포함

    if (!hasEnglish) {
        refs[0].current.style.borderColor = 'red';
        alert("비밀번호는 영어 알파벳을 포함해야 합니다.");
        return false;
    }

    if (!hasNumber) {
        refs[0].current.style.borderColor = 'red';
        alert("비밀번호는 숫자를 포함해야 합니다.");
        return false;
    }

    if (!hasSpecialChar) {
        refs[0].current.style.borderColor = 'red';
        alert("비밀번호는 특수문자를 포함해야 합니다.");
        return false;
    }

    // 비밀번호 확인
    if (password !== reEnterPassword) {
        refs[0].current.style.borderColor = 'red';
        refs[1].current.style.borderColor = 'red';
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    } else {
        refs[0].current.style.borderColor = green;
        refs[1].current.style.borderColor = green;
    }

    // 비밀번호가 빈 문자열인지 체크
    if (password.length === 0) {
        refs[0].current.style.borderColor = 'red';
        alert("비밀번호를 입력해주세요.");
        return false;
    } else {
        refs[0].current.style.borderColor = green;

    }

    if( reEnterPassword.length === 0) {
        refs[1].current.style.borderColor = 'red';
        alert("비밀번호를 입력해주세요.");
        return false;
    } else {
        refs[1].current.style.borderColor = green;
    }
};
