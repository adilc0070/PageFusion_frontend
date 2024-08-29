import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .matches(/@(gmail\.com|outlook\.com|yahoo\.com|icloud\.com)$/, 'Email must be from Gmail, Outlook, Yahoo, or iCloud')
        .required('Required'),
    password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters please include at least one letter and one number ').required('Required'),
});

const Register = () => {
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
    };

    const LoginSection = () => (
        <div className="hero bg-base-200 flex flex-col justify-center items-center h-full">
            <div className="hero-content flex flex-col lg:flex-row-reverse w-full max-w-5xl">
                <div className="text-center lg:text-left w-full lg:w-1/2 px-4">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full lg:w-1/2 max-w-sm shadow-2xl">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // Handle login submit
                            console.log(values);
                        }}
                    >
                        <Form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <Field type="email" name="email" placeholder="email" className="input input-bordered" />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <Field type="password" name="password" placeholder="password" className="input input-bordered" />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>

                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );

    const RegisterSection = () => (
        <div className="hero bg-base-200 flex flex-col justify-center items-center h-full">
            <div className="hero-content flex flex-col lg:flex-row-reverse w-full max-w-5xl">
                <div className="text-center lg:text-left w-full lg:w-1/2 px-4">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full lg:w-1/2 max-w-sm shadow-2xl">
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            // Handle register submit
                            console.log(values);
                        }}
                    >
                        <Form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <Field type="email" name="email" placeholder="email" className="input input-bordered" />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <Field type="password" name="password" placeholder="password" className="input input-bordered" />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Create account</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-grow overflow-auto">
                {activeTab === 'login' ? <LoginSection /> : <RegisterSection />}
            </div>
            <div role="tablist" className="tabs tabs-boxed mb-4 px-4">
                <a
                    role="tab"
                    className={`tab ${activeTab === 'login' ? 'tab-active' : ''}`}
                    onClick={() => handleTabChange('login')}
                >
                    Login
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === 'register' ? 'tab-active' : ''}`}
                    onClick={() => handleTabChange('register')}
                >
                    Register
                </a>
            </div>
        </div>
    );
};

export default Register;
