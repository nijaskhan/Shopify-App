import React, { useEffect, useRef, useState } from 'react';
import { GetUsers, deleteUser } from '../../apicalls/admin';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import UserEditModal from '../../components/modal/userEditModal';
import { changeLoaderFalse, changeLoaderTrue } from '../../redux/loadingSpinner/loadersAction';
import { RegisterUser } from '../../apicalls/users';

function UsersView() {
    const [users, setUsers] = useState('');
    const [selectedItem, setItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false)

    const buttonRef = useRef(null);
    const confirmBtnModal = useRef(null);
    const hideConfirmBtnModel = useRef(null);
    // edit Hook 
    const handleEditUser=(user)=>{
        setItem(user);
        setShowEditModal(true);
    }
    // until here
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();

    const handleDeleteModal = (id) => {
        setItem(id);
        confirmBtnModal.current.click();
    }
    // getting all users
    const getUsers = async () => {
        try {
            dispatch(changeLoaderTrue());
            const users = await GetUsers();
            dispatch(changeLoaderFalse());
            setUsers(users.data.users);
        } catch (err) {
            toast.error(err.message);
        }
    }
    // registering user
    const onSubmit = async (data) => {
        try {
            dispatch(changeLoaderTrue());
            const response = await RegisterUser(data);
            dispatch(changeLoaderFalse());
            if (response.success) {
                toast.success(response.message);
                setUsers([...users, data]);
                buttonRef.current.click();
                reset();
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            toast.error(err.message);
            reset();
        }
    }
    // delete user
    const handleDeleteUser = async (id) => {
        try {
            dispatch(changeLoaderTrue());
            const response = await deleteUser(id);
            dispatch(changeLoaderFalse());
            if (response.data.success) {
                toast.success(response.data.message);
                hideConfirmBtnModel.current.click();
                getUsers();
                setItem(null);
            } else {
                throw new Error("user not deleted !!");
            }
        } catch (err) {
            toast.error(err.message);
            setItem(null);
            hideConfirmBtnModel.current.click();
        }
    }
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div>
                <section className="container bg-white" style={{ overflowX: 'hidden' }}>
                    <div className="">
                        <div className='d-flex justify-content-center'>
                            <h1 className="mt-3 fw-bold border-bottom">Manage Users</h1>
                        </div>
                        <button type="button" className="btn btn-lg btn-primary mt-2 d-flex ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Add User</button>
                        {/* modal for add-user */}
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                                        <button type="button" className="btn-close" ref={buttonRef} data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="modal-body">
                                            <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlInput1">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" {...register("name", { required: true })} placeholder="name" />
                                                {errors.name && <span className='validationColor'>This field is required</span>}
                                            </Form.Group>
                                            <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlInput1">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" {...register("email", { required: true })} placeholder="name@example.com" />
                                                {errors.email && <span className='validationColor'>This field is required</span>}
                                            </Form.Group>
                                            <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Mobile</Form.Label>
                                                <Form.Control {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} type="number" placeholder="mobile" />
                                                {errors.mobile && <span className='validationColor'>This field is required and must be a 10-digit number</span>}
                                            </Form.Group>
                                            <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" {...register("password", { required: true, minLength: 8 })} placeholder="password" />
                                                {errors.password && <span className='validationColor'>This field is required and must be at least 8 characters long</span>}
                                            </Form.Group>
                                        </div>
                                        <div className="modal-footer">
                                            <Button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</Button>
                                            <Button type='submit' className="btn btn-primary">Add User</Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        {/* modal till here */}
                    </div>
                    <div className="text-center mt-5">
                        <div className="row table-responsive col-lg-12" >
                            <table className="table table-bordered table-striped table-hover" style={{ width: '100%' }} id="productsTable">
                                <thead>
                                    <tr>
                                        <th >Name</th>
                                        <th >Email</th>
                                        <th >Mobile</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users && users.map(user => {
                                            return (
                                                <tr>
                                                    <th >{user.name}</th>
                                                    <th >{user.email}</th>
                                                    <th >{user.mobile}</th>
                                                    <th >
                                                        <span><i style={{ cursor: 'pointer' }} onClick={()=>handleEditUser(user)} className="ri-edit-box-line"></i></span>
                                                        <span className='ps-4'><i style={{ cursor: 'pointer' }} onClick={() => handleDeleteModal(user._id)} className="ri-delete-bin-5-line"></i></span>
                                                    </th>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section >
            </div >
            
            {/* modal for deleteConfirmation */}
            <button type="button" class="btn d-none btn-primary" ref={confirmBtnModal} data-bs-toggle="modal" data-bs-target="#deleteUserModal"></button>
            <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">confirmation</h5>
                            <button type="button" ref={hideConfirmBtnModel} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Do you want to delete this user ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                            <button type="button" onClick={() => handleDeleteUser(selectedItem)} class="btn btn-danger">delete user</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* delete modale ends here */}

            {/* editModal */}
            {showEditModal && <UserEditModal user={selectedItem} modalVisibilty={setShowEditModal} />}
            <ToastContainer />
        </>
    )
}

export default UsersView