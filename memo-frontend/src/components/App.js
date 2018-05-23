import React from 'react';
import {
    Home as HomePage,
    Auth as AuthPage,
    Register as RegisterPage
} from 'pages';
import { Switch, Route } from 'react-router-dom';
import Base from 'containers/Base';


const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/auth/login" component={AuthPage} />
                <Route exact path="/auth/register" component={RegisterPage} />
            </Switch>
            <Base/>
        </div>
    );
};

export default App;