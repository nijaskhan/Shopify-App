import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminLogin.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeLoaderFalse, changeLoaderTrue } from '../../../redux/loadingSpinner/loadersAction';
import { LoginAdmin } from '../../../apicalls/admin';

function AdminLogin() {
    const dispatchLoaders = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            dispatchLoaders(changeLoaderTrue());
            const response = await LoginAdmin(data);
            dispatchLoaders(changeLoaderFalse());
            if (response.success) {
                toast.success(response.message);
                localStorage.setItem('admintoken', JSON.stringify(response.data));
                localStorage.setItem('admin', JSON.stringify(response.admin));
                window.location.href = '/admin';
            }
            else throw new Error(response.message);
        } catch (err) {
            toast.error(err.message);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('admintoken')) {
            navigate('/admin');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='container-fluid'>
            <div className='row main-parent vh-100 vw-100'>
                <section className='loginOuterbox col-10 col-lg-4 col-md-6 col-xs-10'>
                    <h1 className='mt-4 text-center'>Admin Login</h1>
                    <div className='py-4 pt-5'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3 mx-4" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" {...register("email", { required: true })} placeholder="email" />
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4" controlId="exampleForm.ControlInput2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control {...register("password", { required: true })} type="password" placeholder="password" />
                            </Form.Group>
                            <Form.Group className="py-4 d-flex" controlId="exampleForm.ControlTextarea1">
                                <Button type='submit' size='lg' className='btn btn-primary mx-auto'>LOGIN</Button>
                            </Form.Group>
                        </Form>
                        <ToastContainer />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdminLogin;