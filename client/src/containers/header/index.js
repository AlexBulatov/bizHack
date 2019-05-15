import React, {Fragment} from 'react'
import './index.css';
import * as allConst from '../../modules/const';

// Получении ФИО и проверка на отстутсвие данных о пользователе в localStorage
const getUserFIO = () => {
    return allConst.getCurrentUser() === 'empty' ? "" : `${allConst.getCurrentUser().lastName} ${allConst.getCurrentUser().firstName[0]}.${allConst.getCurrentUser().middleName[0]}.`;
};
const Header = (props) => (
    <Fragment>
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
            <div className="navbar-nav mr-auto">
                <img src={require("../../static/HeaderLogo.png")} height="40"
                     className="d-inline-block align-top mr-2 mt-1" alt=""/>
            </div>
            <ul className="navbar-nav">
                <div className="nav-item">
                    <div className="row">
                        <div className="header-profile_text text-right">
                            <p>Приложение {props.role}</p>
                            <p>{getUserFIO()}</p>
                        </div>
                        <img src={require("../../static/EmptyUser.jpg")} className="ml-2 mr-2 round-img" width="50"
                             height="50"
                             alt=""/>
                    </div>
                </div>
            </ul>
        </nav>
    </Fragment>
);

export default Header;