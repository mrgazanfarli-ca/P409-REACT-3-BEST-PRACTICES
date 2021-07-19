import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { APP_ROUTES } from './consts';

import { DashboardPage } from './pages/Dashboard';
import { UsersPage } from './pages/Users';
import { UserPosts } from './pages/UserPosts';
import { PostsPage } from './pages/Posts';

import './App.css';

function App() {
    return (
        <>
            <Switch>
                <Route path={APP_ROUTES.USERS.POSTS.PATH} component={UserPosts} />
                <Route path={APP_ROUTES.POSTS.PATH} component={PostsPage} />
                <Route path={APP_ROUTES.USERS.PATH} component={UsersPage} />
                {/*Keep this route always at the end*/}
                <Route path={APP_ROUTES.DASHBOARD.PATH} exact component={DashboardPage} />
            </Switch>
        </>
    );
}

export default App;
