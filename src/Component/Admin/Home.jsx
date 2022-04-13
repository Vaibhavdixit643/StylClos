import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from './Box';
import adminService from '../../Services/admin.service';
import Productlist from './Productlist';
import Typelist from './Typeslist';


const Home = () => {

    let [typeCount, setTypeCount] = useState();

    let [productCount, setProductCount] = useState();

    let [countCustomer, setCountCustomer] = useState();
    let [countSeller, setCountSeller] = useState();

    useEffect(() => {
        // COUNT TYPES OF PRODUCT
        adminService.countType()
            .then(response => {
                setTypeCount(response.data);
            })
            .catch(err => {
                console.log("error while retreving type count : " + err);
            });

        // COUNT USER BY ROLE CUSTOMER
        adminService.countByRole('CUSTOMER')
            .then(response => {
                setCountCustomer(response.data);
            })
            .catch(err => {
                console.log("error while counting customer : " + err);
            })

        // COUNT USER BY ROLE SELLER
        adminService.countByRole('SELLER')
            .then(response => {
                setCountSeller(response.data);
            })
            .catch(err => {
                console.log("error while counting customer : " + err);
            })

        // COUNT NUMBER OF CATEGORY
        adminService.getProductCount()
            .then(response => {
                console.log("in category count")
                setProductCount(response.data);
            })
            .catch(err => {
                console.log("error while retreving category count : " + err);
            });


    }, [])

    let [checkProduct, setCheckProduct] = useState(false);
    let [checkTypes, setCheckTypes] = useState(true);

    const toggleProductView = () => {
        setCheckTypes(!checkTypes);
        setCheckProduct(!checkProduct);
    }

    return (<>
        <div className="row" style={{padding: "30px", backgroundColor:"#eee"}}>
            <Box name='Customers' count={countCustomer} icon="fas fa-user-alt fa-2x text-gray-300" />
            <Box name='Sellers' count={countSeller} icon="fas fa-user-alt fa-2x text-gray-300" />
            {/* <Box name='Admins' count="2" icon="fas fa-user-alt fa-2x text-gray-300" /> */}
            <Box name='Type' count={typeCount} icon="fas fa-tags fa-2x text-gray-300" />
            <Box name='Products' count={productCount} icon="fas fa-tags fa-2x text-gray-300" />
        </div>
        <div className='row'>
            <div className='col-xl-3 col-md-6 mb-4' style={{ marginLeft: "30px", padding: "30px" }}>
                <Link to={'/admin/addtype'} >
                    <button className='btn btn-primary cancel-button'>Add New Type</button>
                </Link>
            </div>
            {
                checkTypes
                    ?
                    <div className='col-xl-3 col-md-6 mb-4' style={{ marginLeft: "30px", padding: "30px" }}>
                        <button className='btn btn-primary cancel-button' onClick={toggleProductView}>View Product List</button>
                    </div>
                    :
                    <div className='col-xl-3 col-md-6 mb-4' style={{ marginLeft: "30px", padding: "30px" }}>
                        <button className='btn btn-primary cancel-button' onClick={toggleProductView}>View Type List</button>
                    </div>
            }
            {/* <div className='col-xl-3 col-md-6 mb-4' style={{ marginLeft: "30px", padding: "30px" }}>
                <button className='btn btn-primary cancel-button'>Add New Admin</button>
            </div> */}
        </div>

        {/* Types OF Type */}

        {
            checkTypes ?
                <Typelist />
                :
                null
        }

        {/* Types of Product */}
        {
            checkProduct ?
                <Productlist />
                :
                null
        }

    </>);
}

export default Home;
