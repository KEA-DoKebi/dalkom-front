import SidebarLayout from "components/layout/SidebarLayout";
import MileageApprovalBody from "./MileageApprovalBody";
import React from "react";
import MileageHistoryBody from "./MileageHistoryBody";

const Mileage = () => {


  return (
    <SidebarLayout>
      <MileageApprovalBody />
      <MileageHistoryBody />
    </SidebarLayout>
  );
};

export default Mileage;
