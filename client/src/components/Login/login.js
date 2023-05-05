import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useForm} from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';

function Login() {
    const history = useNavigate();
    const {register, handleSubmit}  = useForm();
    const onSubmit=async(data)=>{
        try{
            const response = await LoginUser(data);
            if(response.success) {
                toast.success(response.message);
                localStorage.setItem('token', JSON.stringify(response.data));
            }
            else throw new Error(response.message);
        }catch(err){
            toast.error(err.message);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            history('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <div className='main-parent vh-100'>
                <section className='loginOuterbox'>
                    <h1 className='mt-4 text-center'>Login Now</h1>
                    <div className='py-4 pt-5'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3 mx-4" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" {...register("email", {required:true})} placeholder="email" />
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4" controlId="exampleForm.ControlInput2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control {...register("password", {required:true})} type="password" placeholder="password" />
                            </Form.Group>
                            <Form.Group className="py-4 d-flex" controlId="exampleForm.ControlTextarea1">
                                <Button type='submit' size='lg' className='btn btn-primary mx-auto'>LOGIN</Button>
                            </Form.Group>
                        </Form>
                        <ToastContainer />
                    </div>
                        <p onClick={()=> history('/signup')} className='ps-3 pb-2'>Didn't have an account ? <span style={{color: '#4d79ff', fontWeight: 'bold', cursor: 'pointer'}}>Create Now</span></p>
                </section>
            </div> 
        </div>
    )
}

export default Login