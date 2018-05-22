import React from 'react';
import {
    Home as HomePage,
    Auth as AuthPage
} from 'pages';
import { Switch, Route } from 'react-router-dom';


const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/auth/:version" component={AuthPage} />
            </Switch>
        </div>
    );
};

export default App;