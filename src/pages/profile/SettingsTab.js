import {React, useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {Button, Input} from '@components';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from '@app/store/reducers/auth';
// import {useForm} from 'react-hook-form';
import Loading from '@app/components/loading/loading';
import {toast} from 'react-toastify';
import axios from '../../utils/axios';

const SettingsTab = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.currentUser);
    // const {register} = useForm();
    const [isloading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: user,
        validationSchema: Yup.object({
            fullName: Yup.string().required('Required'),
            email: Yup.string()
                .email('Vous devez saisir un mail valide !')
                .required('Required'),
            experience: Yup.string().required('Required'),
            competence: Yup.string().required('Required'),
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
                .put(`http://localhost:5000/auth/${user._id}`, data, {
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
            result.id = result._id;
            if (result) {
                toast.success('Les Modifications sont bien enregistrées !');
                dispatch(loadUser(result));
            }
        }
    });
    const [imgState, setImgState] = useState({
        path: user.picture
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
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Modification de votre profile</h3>
            </div>
            <form className="form-horizontal" onSubmit={formik.handleSubmit}>
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
                                formikFieldProps={formik.getFieldProps('email')}
                                formik={formik}
                                className="form-group p-1"
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
                                            position: 'absolute',
                                            top: '0',
                                            left: '0',
                                            opacity: '0'
                                        }}
                                        accept="image/*"
                                        onChange={handleFileChange}
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
                        <Loading isLoading={isloading} text="Chargement ..." />
                    )}
                </div>
            </form>
        </div>
    );
};

export default SettingsTab;
