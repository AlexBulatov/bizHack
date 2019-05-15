import React from 'react'
import {Switch, Route} from 'react-router-dom'
import * as allConst from '../../modules/const'
import LoginPage from "../LoginPage";
import Pilot from '../pilot'
import Employer from "../employer";
import Page404 from "../Page404";

const App = () => (
    <Switch>
        <Route exact path={`${allConst.ROOT_DIRECTORY}`} component={LoginPage}/>
        <Route path={`${allConst.PATH_EMPLOYER}`} component={Employer}/>
        <Route path={`${allConst.PATH_PILOT}`} component={Pilot}/>
        <Route component={Page404}/>
    </Switch>
);

export default App
