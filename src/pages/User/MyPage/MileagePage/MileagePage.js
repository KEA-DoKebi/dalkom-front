import SidebarLayout from "components/templete/SidebarLayout";
import MileageApprovalBody from "./MileageApprovalBody";
import React, { useEffect } from "react";
import MileageHistoryBody from "./MileageHistoryBody";
import { TokenAxios } from "apis/CommonAxios";




const Mileage = () => {

    const getMileage = async() => {
        const res = await TokenAxios(`/api/mileage/user`);
        console.log(res.data.success);
        if(res.data.success){
            // console.log(res.data.result.data);
            localStorage.removeItem("mileage");
            localStorage.setItem("mileage", res.data.result.data);
        }
    }
    
    useEffect(() => {
        getMileage();
    },[])

    return (
        <SidebarLayout>
            <MileageApprovalBody/>
            <MileageHistoryBody/>
        </SidebarLayout>
    );
};

export default Mileage;
