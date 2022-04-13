import { useEffect, useState } from "react";
import adminService from "../../Services/admin.service";
import { useNavigate, useParams } from "react-router-dom";
import FormData from "form-data";

const Edittype = () => {

    let { id } = useParams();

    let nav = useNavigate();

    let formData = new FormData();

    let [type, setType] = useState();

    let [typeName, setTypeName] = useState();

    let [category, setCategory] = useState();

    let [updatedType, setUpdatedType] = useState();

    let [allCategories, setAllCategories] = useState();
    let [imagePrev, setImagePrev] = useState();

    useEffect(() => {
        adminService.getTypeById(id)
            .then(response => {
                setTypeName(response.data.typeName);
                setCategory(response.data.categoryId);
            })
            .catch(err => {
                console.log("err while retreving type data : " + err);
            });

        adminService.getAllCategories()
            .then(response => {
                setAllCategories(response.data);
                console.log(allCategories);
            })
            .catch(err => {
                console.log("err while getting all category in edit type : " + err);
            });

    }, []);

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        let file = e.target.files[0];

        if (e.target && e.target.files[0]) {
            formData.append('typeImage', e.target.files[0]);
        }
    }

    const updateData = (e) => {
        e.preventDefault();

        updatedType = { typeName, category }

        formData.append('updatedType', JSON.stringify(updatedType));

        console.log("updatedType : ", updatedType);

        adminService.updateType(id, formData)
            .then(response => {
                if(response.data) {
                    alert("Type updated successfully");
                    nav('/admin/home');
                }
                else {
                    console.log("Type not updated");
                }

            })
            .catch(err => {
                console.log("Error while updating type : ", err);
            })

    }

    const toHome = () => {
        nav('/admin/home');
    }

    const Category = (data) => {
        return (<>
            {data.map(d => console.log("in category : " + d.id))}
            <select name='category' value={category} className="form-control" onChange={(e) => setCategory(e.target.value)}>
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
                                <legend align="center">EDIT TYPE</legend>
                                {/* <form onSubmit={onSubmitType}> */}
                                <form>
                                    {/* PRODUCT NAME */}
                                    <div className="form-outline mb-4">
                                        <label htmlFor="exampleInputEmail1">Type name</label>
                                        <input type="text" value={typeName} onChange={(e) => setTypeName(e.target.value)} className="form-control" autoFocus />
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
                                        <button type="submit" onClick={updateData} className="btn btn-primary profile-button">Submit</button>&emsp;
                                        <button onClick={toHome} className="btn btn-primary cancel-button" > Cancel </button>
                                    </center>
                                </form>


                                {/* TRYING TO PREVIEW IMAGE */}
                                {/* <center style={{padding:"10px"}}><img src={(imagePrev) ? imagePrev : null} alt="" width={"100px"} height={"100px"} /></center> */}

                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>);

}

export default Edittype;