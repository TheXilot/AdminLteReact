import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
// import {ContentHeader, Button} from '@components';
import {ContentHeader} from '@components';
import {useSelector} from 'react-redux';
import SettingsTab from './SettingsTab';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('ACTIVITY');
    const [t] = useTranslation();
    const user = useSelector((state) => state.auth.currentUser);
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <ContentHeader title="Profile" />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img
                                            className="profile-user-img img-fluid img-circle"
                                            src="/img/default-profile.png"
                                            alt="User profile"
                                        />
                                    </div>
                                    <h3 className="profile-username text-center">
                                        {user.fullName}
                                    </h3>
                                    <p className="text-muted text-center">
                                        {user.email}
                                    </p>
                                    <p className="text-muted text-center font-weight-bold">
                                        Super Admin
                                    </p>
                                    {/* <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>{t('header.user.followers')}</b>

                                            <span className="float-right">
                                                1,322
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>{t('views.user.following')}</b>
                                            <span className="float-right">
                                                543
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>{t('header.user.friends')}</b>
                                            <span className="float-right">
                                                13,287
                                            </span>
                                        </li>
                                    </ul> */}
                                    {/* <Button block>
                                        {t('main.label.follow')}
                                    </Button> */}
                                </div>
                                {/* /.card-body */}
                            </div>
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        {t('main.label.aboutMe')}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <strong>
                                        <i className="fas fa-book mr-1" />
                                        {t('main.label.education')}
                                    </strong>
                                    <p className="text-muted">
                                        {user.education}
                                    </p>
                                    <hr />
                                    <strong>
                                        <i className="fas fa-map-marker-alt mr-1" />
                                        {t('main.label.location')}
                                    </strong>
                                    <p className="text-muted">
                                        {user.location}
                                    </p>
                                    <hr />
                                    <strong>
                                        <i className="fas fa-pencil-alt mr-1" />
                                        {t('main.label.skills')}
                                    </strong>
                                    <p className="text-muted">
                                        <span className="tag tag-primary">
                                            {user.competence}
                                        </span>
                                    </p>
                                    <hr />
                                    <strong>
                                        <i className="far fa-file-alt mr-1" />
                                        {t('main.label.exp')}
                                    </strong>
                                    <p className="text-muted">
                                        {user.experience}.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${
                                                    activeTab === 'ACTIVITY'
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    toggle('ACTIVITY')
                                                }
                                            >
                                                {t('main.label.activity')}
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${
                                                    activeTab === 'TIMELINE'
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    toggle('TIMELINE')
                                                }
                                            >
                                                {t('main.label.timeline')}
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                type="button"
                                                className={`nav-link ${
                                                    activeTab === 'SETTINGS'
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    toggle('SETTINGS')
                                                }
                                            >
                                                {t('main.label.settings')}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content">
                                        <SettingsTab
                                            isActive={activeTab === 'SETTINGS'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
