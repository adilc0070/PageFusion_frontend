import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setUserLogin } from '../store/slice/slice';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/apiService';
import { setToken } from '../utils/auth';

// Define Values type
type Values = {
    email: string;
    password: string;
    name?: string;
};

// Validation schemas
const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .matches(/@(gmail\.com|outlook\.com|yahoo\.com|icloud\.com)$/, 'Email must be from Gmail, Outlook, Yahoo, or iCloud')
        .required('Required'),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters and include at least one letter and one number')
        .required('Required'),
});

const registerValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .matches(/@(gmail\.com|outlook\.com|yahoo\.com|icloud\.com)$/, 'Email must be from Gmail, Outlook, Yahoo, or iCloud')
        .required('Required'),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters and include at least one letter and one number')
        .required('Required'),
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Required'),
});

// LoginForm Component
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values: Values) => {
        try {
            const data = await loginUser(values.email, values.password);

            if (data.token) {
                setToken(data.token);
                dispatch(setUserLogin(values.email));
                navigate('/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            alert('Error logging in. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
        >
            <Form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <Field type="email" name="email" placeholder="email@example.com" className="input input-bordered" />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <Field type="password" name="password" placeholder="******" className="input input-bordered" />
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </Form>
        </Formik>
    );
};

// RegisterForm Component
const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (values: Values) => {
        try {
            const response = await registerUser(values.name ?? '', values.email, values.password);

            if (response.token) {
                setToken(response.token);
                dispatch(setUserLogin(values.email));
                navigate('/');
            } else {
                alert('Registration failed. Try again with different credentials.');
            }
        } catch (error) {
            alert('Error during registration. Please try again.');
            console.error('Registration error:', error);
        }
    };

    return (
        <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegister}
        >
            <Form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <Field type="text" name="name" placeholder="Your Name" className="input input-bordered" />
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <Field type="email" name="email" placeholder="email@example.com" className="input input-bordered" />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <Field type="password" name="password" placeholder="******" className="input input-bordered" />
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </Form>
        </Formik>
    );
};

// Main Register Component
const Register = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    const handleTabChange = (tabName: 'login' | 'register') => {
        setActiveTab(tabName);
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-grow overflow-auto">
                <div className="hero bg-base-200 flex flex-col justify-center items-center h-full">
                    <div className="hero-content flex flex-col lg:flex-row-reverse w-full max-w-5xl">
                        <div className="text-center lg:text-left w-full lg:w-1/2 px-4">
                            <h1 className="text-5xl font-bold">{activeTab === 'login' ? 'Login' : 'Register'} to Your PDF Tool</h1>
                            <p className="py-6">
                                {activeTab === 'login' ? 
                                'Log in to access your PDF splitting and page selection tool.' : 
                                'Register to start managing your PDFs.'}
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full lg:w-1/2 max-w-sm shadow-2xl">
                            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                        </div>
                    </div>
                </div>
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
