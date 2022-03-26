import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import logo from '../../assets/snarki.png';
import "./Header.css";

const Header = () => {

    const navigate = useNavigate();
    return (
        <div className="dash-header">
            <Sidebar dashboard={true} />
            <div className="dash-header-left">
                <img
                    className="dash-header-left-icon"
                    src={logo}
                    alt="snarki-logo"
                    onClick={() => navigate("/")}
                />
                <span
                    className="dash-header-left-title"
                    onClick={() => navigate("/")}
                >
                    SNARKI
                    <span className="smallFont"> Admin</span>
                </span>
            </div>
        </div>
    );

};

export default Header;
