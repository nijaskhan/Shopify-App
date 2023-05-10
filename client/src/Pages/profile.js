import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { updateProfile, profileUpload } from '../apicalls/users';
import { changeLoaderFalse, changeLoaderTrue } from '../redux/loadingSpinner/loadersAction';

function Profile() {
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const user = useSelector(value => value.users.users);

    const [profilePic, setProfilePic] = useState(user.profilePic);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [mobile, setMobile] = useState(user.mobile);
    const [address, setAddress] = useState(()=> {
        if(user.address)  return user.address.address;
        else return null
    });
    const [state, setState] = useState(()=> {
        if(user.address)  return user.address.state;
        else return null
    });
    const [postcode, setPostcode] = useState(()=> {
        if(user.address)  return user.address.postcode;
        else return null
    });
    // handle-profile-picture upload
    const handleImageUpload=async(data)=>{
        try{
            const formdata = new FormData();
            formdata.append("image", data);
            dispatch(changeLoaderTrue());
            const response = await profileUpload(formdata);
            dispatch(changeLoaderFalse());
            if(response.success){
                setProfilePic(response.data);
                toast.success("profile picture uploaded");
            }else{
                throw new Error('profile picture upload failed !!');
            }
        }catch(err){
            toast.error(err.message);
        }
    }

    const submit=async(data)=>{
        try{
            dispatch(changeLoaderTrue());
            const response = await updateProfile(data);
            dispatch(changeLoaderFalse());
            if(response.success){
                toast.success(response.message);
            }else{
                throw new Error('error occured !!!');
            }
        }catch(err){
            toast.error(err.message);
        }
    }
    return (
        <>
            <div className="container-fluid profileDiv bg-white" style={{ height:'92.4vh', minHeight: '92.4vh', maxHeight: '100vh', overflow: 'auto' }}>
                <div className="row justify-content-center">
                    <div className="col-md-3 border-right text-light profile-img">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src={profilePic || `https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg`} alt='profilePic' />
                            <div class="file btn btn-lg btn-primary rounded">
                                Change Photo
                                <input type="file" id="file-input" onChange={(e)=> handleImageUpload(e.target.files[0])} />
                            </div>
                            <span className="font-weight-bold mt-3">{name}</span>
                            <span className="text-light mt-1" style={{ opacity: '0.7' }}>{email}</span>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 col-lg-6 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right text-light">Profile Settings</h4>
                            </div>
                            <form onSubmit={handleSubmit(submit)}>
                                <div className="row mt-2">
                                    <div className="col-md-12"><label className="labels">Name</label><input type="text" {...register("name", {required: true})} value={name} onChange={(e)=> setName(e.target.value)} className="form-control" placeholder="Name" /></div>
                                    {errors.name && <span className='validationColor pt-1'>This field is required</span>}
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-3"><label className="labels">Email ID</label><input type="text" {...register("email", {required: true})} className="form-control" placeholder="enter email id" value={email} onChange={(e)=> setEmail(e.target.value)} /></div>
                                    {errors.email && <span className='validationColor'>This field is required</span>}
                                    <div className="col-md-12 mt-3"><label className="labels">Mobile Number</label><input type="text" {...register("mobile", {required: true, minLength: 10, maxLength: 10})} className="form-control" placeholder="enter phone number" value={mobile} onChange={(e)=> setMobile(e.target.value)} /></div>
                                    {errors.mobile && <span className='validationColor'>This field is invalid</span>}
                                    <div className="col-md-12 mt-3"><label className="labels">Address Line 1</label><input type="text" {...register("address")} className="form-control" placeholder="enter address line 1" value={address} onChange={(e)=> setAddress(e.target.value)} /></div>
                                    {/* <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="postcode" value="" /></div> */}
                                    {/* <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="area" value="" /></div> */}
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" {...register("state")} className="form-control" value={state} onChange={(e)=> setState(e.target.value)} placeholder="state" /></div>
                                    <div className="col-md-6"><label className="labels">Postcode</label><input type="text" {...register("postcode")} className="form-control" value={postcode} onChange={(e)=> setPostcode(e.target.value)} placeholder="Postcode" /></div>
                                </div>
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Profile