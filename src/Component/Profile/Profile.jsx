import './profile.css';
import { useState, useEffect } from 'react';
import userService from '../../Services/user.service';
import { useNavigate } from 'react-router-dom';
import sellerService from '../../Services/seller.service';

const getLocalItems = () => {
    let list = sessionStorage.getItem('user');
    console.log("Profile : " + list);

    if (list)
        return JSON.parse(list);
    else {
        return null;
    }
}

const Profile = () => {

    let [user] = useState(getLocalItems());

    const nav = useNavigate();
    let [userState, setUserState] = useState();

    let [address, setAddress] = useState([]);

    async function fetchAddress(user) {

        console.log("fetchAddress : " + (user != null) + " " + user.name);
        userService.getAddress(user.id)
            .then(response => {
                setAddress(response.data);
            })
            .catch(error => {
                console.log("Address Not found " + error);
            });
    }

    useEffect(() => {
        // if(user == null)
        //     nav('/login');
        fetchAddress(user);
    }, [])



    // TO TOGGLE EDIT AND SAVE BUTTONS
    let [editBtn, setEditBtn] = useState(true);
    let [details, setDetails] = useState(true);

    let [userId] = useState((user) ? user.id : null);
    let [name, setName] = useState((user) ? user.name : null);
    let [addId] = useState(address.id);
    let [areaName, setAreaName] = useState(address.areaName);
    let [city, setCity] = useState(address.city);
    let [state, setState] = useState(address.state);
    let [country, setCountry] = useState(address.country);
    let [updatedData, setUpdatedData] = useState(null);

    function edit() {
        console.log("in edit() " + details + " " + editBtn);
        setEditBtn(!editBtn);
        setDetails(!details);
        console.log("leaving edit() " + details + " " + editBtn);
        console.log("updatedData : " + areaName + " address : " + address.areaName);
    }

    function saveChanges(e) {
        e.preventDefault();

        updatedData = { userId, name, addId, areaName, city, state, country };

        console.log("updated data : " + updatedData);

        userService.updateProfile(updatedData)
            .then(response => {
                alert("Profile Updated Successfully");
                console.log(response.data);

                // UPDATES SESSION STORAGE
                userService.get(user.email)
                    .then(response => {
                        userState = (response.data);
                        console.log("updating session Storage : ", response.data, " user state : ", userState);
                        sessionStorage.setItem('user', JSON.stringify(userState));
                        window.location.reload();
                    })
                    .catch(error => {
                        console.log("Error while updating console : " + error);
                    });


            })
            .catch(err => {
                console.log("Unable to update : " + err);
                if (!err?.response) {
                    alert('No Server Response');
                } else if (err.response?.status === 400) {
                    alert('Bad Request');
                } else if (err.response?.status === 401) {
                    alert('Unauthorized');
                } else {
                    alert('Update Unsuccessful');
                }
            });
    }

    let [overlay, setOverlay] = useState(false);
    function deactivate() {
        if(user.role == 'CUSTOMER') {
            userService.deactivateCustomer(user.id)
                .then(response => {
                    if(response.data) {
                        sessionStorage.setItem('user', null);
                        alert("!! DEACTIVATION SUCCESSFUL !!");
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.log("err while deactivating customer : " + err);
                })
        }

        else if (user.role == 'SELLER') {
            sellerService.deactivateSeller(user.id)
            .then(response => {
                if(response.data) {
                    sessionStorage.setItem('user', null);
                    alert("!! DEACTIVATION SUCCESSFUL !!");
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log("err while deactivating customer : " + err);
            })
        }

        else {
            window.location.reload();
        }

    }

    const handleLogout = () => {
        nav("/logout");
    }


    return (<>

        <div className='profilepage'>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                            <span className="font-weight-bold">{(user) ? user.name : ""}</span>
                            <span className="text-black-50">{(user) ? user.email : ""}</span><span> </span>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            {
                                details ?
                                    <>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Account Details</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value={name} readOnly /></div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line" value={address.areaName} readOnly /></div>
                                            <div className="col-md-12"><label className="labels">City</label><input type="text" className="form-control" placeholder="enter address line" value={address.city} readOnly /></div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control" value={address.state} placeholder="state" readOnly /></div>
                                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value={address.country} readOnly /></div>
                                        </div>
                                    </>
                                    :
                                    <form onSubmit={(e) => saveChanges(e)}>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Edit Details</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Name</label>
                                                <input type="text" name='name' className="form-control" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <label className="labels">Area</label>
                                                <input type="text" name='area' className="form-control" value={areaName} onChange={(e) => setAreaName(e.target.value)} />
                                            </div>
                                            <div className="col-md-12">
                                                <label className="labels">City</label>
                                                <input type="text" name='city' className="form-control" placeholder={city} onChange={(e) => setCity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="labels">State</label>
                                                <input type="text" name='state' className="form-control" onChange={(e) => setState(e.target.value)} placeholder={state} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Country</label>
                                                <input type="text" name='country' className="form-control" placeholder={country} onChange={(e) => setCountry(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="mt-5 text-center">
                                            <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                                            &emsp;
                                            <button className="btn btn-primary cancel-button" onClick={edit} type="button">Cancel</button>
                                        </div>
                                    </form>
                            }
                        </div>
                        {
                            editBtn ?
                                <div className='col-md-7 border-right' id='profileEdit' >
                                    <button className="btn btn-primary" onClick={edit} style={{ backgroundColor: "mediumseagreen", marginBottom: "10px" }}>
                                        <i className='far fa-edit' style={{ fontSize: "18px", color: "white" }} />
                                    </button> &emsp;
                                    {
                                        (user && user.role == 'ADMIN')
                                            ?
                                            null
                                            :
                                            <button className="btn btn-primary logout-button" onClick={deactivate} type="button">Deactivate</button>
                                    }
                                    &nbsp;
                                    <button style={{ float: 'right', marginBottom: "10px" }} className="btn btn-primary logout-button" onClick={handleLogout} type="button">LOGOUT</button>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    </>);

}

export default Profile;