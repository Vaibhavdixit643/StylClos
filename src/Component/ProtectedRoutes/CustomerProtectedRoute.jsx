import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CustomerProtectedRoute = (props) => {

    let nav = useNavigate();
    let Cmp = props.Cmp;
    let user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {
        // console.log("Customer ProtectedRoute : " + (user == null));

        if (user == null)
            nav("/login");

        if ( user ) {
            if (user.role == "ADMIN") {
                console.log("CustomerPR in admin match");
                nav("/admin/home");
            }


            if (user.role == "SELLER") {
                console.log("CustomerPR in seller match");
                nav("/seller/home");
            }
        }

    }, []);

    return (<>
        <Cmp />
    </>);

}

export default CustomerProtectedRoute;