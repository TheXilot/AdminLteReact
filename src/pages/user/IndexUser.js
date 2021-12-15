/* eslint-disable jsx-a11y/anchor-is-valid */
import DataTables from '@app/pages/user/DataTables';
import {React} from 'react';

const IndexUser = () => {
    const columns = [
        // '_id',
        'picture',
        'email',
        'fullName',
        'experience',
        'competence',
        'education',
        'location'
    ];
    const columnsName = {
        picture: 'Image',
        email: 'Email',
        fullName: 'Nom Complet',
        experience: 'Experience',
        competence: 'Competence',
        education: 'Education',
        location: 'Localisation'
    };
    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">DataTables</h3>
                        </div>
                        <div className="card-body">
                            <DataTables
                                url="http://localhost:5000/auth/"
                                columns={columns}
                                columnsName={columnsName}
                            />
                        </div>
                        <div className="card-footer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexUser;
