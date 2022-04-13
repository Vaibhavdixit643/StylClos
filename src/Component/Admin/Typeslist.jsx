import { useEffect, useState } from "react";
import adminService from "../../Services/admin.service";

const Typelist = () => {


    let [types, setTypes] = useState([]);

    useEffect(() => {
        adminService.getAllTypes()
            .then(response => {
                console.log("response data : ", response.data);
                setTypes(response.data);
                console.log("types data : " + types);
            })
            .catch(err => {
                console.log("error while retriving data of types " + err);
            });
    }, [])

    // BELOW TWO FUNCTIONS TO DELETE TYPE FROM TYPES 
    async function deleteType(id) {
        adminService.deleteTypeById(id)
            .then(response => {
                if (response.data)
                    alert("TYPE DELETED SUCCESS");
                return response.data;
            })
            .catch(err => {
                console.log("Err in deleting Type " + id + " : " + err);
            })
    }

    const handleDeleteType = (id) => {
        let status = false;
        types.map(t => {
            if (t.id === id) {
                status = deleteType(t.id);
                if (status)
                    window.location.reload();
            }
        });
    }
    return (<>
        <div style={{ paddingLeft: "100px", paddingRight: "100px" }} className='d-flex align-items-center'>
            <div className='container-fluid nav_bg'>
                <table className="table table-hover" style={{ marginBottom: "20px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Type Name</th>
                            <th scope="col">Image</th>
                            <th scope="col" align="center">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            types ?
                                types.map(
                                    type =>
                                        <tr key={type.id}>
                                            <td>{type.typeName}</td>
                                            <td>
                                                <img src={`data:${type.imgType};base64,${type.imgData}`} alt={type.image} width={"100px"} height={"100px"} />
                                            </td>
                                            <td>
                                                {type.categoryId}
                                            </td>
                                            <td>
                                                <div>
                                                    <a href={'edit-type/' + type.id}>
                                                        <button className="btn btn-primary" style={{ backgroundColor: "mediumseagreen", marginBottom: "10px" }}>
                                                            <i className='far fa-edit' style={{ fontSize: "18px", color: "white" }} />
                                                        </button>
                                                    </a>
                                                    &emsp;
                                                    <button className="btn btn-primary" onClick={() => handleDeleteType(type.id)} style={{ backgroundColor: "red", marginBottom: "10px" }}>
                                                        <i className='far fa-trash-alt' style={{ fontSize: '18px', color: 'white' }} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                )
                                :
                                <tr>
                                    <td colSpan={4} align="center">NO TYPES AVAILABLE</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>);

}

export default Typelist;