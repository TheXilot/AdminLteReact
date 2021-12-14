/* eslint-disable jsx-a11y/anchor-is-valid */
import {React, useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {Button, Input} from '@components';
import * as Yup from 'yup';
import Loading from '@app/components/loading/loading';
import {toast} from 'react-toastify';
import {useTranslation} from 'react-i18next';
import axios from '../../utils/axios';

const AddUser = () => {
    const [t] = useTranslation();
    // const {register} = useForm();
    const [isloading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {},
        validationSchema: Yup.object({
            fullName: Yup.string().required('Required'),
            email: Yup.string()
                .email('Vous devez saisir un mail valide !')
                .required('Required'),
            password: Yup.string().min(6).max(15).required('Required'),
            passwordVerify: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            experience: Yup.string(),
            competence: Yup.string(),
            education: Yup.string(),
            location: Yup.string(),
            // TODO:
            picture: Yup.mixed()
        }),
        onSubmit: async (values, actions) => {
            console.log('submit value : ', values);
            actions.setSubmitting(false);
            setIsLoading(true);
            const data = new FormData();
            Object.keys(values).forEach((key) => {
                data.append(key, values[key]);
            });
            const result = await axios
                .post(`http://localhost:5000/auth/`, data, {
                    withCredentials: true,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data.errorMessage)
                            toast.error(error.response.data.errorMessage);
                    } else {
                        toast.error(error.message || 'Failed');
                    }
                });
            setIsLoading(false);
            console.log('result ', result);
            if (result) {
                toast.success('enregistré avec succès !');
            }
        }
    });
    const [imgState, setImgState] = useState({
        path: '/img/default-profile.png'
    });

    const [imageState, setImageState] = useState({
        picture: ''
    });
    const handleFileChange = (e) => {
        if (e.target.files[0] !== undefined) {
            setImageState({
                picture: e.target.files[0]
            });
            setImgState({
                ...imgState,
                path: URL.createObjectURL(e.target.files[0])
            });
        }
    };
    useEffect(() => {
        formik.setFieldValue('picture', imageState?.picture);
    }, [imageState?.picture]);
    return (
        <>
            {/* <ContentHeader title={t('menusidebar.label.adduser')} /> */}
            {/* <section className="content"> */}
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    {t('menusidebar.label.adduser')}
                                </h3>
                            </div>
                            <form
                                className="form"
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label
                                            htmlFor="name"
                                            className="col-sm-2 col-form-label"
                                        >
                                            Nom Complet
                                        </label>
                                        <div className="col-sm-10">
                                            <Input
                                                type="text"
                                                placeholder="Nom Complet"
                                                formikFieldProps={formik.getFieldProps(
                                                    'fullName'
                                                )}
                                                formik={formik}
                                                value={formik.values.fullName}
                                                className="form-group p-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            htmlFor="email"
                                            className="col-sm-2 col-form-label"
                                        >
                                            Email
                                        </label>
                                        <div className="col-sm-10">
                                            <Input
                                                type="email"
                                                id="email"
                                                placeholder="Email"
                                                value={formik.values.email}
                                                formikFieldProps={formik.getFieldProps(
                                                    'email'
                                                )}
                                                formik={formik}
                                                className="form-group p-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6 row">
                                            <label
                                                htmlFor="password"
                                                className="col-sm-4 col-form-label"
                                            >
                                                Mot de passe
                                            </label>
                                            <div className="col-sm-8">
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    placeholder="Mot de passe"
                                                    value={
                                                        formik.values.password
                                                    }
                                                    formikFieldProps={formik.getFieldProps(
                                                        'password'
                                                    )}
                                                    formik={formik}
                                                    className="form-group p-1"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 row">
                                            <label
                                                htmlFor="passwordVerify"
                                                className="col-sm-4 col-form-label"
                                            >
                                                Confirmer le mot de passe
                                            </label>
                                            <div className="col-sm-8">
                                                <Input
                                                    type="password"
                                                    id="passwordVerify"
                                                    placeholder="Mot de passe"
                                                    value={
                                                        formik.values
                                                            .passwordVerify
                                                    }
                                                    formikFieldProps={formik.getFieldProps(
                                                        'passwordVerify'
                                                    )}
                                                    formik={formik}
                                                    className="form-group p-1"
                                                />
                                            </div>
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
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            htmlFor="competence"
                                            className="col-sm-2 col-form-label"
                                        >
                                            Education
                                        </label>
                                        <div className="col-sm-10">
                                            <Input
                                                type="text"
                                                id="education"
                                                placeholder="Education"
                                                formik={formik}
                                                value={formik.values.education}
                                                formikFieldProps={formik.getFieldProps(
                                                    'education'
                                                )}
                                                className="form-group p-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label
                                            htmlFor="location"
                                            className="col-sm-2 col-form-label"
                                        >
                                            Localisation
                                        </label>
                                        <div className="col-sm-10">
                                            <Input
                                                type="text"
                                                id="location"
                                                placeholder="Localisation"
                                                formik={formik}
                                                value={formik.values.location}
                                                formikFieldProps={formik.getFieldProps(
                                                    'location'
                                                )}
                                                className="form-group p-1"
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
                                        <div className="col-sm-10 text-center">
                                            <div className="row align-items-start">
                                                <img
                                                    className="mb-3 profile-user-img img-fluid img-circle"
                                                    src={imgState?.path}
                                                    id="preview-image"
                                                    alt=""
                                                />
                                            </div>
                                            <div
                                                className="row align-items-start"
                                                style={{
                                                    width: '50%',
                                                    margin: '0 auto'
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    className="form-control"
                                                >
                                                    Charger
                                                    <input
                                                        type="file"
                                                        name="picture"
                                                        className="form-control"
                                                        // ref={register}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            position:
                                                                'absolute',
                                                            top: '0',
                                                            left: '0',
                                                            opacity: '0'
                                                        }}
                                                        accept="image/*"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <Button type="submit" theme="primary">
                                        Submit
                                    </Button>
                                    {isloading && (
                                        <Loading
                                            isLoading={isloading}
                                            text="Chargement ..."
                                        />
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* </section> */}
        </>
    );
};

export default AddUser;
