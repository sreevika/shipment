import React from "react";
import checkCircle from "../assets/images/check_circle.png";
import transit from "../assets/images/transit.png";
import labelImg from "../assets/images/label.png";
import redAlertImg from "../assets/images/red-alert.png";
import yellowAlertImg from "../assets/images/yellow-alert.png";
import defaultImg from "../assets/images/default-img.png";

interface statusRowProp {
    status: string;
    isDelayed: boolean;
    isException: boolean;
    isDelivered :boolean;
    statusDescription:string
    
  }

  const StatusRow: React.FC<statusRowProp> = ({
    status,
    isDelayed,
    isException,
    isDelivered,
    statusDescription
   
  }) => {
    return (
      <>
        {status === "Delivered" && <img src={checkCircle} />}
        {isDelayed && <img src={yellowAlertImg} />}
        {status === "In transit" && !isDelayed && <img src={transit} />}
        {status === "Initiated" && <img src={labelImg} />}
        {(status === "Delivery exception" || status === "Shipment exception") && !isDelayed && <img src={redAlertImg} />}
        {!status || (!isDelayed && !status.includes("Delivered") && !status.includes("In transit") && !status.includes("Initiated") && !status.includes("Delivery exception") && !status.includes("Shipment exception")) && (<img src={defaultImg} alt="Default" /> )}
        &nbsp; {status}
        <br />
        {isDelivered !== true &&
        isException !== true && (
         <small>{statusDescription}</small>
          )}
      </>
    );
  };
  
  export default StatusRow;
  
