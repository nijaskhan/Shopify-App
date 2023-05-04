import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const history = useNavigate();
    return (
        <div className='main-parent vh-100'>
            <section className='loginOuterbox'>
                <h1 className='mt-4 text-center'>SIGNUP</h1>
                <div className='py-4 pt-5'>
                    <Form>
                        <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="name" />
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="number" placeholder="mobile" />
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="password" />
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4" style={{width: '80%'}} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control type="password" placeholder="re-renter password" />
                        </Form.Group>
                        <Form.Group className="py-4 d-flex" controlId="exampleForm.ControlTextarea1">
                            <Button type='submit' size='lg' className='btn btn-primary mx-auto'>SUBMIT</Button>
                        </Form.Group>
                    </Form>
                </div>
                    <p onClick={()=> history('/')} className='ps-3 pb-2'>already have an account ? <span style={{color: '#4d79ff', fontWeight: 'bold', cursor: 'pointer'}}>login</span></p>
            </section>
        </div> 
    )
}

export default Signup