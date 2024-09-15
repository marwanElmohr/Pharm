import OrderDetails from "../../Components/OrderDetails";
import SidebarPatient from "../../MainPatient/SidebarHome";
import React from "react";

function ViewOrders() {

  return (
    <div>
      <SidebarPatient pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div>
        <OrderDetails />
      </div>
    </div>
  );
}

export default ViewOrders;