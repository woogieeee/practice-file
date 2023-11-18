import React, { useEffect, useState } from 'react';
import { User } from './Login';



export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    // eslint-disable-next-line
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert('로그인에 성공했습니다.');
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  return (
    <div className="page">
      <div className="titleWrap">
        아이디랑
        <br />
        비밀번호를 입력해주세요.
      </div>

      <div className="contentWrap">
        <div className="inputTitle">아이디</div>
        <div
          className="inputWrap"
        >
          <input
            className="input"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={email}
            onChange={handleEmail} />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>양식에 맞게 입력해주세요</div>
          )}
        </div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="특수문자, 숫자, 대문자를 입력해주세요"
            value={pw}
            onChange={handlePw} />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>양식에 맞게 비밀번호 입력해주세요.</div>
          )}
        </div>
      </div>

      <div>
        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>
      </div>
    </div>
  );
}
