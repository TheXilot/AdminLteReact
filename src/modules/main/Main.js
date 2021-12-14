import React, {useState, useEffect, useCallback} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import {Gatekeeper} from 'gatekeeper-client-sdk';
import {loadUser, logoutUser} from '@store/reducers/auth';
import {toggleSidebarMenu} from '@app/store/reducers/ui';
// import {getUser} from '@app/store/reducers/userReducer';
import Dashboard from '@pages/Dashboard';
import Blank from '@pages/Blank';
import Profile from '@pages/profile/Profile';

import AddUser from '@app/pages/user/AddUser';
import Header from './header/Header';
import Footer from './footer/Footer';
import MenuSidebar from './menu-sidebar/MenuSidebar';
import PageLoading from '../../components/page-loading/PageLoading';
import {getProfile} from '../../api/auth';

const Main = () => {
    const dispatch = useDispatch();
    const isSidebarMenuCollapsed = useSelector(
        (state) => state.ui.isSidebarMenuCollapsed
    );
    const screenSize = useSelector((state) => state.ui.screenSize);
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    const handleToggleMenuSidebar = () => {
        dispatch(toggleSidebarMenu());
    };

    const fetchProfile = async () => {
        try {
            // const response = await Gatekeeper.getProfile();
            const response = await getProfile();
            dispatch(loadUser(response));
            console.log('response 1 : ', response);
            // const user = await getUser(response.payload);
            // dispatch(getUser(user.id));
            setIsAppLoaded(true);
        } catch (error) {
            dispatch(logoutUser());
            setIsAppLoaded(true);
        }
    };

    useEffect(() => {
        document.getElementById('root').classList.remove('register-page');
        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.remove('hold-transition');

        document.getElementById('root').classList.add('sidebar-mini');
        document.getElementById('root').classList.add('layout-fixed');

        fetchProfile();
        return () => {
            document.getElementById('root').classList.remove('sidebar-mini');
            document.getElementById('root').classList.remove('layout-fixed');
        };
    }, []);

    useEffect(() => {
        document.getElementById('root').classList.remove('sidebar-closed');
        document.getElementById('root').classList.remove('sidebar-collapse');
        document.getElementById('root').classList.remove('sidebar-open');
        if (isSidebarMenuCollapsed && screenSize === 'lg') {
            document.getElementById('root').classList.add('sidebar-collapse');
        } else if (isSidebarMenuCollapsed && screenSize === 'xs') {
            document.getElementById('root').classList.add('sidebar-open');
        } else if (!isSidebarMenuCollapsed && screenSize !== 'lg') {
            document.getElementById('root').classList.add('sidebar-closed');
            document.getElementById('root').classList.add('sidebar-collapse');
        }
    }, [screenSize, isSidebarMenuCollapsed]);

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return <PageLoading />;
        }
        return (
            <>
                <Header toggleMenuSidebar={handleToggleMenuSidebar} />

                <MenuSidebar />

                <div className="content-wrapper">
                    <div className="pt-3" />
                    <section className="content">
                        <Switch>
                            <Route exact path="/sub-menu-2" component={Blank} />
                            <Route exact path="/add_user" component={AddUser} />
                            <Route exact path="/blank" component={Blank} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/" component={Dashboard} />
                        </Switch>
                    </section>
                </div>
                <Footer />
                <div
                    id="sidebar-overlay"
                    role="presentation"
                    onClick={handleToggleMenuSidebar}
                    onKeyDown={() => {}}
                />
            </>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
