import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../../Services/admin.service';
import FormData from 'form-data';

function getLocalItems() {
    let list = JSON.parse(sessionStorage.getItem('user'));

    if (list)
        return list;
    else
        return null;
}

const Addproduct = () => {

    let [user] = useState(getLocalItems());
    let nav = useNavigate();

    let formData = new FormData();

    let [category, setCategory] = useState(null);
    let [typeName, setTypeName] = useState(null);
    let [allCategories, setAllCategories] = useState(null);

    useEffect(() => {
        adminService.getAllCategories()
            .then(response => {
                console.log(response.data);
                setAllCategories(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    const toHome = () => {
        nav('/admin/home');
    }

    const onSubmitType = (e) => {
        e.preventDefault();
        let typeDetails = { typeName, category };

        console.log("Stringify details of product : " + JSON.stringify(typeDetails));
        formData.append('typeDetails', JSON.stringify(typeDetails));

        console.log("type Data : " + formData);

        adminService.addNewType(formData)
            .then(response => {
                console.log("onsubmit : " + response.data);
                if (response.data == false) {
                    alert("TYPE FAILED TO ADD");
                    window.location.reload();
                }
                if (response.data) {
                    alert("Type added successfully");
                    nav("/seller/home");
                }
            })
            .catch(err => {
                console.log("Error while add new product : ", err);
            });

    }

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        let file = e.target.files[0];

        if (e.target && e.target.files[0]) {
            formData.append('typeImage', e.target.files[0]);

            // CODES TO PREVIEW IMAGE WHILE UPLOADING IMAGE 
            // const reader = new FileReader();
            // reader.onload = () => {
            //     if (reader.readyState === 2) 
            //         setImagePrev(reader.result);
            // }
            // reader.readAsDataURL(file);
        }
    }

    const Category = (data) => {
        return (<>
            {data.map(d => console.log("in category : " + d.id))}
            <select name='category' value={(category) ? category.id : null} className="form-control" onChange={(e) => setCategory(e.target.value)}>
                <option value={null}>--- select category ---</option>
                {
                    (data != null) ?
                        data.map(d =>
                            <option value={d.id} key={d.id} >{d.category}</option>
                        )
                        :
                        null
                }
            </select>
        </>);
    }




    return (<>
        <section className="vh-10" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-50">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <fieldset style={{ padding: "20px" }}>
                                <legend align="center">ADD TYPE</legend>
                                {/* <form onSubmit={onSubmitType}> */}
                                <form>
                                    {/* PRODUCT NAME */}
                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputEmail1">Type name</label>
                                        <input type="text" name='typeName' onChange={(e) => setTypeName(e.target.value)} className="form-control" autoFocus />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Type Category</label>
                                        {
                                            (allCategories) ?
                                                Category(allCategories)
                                                :
                                                <select className="form-control">
                                                    <option>--- select Category ---</option>
                                                </select>
                                        }
                                    </div>

                                    
                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputPassword1">Product Image</label>
                                        <input type="file" onChange={onFileChange} accept="image/*" className="form-control" required /> <br />
                                    </div>

                                    <center>
                                        <button type="submit" onClick={onSubmitType} className="btn btn-primary profile-button">Submit</button>&emsp;
                                        <button onClick={toHome} className="btn btn-primary cancel-button" > Cancel </button>
                                    </center>
                                </form>


                                {/* 
                                    TRYING TO PREVIEW IMAGE
                                    <center><img src={imagePrev} alt="" width={"100px"} height={"100px"} /></center>
                                 */}
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Addproduct;