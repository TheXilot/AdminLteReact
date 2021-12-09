// import {React} from 'react';
import {React, useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import {useFormik} from 'formik';
import {Button, Input} from '@components';
import * as Yup from 'yup';
import {axios} from 'axios';
import {useSelector} from 'react-redux';
import {getUser} from '@app/api/user';

const SettingsTab = ({isActive}) => {
    const userId = useSelector((state) => state.auth.currentUser.id);
    const [user, setUser] = useState(undefined);

    async function getUserData() {
        const data = await getUser(userId);
        setUser(data.data);
    }
    useEffect(() => {
        getUserData();
    }, []);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            experience: '',
            competence: '',
            imageFile: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string()
                .email('Vous devez saisir un mail valide !')
                .required('Required'),
            password: Yup.string()
                .min(6, 'Saisir au minimum 6 caractères !')
                .max(30, 'Saisir au maximum 30 caractères !'),
            experience: Yup.string().required('Required'),
            competence: Yup.string().required('Required'),
            // TODO:
            imageFile: Yup.mixed()
        }),
        onSubmit: (values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
            console.log('user : ', user.id);
            axios
                .put('http://localhost:5000/auth/')
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
    const [imgState, setImgState] = useState({
        path: '/img/default-profile.png'
    });

    const [imageState, setImageState] = useState({
        imageFile: ''
    });
    const handleFileChange = (e) => {
        // console.log(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            setImageState({
                imageFile: e.target.files[0]
            });
            setImgState({
                ...imgState,
                path: URL.createObjectURL(e.target.files[0])
            });
        }
    };
    useEffect(() => {
        formik.setFieldValue('imageFile', imageState?.imageFile);
    }, [imageState?.imageFile]);

    return (
        <div className={`tab-pane ${isActive ? 'active' : ''}`}>
            <form className="form-horizontal" onSubmit={formik.handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">
                        Nom Complet
                    </label>
                    <div className="col-sm-10">
                        <Input
                            type="text"
                            placeholder="Nom Complet"
                            formikFieldProps={formik.getFieldProps('name')}
                            formik={formik}
                            value={formik.values.name}
                            className="form-group p-1"
                            // formik={formik}
                            // formikFieldProps={formik.getFieldProps('name')}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <Input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={formik.values.email}
                            formikFieldProps={formik.getFieldProps('email')}
                            formik={formik}
                            className="form-group p-1"
                            // formikFieldProps={formik.getFieldProps('email')}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="password"
                        className="col-sm-2 col-form-label"
                    >
                        Mot de passe :
                    </label>
                    <div className="col-sm-10">
                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            formik={formik}
                            value={formik.values.password}
                            formikFieldProps={formik.getFieldProps('password')}
                            className="form-group p-1"
                            // formikFieldProps={formik.getFieldProps('password')}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="experience"
                        className="col-sm-2 col-form-label"
                    >
                        Experience
                    </label>
                    <div className="col-sm-10">
                        <Input
                            type="text"
                            id="experience"
                            placeholder="Experience"
                            formik={formik}
                            value={formik.values.experience}
                            formikFieldProps={formik.getFieldProps(
                                'experience'
                            )}
                            className="form-group p-1"
                            // formikFieldProps={formik.getFieldProps(
                            // 'experience'
                            // )}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="competence"
                        className="col-sm-2 col-form-label"
                    >
                        Compétences
                    </label>
                    <div className="col-sm-10">
                        <Input
                            type="text"
                            id="competence"
                            placeholder="Compétences"
                            formik={formik}
                            value={formik.values.competence}
                            formikFieldProps={formik.getFieldProps(
                                'competence'
                            )}
                            className="form-group p-1"
                            // formikFieldProps={formik.getFieldProps(
                            //     'competence'
                            // )}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="inputSkills"
                        className="col-sm-2 col-form-label"
                    >
                        Image
                    </label>
                    <div className="col-sm-10">
                        <div className="col">
                            <img
                                className="mb-3 profile-user-img img-fluid img-circle"
                                src={imgState?.path}
                                id="preview-image"
                                alt=""
                            />
                        </div>
                        <Button
                            variant="contained"
                            component="label"
                            // startIcon=""
                        >
                            Charger
                            <input
                                type="file"
                                name="imageFile"
                                className="form-control"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    opacity: '0'
                                }}
                                accept="image/*"
                                // formik={formik}
                                onChange={handleFileChange}
                            />
                        </Button>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                        <Button type="submit" theme="danger">
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SettingsTab;
