import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const history = useNavigate();
    return (
        <div>
            <div className='main-parent vh-100'>
                <section className='loginOuterbox'>
                    <h1 className='mt-4 text-center'>Login Now</h1>
                    <div className='py-4 pt-5'>
                        <Form>
                            <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email" />
                            </Form.Group>
                            <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="password" />
                            </Form.Group>
                            <Form.Group className="py-4 d-flex" controlId="exampleForm.ControlTextarea1">
                                <Button type='submit' size='lg' className='btn btn-primary mx-auto'>LOGIN</Button>
                            </Form.Group>
                        </Form>
                    </div>
                        <p onClick={()=> history('/signup')} className='ps-3 pb-2'>Didn't have an account ? <span style={{color: '#4d79ff', fontWeight: 'bold', cursor: 'pointer'}}>Create Now</span></p>
                </section>
            </div> 
        </div>
    )
}

export default Login