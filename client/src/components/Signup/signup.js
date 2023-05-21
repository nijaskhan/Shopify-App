import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { changeLoaderFalse, changeLoaderTrue } from '../../redux/loadingSpinner/loadersAction';

function Signup() {
    const dispatchLoaders = useDispatch();
    const {register, handleSubmit, formState:{errors}, watch, reset} = useForm();
    const history = useNavigate();
    const onSubmit=async(data)=>{
        try{
            dispatchLoaders(changeLoaderTrue());
            const response = await RegisterUser(data);
            dispatchLoaders(changeLoaderFalse());
            if(response.success){
                toast.success(response.message);
                setTimeout(()=>{
                    history('/login');
                }, 2000);
            }else{
                throw new Error(response.message);
            }
        }catch(err){
            toast.error(err.message);
            reset();
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            history('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='container-fluid'>
            <div className='row main-parent vh-100 vw-100'>
                <section className='loginOuterbox col-10 col-lg-4 col-md-6 col-xs-10'>
                    <h1 className='mt-4 text-center'>SIGNUP</h1>
                    <div className='py-4 pt-5'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" {...register("name", {required: true})} placeholder="name" />
                                {errors.name && <span className='validationColor'>This field is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" {...register("email", {required: true})} placeholder="name@example.com" />
                                {errors.email && <span className='validationColor'>This field is required</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control {...register("mobile", {required: true, minLength: 10, maxLength: 10 })} type="number" placeholder="mobile" />
                                {errors.mobile && <span className='validationColor'>This field is required and must be a 10-digit number</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" {...register("password", {required: true, minLength: 8})} placeholder="password" />
                                {errors.password&&<span className='validationColor'>This field is required and must be at least 8 characters long</span>}
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Re-enter Password</Form.Label>
                                <Form.Control type="password" {...register("confirmPassword",{required: true, validate: value => value===watch('password')})} placeholder="re-renter password" />
                                {errors.confirmPassword && <span className='validationColor'>Passwords do not match</span>}
                            </Form.Group>
                            <Form.Group className="py-4 d-flex" controlId="exampleForm.ControlTextarea1">
                                <Button type='submit' size='lg' className='btn btn-primary mx-auto'>SUBMIT</Button>
                            </Form.Group>
                        </Form>
                        <ToastContainer />
                    </div>
                        <p onClick={()=> history('/login')} className='ps-3 pb-2'>already have an account ? <span style={{color: '#4d79ff', fontWeight: 'bold', cursor: 'pointer'}}>login</span></p>
                </section>
            </div> 
        </div>
    )
}

export default Signup