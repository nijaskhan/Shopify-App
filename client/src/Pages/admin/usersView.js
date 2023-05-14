import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import UserEditModal from '../../components/modal/userEditModal';
import { changeLoaderFalse, changeLoaderTrue } from '../../redux/loadingSpinner/loadersAction';
import { RegisterUser } from '../../apicalls/users';
import UserDeleteModal from '../../components/modal/userDeletModal';
import { AdminUsersFetchSuccess, getUsers } from '../../redux/adminUsers/adminUsersAction';
import { searchUsers } from '../../apicalls/admin';

function UsersView() {
    const [selectedItem, setItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeletModal] = useState(false);

    const dispatch = useDispatch();

    // search-setup
    const { register: register2, handleSubmit: handleSubmit2 } = useForm()
    const onSearchSubmit = async(data) => {
        try{
            dispatch(changeLoaderTrue());
            const response = await searchUsers(data);
            dispatch(changeLoaderFalse());
            if(response.data.success){
                dispatch(AdminUsersFetchSuccess(response.data.users));
            }else{
                throw new Error(response.data.message);
            }
        }catch(err){
            toast.error(err.message)
        }
    }

    const buttonRef = useRef(null);
    const handleEditUser = (user) => {
        setItem(user);
        setShowEditModal(true);
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleDeleteModal = (user) => {
        setItem(user);
        setShowDeletModal(true);
    }

    // registering user
    const onSubmit = async (data) => {
        try {
            dispatch(changeLoaderTrue());
            const response = await RegisterUser(data);
            dispatch(changeLoaderFalse());
            if (response.success) {
                toast.success(response.message);
                dispatch(getUsers());
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

    let users = useSelector(value => value.adminUsers.adminUsers);
    useEffect(() => {
        dispatch(getUsers());
        // eslint-disable-next-line
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
                        {/* search */}
                        <form onSubmit={handleSubmit2(onSearchSubmit)} >
                            <div className='d-flex'>
                                <div className="input-group w-25">
                                    <input type="text" className="form-control me-2 position-relative rounded-3" {...register2("searchInput", { required: true })} style={{ backgroundColor: '#f2f2f2', border: 'none' }} placeholder="Search" />
                                    {/* {errors2.searchInput && <span className='validationColor'>Enter something to search</span>} */}
                                    <i className="ri-search-line position-absolute top-0 end-0 mt-1 text-muted me-3"></i>
                                </div>
                                <button type='submit' className='btn btn-primary'>search</button>
                            </div>
                        </form>
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

                    </div>

                    {/* users table */}
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
                                                        <span><i style={{ cursor: 'pointer' }} onClick={() => handleEditUser(user)} className="ri-edit-box-line"></i></span>
                                                        <span className='ps-4'><i style={{ cursor: 'pointer' }} onClick={() => handleDeleteModal(user)} className="ri-delete-bin-5-line"></i></span>
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
            {showDeleteModal && <UserDeleteModal user={selectedItem} modalVisibilty={setShowDeletModal} setItem={setItem} users={users} />}
            {/* editModal */}
            {showEditModal && <UserEditModal user={selectedItem} modalVisibilty={setShowEditModal} users={users} setItem={setItem} />}
            <ToastContainer />
        </>
    )
}

export default UsersView