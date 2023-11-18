import React from 'react';
import { Link } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";

export default function Header() {
    return (
        <div className='header-container'>
            <CookieConsent
                location="bottom"
                buttonText="동의"
                cookieName="userCookieConsent"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
            >
                이 웹사이트는 사용자 경험 향상을 위해 쿠키를 사용합니다. 웹사이트를 계속 사용하시려면 쿠키 사용에 동의해주세요.
            </CookieConsent>

            <div className="header-wrap">
                <div className="header-left-wrap">
                    <Link to="/" className="header-link">홈페이지</Link>
                </div>
            </div>
            <ul className="header-menu">
                <li>
                    <Link className="header-nav-item" to="/">홈</Link>
                </li>
                <li>
                    <Link className="header-nav-item" to="/Search">검색</Link>
                </li>
                <li>
                    <Link className="header-nav-item" to="/Library">라이브러리</Link>
                </li>
                <li>
                    <Link className="header-nav-item" to="/Social">소셜</Link>
                </li>
            </ul>
        </div>
    );
}
