import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SellerProtectedRoute = (props) => {

    let nav = useNavigate();
    let Cmp = props.Cmp;
    let user = JSON.parse(sessionStorage.getItem('user'));

    useEffect(() => {

        if (user == null)
            if (user == null)
                nav("/seller/login");

        if (user) {
            if (user.role == "CUSTOMER")
                nav("/login");

            if (user.role == "ADMIN")
                nav("/admin/home");
        }

    }, []);

    return (<>
        <Cmp />
    </>);

}

export default SellerProtectedRoute;