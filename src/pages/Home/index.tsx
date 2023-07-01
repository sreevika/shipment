import { useEffect, useRef, useState } from "react";

import "./home-style.css";
import "./_home.scss";
import {
  dateTimeFormatToDisplay,
  dateFormatToDisplay,
  dateFormatForDb,
  timeFormatToDisplay,
} from "../../constants/dateFormatOptions";
import petsmartImg from "../../assets/images/petsmart.png";
import pangeaImg from "../../assets/images/pangea.png";
import checkCircle from "../../assets/images/check_circle.png";
import transit from "../../assets/images/transit.png";
import labelImg from "../../assets/images/label.png";
import redAlertImg from "../../assets/images/red-alert.png";
import yellowAlertImg from "../../assets/images/yellow-alert.png";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import axios from "axios";
import _ from 'lodash';

//generic method to format time
function formatDate(dateTime: any, format: Intl.DateTimeFormatOptions): string {
  if (dateTime == null) return "";
  const tempDate = new Date(dateTime);
  const formattedDateTime = tempDate.toLocaleString("en-US", format);
  return formattedDateTime;
}
interface filterTitle {
  name : string;
  value : number;
}
interface shipment {
  id: number;
  trackingNumberUniqueId: string;
  trackingNumber: string;
  deliveryCompany: string | null;
  storeId: string | null;
  storeDivision: string;
  storeZip: string | null;
  shipDate: string;
  accountNumber: string;
  purchaseOrderNumber: string | null;
  masterTrackingNumber: string | null;
  status: string;
  statusCode: string;
  statusDescription: string;
  shipperName: string;
  shipperCompany: string;
  shipperCity: string;
  shipperState: string;
  scheduledDeliveryDate: string | null;
  scheduledDeliveryTimeBefore: string | null;
  recipientContactName: string | null;
  recipientCompany: string | null;
  recipientAddress: string | null;
  recipientCity: string;
  recipientState: string;
  recipientCountry: string;
  reference: string | null;
  direction: string | null;
  fedExCompany: string;
  numberOfAttemptedDeliveries: number;
  deliveredTime: string | null;
  packageWeightKg: string;
  packageWeightLbs: string;
  receivedBy: string | null;
  recipientPostal: string;
  shippedBy: string;
  shippedTo: string | null;
  shipperAddress: string;
  shipperCountry: string;
  shipperPostal: string;
  specialHandling: string;
  serviceType: string;
  totalWeightInKg: number;
  totalWeightInLbs: number;
  packageCount: number;
  insertedTime: string;
  updatedTime: string;
  isDelayed: boolean;
  isException: boolean;
  isOnTime: boolean;
  isDelivered: boolean;
  isEarly: boolean;
  isCancelled: boolean;
  isOutForDelivery: boolean;
}

function dashboardIconPack(iconName: string) {
  switch (iconName) {
    case "onTime":
      return (
        <svg
          width="28"
          height="20"
          viewBox="0 0 28 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6665 19.3334V11.3334H0.666504V8.66675H12.6665V0.666748L27.3332 10.0001L12.6665 19.3334Z"
            fill="#0067B2"
          />
        </svg>
      );
    case "error":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0001 20.6665C14.3334 20.6665 14.6113 20.5556 14.8337 20.3337C15.0556 20.1113 15.1665 19.8334 15.1665 19.5001C15.1665 19.1668 15.0556 18.8833 14.8337 18.6497C14.6113 18.4166 14.3334 18.3001 14.0001 18.3001C13.6668 18.3001 13.3889 18.4166 13.1665 18.6497C12.9446 18.8833 12.8337 19.1668 12.8337 19.5001C12.8337 19.8334 12.9446 20.1113 13.1665 20.3337C13.3889 20.5556 13.6668 20.6665 14.0001 20.6665ZM12.9665 15.5001H15.1665V7.2001H12.9665V15.5001ZM14.0001 27.3337C12.1558 27.3337 10.4281 26.9836 8.8169 26.2833C7.2057 25.5836 5.7945 24.6281 4.5833 23.4169C3.3721 22.2057 2.41664 20.7945 1.7169 19.1833C1.01664 17.5721 0.666504 15.8444 0.666504 14.0001C0.666504 12.1558 1.01664 10.4225 1.7169 8.8001C2.41664 7.1777 3.3721 5.7665 4.5833 4.5665C5.7945 3.3665 7.2057 2.41664 8.8169 1.7169C10.4281 1.01664 12.1558 0.666504 14.0001 0.666504C15.8444 0.666504 17.5777 1.01664 19.2001 1.7169C20.8225 2.41664 22.2337 3.3665 23.4337 4.5665C24.6337 5.7665 25.5836 7.1777 26.2833 8.8001C26.9836 10.4225 27.3337 12.1558 27.3337 14.0001C27.3337 15.8444 26.9836 17.5721 26.2833 19.1833C25.5836 20.7945 24.6337 22.2057 23.4337 23.4169C22.2337 24.6281 20.8225 25.5836 19.2001 26.2833C17.5777 26.9836 15.8444 27.3337 14.0001 27.3337Z"
            fill="#E5002E"
          />
        </svg>
      );
    case "outbound":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.2336 24C1.6336 24 1.1112 23.7779 0.6664 23.3336C0.222134 22.8888 0 22.3664 0 21.7664V2.2336C0 1.6336 0.222134 1.1112 0.6664 0.6664C1.1112 0.222134 1.6336 0 2.2336 0H21.7664C22.3664 0 22.8888 0.222134 23.3336 0.6664C23.7779 1.1112 24 1.6336 24 2.2336V21.7664C24 22.3664 23.7779 22.8888 23.3336 23.3336C22.8888 23.7779 22.3664 24 21.7664 24H2.2336ZM5.3336 18.6664H12V16H5.3336V18.6664ZM6.6664 13.1L12 10.4336L17.3336 13.1V2.2336H6.6664V13.1Z"
            fill="#4B1088"
          />
        </svg>
      );
    case "caution":
      return (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0001 20.6665C14.3334 20.6665 14.6113 20.5556 14.8337 20.3337C15.0556 20.1113 15.1665 19.8334 15.1665 19.5001C15.1665 19.1668 15.0556 18.8833 14.8337 18.6497C14.6113 18.4166 14.3334 18.3001 14.0001 18.3001C13.6668 18.3001 13.3889 18.4166 13.1665 18.6497C12.9446 18.8833 12.8337 19.1668 12.8337 19.5001C12.8337 19.8334 12.9446 20.1113 13.1665 20.3337C13.3889 20.5556 13.6668 20.6665 14.0001 20.6665ZM12.9665 15.5001H15.1665V7.2001H12.9665V15.5001ZM14.0001 27.3337C12.1558 27.3337 10.4281 26.9836 8.8169 26.2833C7.2057 25.5836 5.7945 24.6281 4.5833 23.4169C3.3721 22.2057 2.41664 20.7945 1.7169 19.1833C1.01664 17.5721 0.666504 15.8444 0.666504 14.0001C0.666504 12.1558 1.01664 10.4225 1.7169 8.8001C2.41664 7.1777 3.3721 5.7665 4.5833 4.5665C5.7945 3.3665 7.2057 2.41664 8.8169 1.7169C10.4281 1.01664 12.1558 0.666504 14.0001 0.666504C15.8444 0.666504 17.5777 1.01664 19.2001 1.7169C20.8225 2.41664 22.2337 3.3665 23.4337 4.5665C24.6337 5.7665 25.5836 7.1777 26.2833 8.8001C26.9836 10.4225 27.3337 12.1558 27.3337 14.0001C27.3337 15.8444 26.9836 17.5721 26.2833 19.1833C25.5836 20.7945 24.6337 22.2057 23.4337 23.4169C22.2337 24.6281 20.8225 25.5836 19.2001 26.2833C17.5777 26.9836 15.8444 27.3337 14.0001 27.3337Z"
            fill="#E9B430"
          />
        </svg>
      );
    case "success":
      return (
        <svg
          width="30"
          height="28"
          viewBox="0 0 30 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.4668 28L7.9335 23.7333L3.1335 22.6667L3.60016 17.7333L0.333496 14L3.60016 10.2667L3.1335 5.33333L7.9335 4.26667L10.4668 0L15.0002 1.93333L19.5335 0L22.0668 4.26667L26.8668 5.33333L26.4002 10.2667L29.6668 14L26.4002 17.7333L26.8668 22.6667L22.0668 23.7333L19.5335 28L15.0002 26.0667L10.4668 28ZM13.6002 18.7333L21.1335 11.2L19.2668 9.26667L13.6002 14.9333L10.7335 12.1333L8.86683 14L13.6002 18.7333Z"
            fill="#008903"
          />
        </svg>
      );
  }
}

function getFilterValueforUI(value : string) {
  return value;
}

let originalRows: shipment[] = [];
let originalRows_backup: shipment[] = [];
const EDUCONNECT_URL = `https://shipmenttrackingapi-qa.signsharecloud.com/api`;
export default function HomePage() {
  const [rows, setRows] = useState<shipment[]>([]);
  const token = localStorage.getItem("Authorization");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${EDUCONNECT_URL}/Dashboard/fedex?fromDate=${formatDate(
            fromDate,
            dateFormatForDb
          )}&toDate=${formatDate(toDate, dateFormatForDb)}`,
          config
        );
        originalRows = response.data.data;
        originalRows_backup = response.data.data;
        setRows(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  console.log(JSON.stringify(originalRows_backup));
  const navigate = useNavigate(); // Use the useNavigate hook here

  const [searchType, setSearchType] = useState("Store ID");
  const [searchValue, setSearchValue] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [storeId, setStoreId] = useState("");
  const dropdownRef = useRef(null);
  const [selectedList, setSelectedList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const handleLogout = () => {
    navigate("/login"); // Use the navigate function to navigate to the login page
  };
  let originalRows1 = originalRows;
  let filterBlockData = originalRows
  const selectSearchType = () => {
    setDropDown(!dropDown);
  };
  const onchangeSearchType = (value: string) => {
    setSearchType(value);
    setDropDown(!dropDown);
    clearSearchValue();
  };
  const searchValueChange = (e: { target: { value: any } }) => {
    setSearchValue(e.target.value);
  };
  const clearSearchValue = () => {
    setSearchValue("");
    console.log(JSON.stringify(originalRows_backup));
    originalRows = originalRows_backup;
    setRows(originalRows);
    setStoreId("");
    setSelectedList([]);
    setCardSelected("");

    
  };
  const clearFilter = (value: string) => {
    clearSearchValue();
  }
  

  const searchData = (event: { key: string }) => {
    if (event.key === "Enter") {
      setCardSelected("");

      if (searchValue != "") {
        if (searchType == "Store ID") {
          setStoreId(searchValue);
          originalRows = originalRows_backup;
          originalRows1 = originalRows.filter((item) => {
            return Object.keys(item).some(() => item.storeId == searchValue);
          });
          originalRows_backup = originalRows;
          originalRows = originalRows1;
        } else {
          originalRows1 = originalRows.filter((item) => {
            return Object.keys(item).some(
              () => item.trackingNumber == searchValue
            );
          });
        }
      } else {
        originalRows1 = originalRows_backup;
      }

      setRows(originalRows1);
    }
  };

  const onTimeCount = Object.keys(
    originalRows.filter((item) => item.isOnTime === true)
  ).length;
  const exceptionCount = Object.keys(
    originalRows.filter(
      (item) => item.isException === true && item.isDelivered === false
    )
  ).length;
  const deliveredCount = Object.keys(
    originalRows.filter((item) => item.isDelivered === true)
  ).length;
  const delayedCount = Object.keys(
    originalRows.filter((item) => item.isDelayed === true)
  ).length;
  const earlyDeliveryCount = Object.keys(
    originalRows.filter((item) => item.isEarly === true)
  ).length;

  const inTransitCount = Object.keys(
    originalRows.filter((item) => item.status === "In transit")
  ).length;

  const labelCreatedCount = Object.keys(
    originalRows.filter((item) => item.status === "Initiated")
  ).length;

  const outForDeliveryCount = Object.keys(
    originalRows.filter((item) => item.status === "In transit" &&  formatDate(item.shipDate, dateFormatToDisplay) == formatDate(new Date(), dateFormatToDisplay) )
  ).length;
  const cancelledCount = Object.keys(
    originalRows.filter((item) => item.isCancelled === true)
  ).length;

  const deliveredTodayCount = Object.keys(
    originalRows.filter(
      (item) =>
        item.isDelivered === true &&
        formatDate(item.deliveredTime, dateFormatToDisplay) ==
          formatDate(new Date(), dateFormatToDisplay)
    )
  ).length;
 const accountNumberCount = _.uniqBy(originalRows, 'accountNumber').length;
 const deliveryDateCount = _.uniqBy(originalRows,  'deliveredTime').length;
 const attemptedDeliveryCount = _.uniqBy(originalRows, "numberOfAttemptedDeliveries").length;
 const packageKgCount = _.uniqBy(originalRows, "packageWeightKg").length;
 const packageLbsCount = _.uniqBy(originalRows, "packageWeightLbs").length;
 const purchaseOrderNumberCount = _.uniqBy(originalRows, "purchaseOrderNumber").length;
 const referenceCount = _.uniqBy(originalRows, "reference").length;
 const scheduledDeliveryDateCount = _.uniqBy(originalRows, "scheduledDeliveryDate").length;
 const shipDateCount = _.uniqBy(originalRows, "shipDate").length;
  let ShipmentInformationArr = [{ name: 'Account Number', value: accountNumberCount},
  { name: 'Delivered Date', value:deliveryDateCount },
  { name: 'Number Of Attempted Deliveries', value: attemptedDeliveryCount },
  { name: 'Package Weight (Kg)', value:packageKgCount },
  { name: 'Package Weight (Lbs)', value: packageLbsCount },
  { name: 'Purchase Order Number', value: purchaseOrderNumberCount },
  { name: 'Reference', value:referenceCount },
  { name: 'Scheduled Delivery Date', value: scheduledDeliveryDateCount },
  { name: 'Ship Date', value: shipDateCount}
];

  //FOR VALIDATION
  originalRows.forEach((item) => {
    const deliveredTime = formatDate(item.deliveredTime, dateFormatToDisplay);
    const currentDate = formatDate(new Date(), dateFormatToDisplay);
    console.log(deliveredTime + " " + currentDate);
  });

  //Find date interval
  const toDate = new Date();
  const fromDate = new Date(toDate.getTime() - 14 * 24 * 60 * 60 * 1000);
  // const todayDate = getFormattedDate(toDate);
  // const lastDayDate = getFormattedDate(fromDate);
  // console.log("sasaas" + todayDate);

  const [isCardSelected, setCardSelected] = useState("");

  const filterByBlock = (value: string) => {
   
    let tempArr = [];
    tempArr.push(getFilterValueforUI(value));
    setSelectedList(tempArr);


    setCardSelected(value);
    if (searchType != "Store ID") {
      setSearchValue("");
    }

    if (value === "") setRows(originalRows);
    else {
      let filteredData = originalRows;
      if (value === "all") {
        filteredData = originalRows;
      } else if (value === "onTime") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(() => item.isOnTime == true);
        });
      } else if (value === "exception") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(
            () => item.isException == true && item.isDelivered == false
          );
        });
      } else if (value === "delivered") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(() => item.isDelivered == true);
        });
      } else if (value === "delayed") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(() => item.isDelayed == true);
        });
      } else if (value === "early") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(() => item.isEarly == true);
        });
      } else if (value === "cancelled") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(() => item.isCancelled == true);
        });
      } else if (value === "outForDelivery") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(
            () => item.status === "In transit" && formatDate(item.shipDate, dateFormatToDisplay) == formatDate(new Date(), dateFormatToDisplay) 
          );
        });
      } else if (value === "deliveredToday") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(
            () =>
              formatDate(item.deliveredTime, dateFormatToDisplay) ==
                formatDate(new Date(), dateFormatToDisplay) &&
              item.isDelivered == true
          );
        });
      }
      //setRows(filteredData);
      filterBlockData  = filteredData;
      setRows(filterBlockData);
      console.log("FILLL"+JSON.stringify(filterBlockData))
      
    }
  };
  const [userinfo, setUserInfo] = useState([]);
 
  const shipperChange = (e :any)  => {
    e.preventDefault();
    const { value, checked } = e.target;
    let tempArr = [];

    if (checked) {
      tempArr = [...userinfo, value];
    } else {
      tempArr = userinfo.filter((e) => e !== value);
    }

    setUserInfo(tempArr);
  };
  useEffect(() => {
    
  }, [userinfo]);


  //first layer filter selection
  const [shipperInfo1, setShipperInfo1] = useState([]);
  const [innerFilterJson1, setInnerFilterJson1] = useState([]);
  let accountNumberArr: any[] =[];
  let deliveredDateArr: any[] =[];
  let noOfAttemptArr :any[]=[];
  let packageKgArr :any[]=[];
  let packageLbsArr :any[] =[];
  let purchaseOrderNumberArr :any[] =[];
  let referenceArr :any[] =[];
  let scheduledDeliveryDateArr :any[] =[]
  let shipDateArr :any[] =[]
  const shipperInfoChange = (e :any)  => {
    e.preventDefault();
    const { value, checked } = e.target;
    let shipperInfoFilter =[];
    if(checked) {
     
      shipperInfoFilter = userinfo.concat(value);
      if(value == "Account Number") {
  

         accountNumberArr = _.chain(originalRows)
      .groupBy('accountNumber')
      .map((items, name) => ({ name, count: items.length, type: 'accountNo' }))
      .value();

    setInnerFilterJson1(accountNumberArr);
      } else if(value == "Delivered Date") {
        deliveredDateArr = _(originalRows)
        .groupBy('deliveredTime')
        .map((items, name) => ({ name, count: items.length , type:"deliveredDate"}))
        .value();
        setInnerFilterJson1(deliveredDateArr);

      } else if(value == "Number Of Attempted Deliveries") {
         noOfAttemptArr = _(originalRows)
        .groupBy('numberOfAttemptedDeliveries')
        .map((items, name) => ({ name, count: items.length , type:"noOfAttempt"}))
        .value();
        setInnerFilterJson1(noOfAttemptArr);

      } else if(value == "Package Weight (Kg)") {
        packageKgArr = _(originalRows)
       .groupBy('packageWeightKg')
       .map((items, name) => ({ name, count: items.length , type:"packageKg"}))
       .value();
       setInnerFilterJson1(packageKgArr);

     } else if(value == "Package Weight (Lbs)") {
      packageLbsArr = _(originalRows)
      .groupBy('packageWeightLbs')
      .map((items, name) => ({ name, count: items.length , type:"packageLbs"}))
      .value();
      setInnerFilterJson1(packageLbsArr);

     } else if(value == "Purchase Order Number") {
      purchaseOrderNumberArr = _(originalRows)
      .groupBy('purchaseOrderNumber')
      .map((items, name) => ({ name, count: items.length , type:"purchaseOrderNumber"}))
      .value();
      setInnerFilterJson1(purchaseOrderNumberArr);

     } else if(value == "Reference") {
      referenceArr = _(originalRows)
      .groupBy('reference')
      .map((items, name) => ({ name, count: items.length , type:"reference"}))
      .value();
      setInnerFilterJson1(referenceArr);

    } else if(value == "Scheduled Delivery Date") {
     
      scheduledDeliveryDateArr = _(originalRows)
      .groupBy('scheduledDeliveryDate')
      .map((items, name) => ({ name, count: items.length , type:"scheduledDeliveryDate"}))
      .value();
      setInnerFilterJson1(scheduledDeliveryDateArr);

     } else if(value == "Ship Date") {
     
      shipDateArr = _(originalRows)
      .groupBy('shipDate')
      .map((items, name) => ({ name, count: items.length , type:"shipDate"}))
      .value();
      setInnerFilterJson1(shipDateArr);

     }

      
    
    } else {
      shipperInfoFilter = userinfo.filter((e) => e !== value);
    }
    setUserInfo(shipperInfoFilter);
  }
  
//second layer filter
const [filter__accountNo, set_filter__accountNo] = useState([]);
const [filter__deliveredDate, set_filter__deliveredDate] = useState([]);
const [filter__attemptDelivery, set_filter__attemptDelivery] = useState([]);
const [filter__packageKg, set_filter__packageKg] = useState([]);
const [filter__packageLbs, set_filter__packageLbs] = useState([]);
const [filter__purchaseOrderNo, set_filter__purchaseOrderNo] = useState([]);
const [filter__reference, set_filter__reference] = useState([]);
const [filter_scheduledDeliveryDate, set_filter_scheduledDeliveryDate] = useState([]);
const [filter_shipDate, set_filter_shipDate] = useState([]);
  const valueBasedFilter = (e :any, type :any)  => {
   
    e.preventDefault();
    const { value, checked } = e.target;
    let tempArr = [];
    if(type == "accountNo") {
      if (checked) {
        tempArr = [...filter__accountNo, value];
      } else {
        tempArr = filter__accountNo.filter((e) => e !== value);
      }

      set_filter__accountNo(tempArr);
    }
    if(type == "deliveredDate") {
      if (checked) {
        tempArr = [...filter__deliveredDate, value];
      } else {
        tempArr = filter__deliveredDate.filter((e) => e !== value);
      }

      set_filter__deliveredDate(tempArr);
    }
    if(type == "noOfAttempt") {
      if (checked) {
       
        tempArr = [...filter__attemptDelivery, value];
      } else {
        tempArr = filter__attemptDelivery.filter((e) => e !== value);
      }

      set_filter__attemptDelivery(tempArr);
    }

    if(type == "packageKg") {
      if (checked) {
       
        tempArr = [...filter__packageKg, value];
      } else {
        tempArr = filter__packageKg.filter((e) => e !== value);
      }

      set_filter__packageKg(tempArr);
    }
    if(type == "packageLbs") {
      if (checked) {
       
        tempArr = [...filter__packageLbs, value];
      } else {
        tempArr = filter__packageLbs.filter((e) => e !== value);
      }

      set_filter__packageLbs(tempArr);
    }
    if(type == "purchaseOrderNumber") {
      if (checked) {
       
        tempArr = [...filter__purchaseOrderNo, value];
      } else {
        tempArr = filter__purchaseOrderNo.filter((e) => e !== value);
      }

      set_filter__purchaseOrderNo(tempArr);
    }

    if(type == "reference") {
      if (checked) {
       
        tempArr = [...filter__reference, value];
      } else {
        tempArr = filter__reference.filter((e) => e !== value);
      }

      set_filter__reference(tempArr);
    }
    if(type == "scheduledDeliveryDate") {
      if (checked) {
       
        tempArr = [...filter_scheduledDeliveryDate, value];
      } else {
        tempArr = filter_scheduledDeliveryDate.filter((e) => e !== value);
      }

      set_filter_scheduledDeliveryDate(tempArr);
    }
    if(type == "shipDate") {
      if (checked) {
       
        tempArr = [...filter_shipDate, value];
      } else {
        tempArr = filter_shipDate.filter((e) => e !== value);
      }

      set_filter_shipDate(tempArr);
    }



  };
  useEffect(() => {

  }, [filter__accountNo]);
  useEffect(() => {

  }, [filter__attemptDelivery]);
  useEffect(() => {

  }, [filter__deliveredDate]);
  useEffect(() => {

  }, [filter__packageKg]);
  useEffect(() => {

  }, [filter__packageLbs]);
  useEffect(() => {

  }, [filter__reference]);
  useEffect(() => {

  }, [filter_scheduledDeliveryDate]);
  useEffect(() => {

  }, [filter_shipDate]);
  



  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const [innerFilter, setInnerFilter] = useState(1);
  const [innerFilterJson, setInnerFilterJson] = useState([]);
  const filterTitleArray = [];

  const showInnerFilter = (val : number) => {
    if(val == 1){
      setInnerFilter(1);
    } else if(val == 2) {
      setInnerFilterJson(ShipmentInformationArr);
      setInnerFilter(2);
    }
  }
  const applyFilter = () => {
    if(selectedList.length >0) {
      const combinedArray = selectedList.concat(userinfo);
      const uniqueArray = combinedArray.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setSelectedList(uniqueArray)
    } else {
      const combinedArray = userinfo;
      setSelectedList(combinedArray)
    }
    

  
    let filteredData :shipment[] =[];
    let filteredData_delayed, filteredData_delivered, filteredData_exception, filteredData_intransit,
    filteredData_label :shipment[] =[];
   let filterConditions ="";
    if(userinfo.length >0) {
      if(userinfo.includes("delayed")) {
        filteredData_delayed = rows.filter((item) => {
          return Object.keys(item).some(() => item.isDelayed == true);
        });
        console.log("FILL"+JSON.stringify(filteredData_delayed))
        filteredData = filteredData.concat(filteredData_delayed)
        console.log("FILL"+JSON.stringify(filteredData))
      }

      if(userinfo.includes("delivered")) {
        filteredData_delivered = rows.filter((item) => {
          return Object.keys(item).some(() => item.isDelivered == true);
        });
        filteredData = filteredData.concat(filteredData_delivered)
      }

      if(userinfo.includes("exception")) {
        filteredData_exception = rows.filter((item) => {
          return Object.keys(item).some(() => item.isException == true);
        });
        filteredData =  filteredData.concat(filteredData_exception)
      }

      
      if(userinfo.includes("inTransit")) {
        filteredData_intransit = rows.filter((item) => {
          return Object.keys(item).some(() => item.status == "In transit");
        }); 
        filteredData =  filteredData.concat(filteredData_intransit)
      }

      if(userinfo.includes("label")) {
        filteredData_label = rows.filter((item) => {
          return Object.keys(item).some(() => item.status == "Initiated");
        }); 
        filteredData =  filteredData.concat(filteredData_label)
      }
      if(userinfo.includes("Account Number")) {
     
        const filteredData_accountNo = rows.filter((item) => filter__accountNo.includes(item.accountNumber));
       
        filteredData =  filteredData.concat(filteredData_accountNo)
      }
      if(userinfo.includes("Delivered Date")) {
     
        const filteredData_deliveredDate = rows.filter((item) => filter__deliveredDate.includes(item.deliveredTime));
       
        filteredData =  filteredData.concat(filteredData_deliveredDate)
      }

      if(userinfo.includes("Number Of Attempted Deliveries")) {
        let filter__attemptDelivery1 = filter__attemptDelivery.map((str) => parseInt(str));
       
        const filteredData_attemptDelivery = rows.filter((item) => filter__attemptDelivery1.includes(item.numberOfAttemptedDeliveries));
       
        filteredData =  filteredData.concat(filteredData_attemptDelivery)
      }

      if(userinfo.includes("Package Weight (Kg)")) {
      
     
        const filteredData_packageKg = rows.filter((item) => filter__packageKg.includes(item.packageWeightKg));
       
        filteredData =  filteredData.concat(filteredData_packageKg)
      }
      if(userinfo.includes("Package Weight (Lbs)")) {
      
     
        const filteredData_packageLbs = rows.filter((item) => filter__packageLbs.includes(item.packageWeightLbs));
       
        filteredData =  filteredData.concat(filteredData_packageLbs)
      }

      if(userinfo.includes("Purchase Order Number")) {
      
     
        const filteredData_purchaseOrderNumber = rows.filter((item) => filter__purchaseOrderNo.includes(item.purchaseOrderNumber));
       
        filteredData =  filteredData.concat(filteredData_purchaseOrderNumber)
      }

      if(userinfo.includes("Reference")) {
      
     
        const filteredData_reference = rows.filter((item) => filter__reference.includes(item.reference));
       
        filteredData =  filteredData.concat(filteredData_reference)
      }
      if(userinfo.includes("Scheduled Delivery Date")) {
      
    
        const filteredData_scheduledDeliveryDate = rows.filter((item) => filter_scheduledDeliveryDate.includes(item.scheduledDeliveryDate));
       
        filteredData =  filteredData.concat(filteredData_scheduledDeliveryDate)
      }
      if(userinfo.includes("Ship Date")) {
      
    
        const filteredData_shipDate = rows.filter((item) => filter_shipDate.includes(item.shipDate));
       
        filteredData =  filteredData.concat(filteredData_shipDate)
      }
      
    } 
   
    setRows(filteredData);
  }
  

  // Rest of your code...

  return (
    <>
      <div ref={dropdownRef}>
        <nav className="header-navigation">
          <div className="container max-container header-navigation-container">
            <div className="header-navigation__product-image">
              <a
                href="#"
                className="header-navigation__logo-item header-navigation__ps-logo"
              >
                <img
                  className="ps-logo__image"
                  src={petsmartImg}
                  alt="Pet Smart Logo"
                />
              </a>
              <a
                href="#"
                className="header-navigation__logo-item  header-navigation-pg-logo"
              >
                <img
                  className="pg-logo__image"
                  src={pangeaImg}
                  alt="Pangea Logo"
                />
              </a>
            </div>
            <ul className="header-navigation__menu">
              <li className="header-navigation__menu-item">
                <a href="#" className="header-navigation__menu-link active">
                  FedEx
                </a>
              </li>
              {/* <li className="header-navigation__menu-item">
              <a href="#" className="header-navigation__menu-link">
                UPS
              </a>
            </li> */}
            </ul>
            <div className="header-navigation__search-bar">
              <div className="header-navigation__search-select">
                <button
                  className="header-navigation__search-select-input"
                  onClick={selectSearchType}
                >
                  {searchType}
                  <svg
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0L3.75 3.75L7.5 0H0Z" fill="#737274" />
                  </svg>
                </button>
                {/* use normal click function to handle dropdown since this is custom */}
                {/* <select
              className="header-navigation__search-select-input"
              value={searchType}
              onChange={searchTypeSelectionChange}
            >
              <option value="storeId">Store ID</option>
              <option value="trackNo">Tracking Number</option>
            </select> */}
                {/* add active class below to show the dropdown */}
                <div
                  className={
                    dropDown
                      ? "search-select-dropdown active"
                      : "search-select-dropdown "
                  }
                >
                  <ul className="search-select-dp-wrapper ">
                    <li
                      className="search-select-dp-item"
                      onClick={() => onchangeSearchType("Store ID")}
                    >
                      <a>Store ID</a>
                    </li>
                    <li
                      className="search-select-dp-item"
                      onClick={() => onchangeSearchType("Tracking number")}
                    >
                      <a>Tracking number</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header-navigation__search-input-box">
                <div className="header-navigation__search-wrapper">
                  <div className="search__input-box-prefix">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                        fill="black"
                        fillOpacity="0.54"
                      />
                    </svg>
                  </div>

                  <input
                    type="text"
                    className="search__input-box"
                    placeholder="search..."
                    value={searchValue}
                    onChange={searchValueChange}
                    onKeyDown={searchData}
                  />
                  <button
                    className="search__input-box-suffix"
                    onClick={clearSearchValue}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                        fill="#0067B2"
                      />
                    </svg>
                  </button>
                </div>

                {/* add active class below to show the dropdown */}
                {/* <div  className={dropDown ? "search-select-dropdown active" : "search-select-dropdown "}>
                <ul className="search-select-dp-wrapper">
                  <li className="search-select-dp-item" onClick={() => onchangeSearchType("Store ID")}>
                    <a >
                      Store ID
                    </a>
                  </li>
                  <li className="search-select-dp-item" onClick={() => onchangeSearchType("Tracking number")}>
                    <a href="#">
                      Tracking number
                    </a>

                  </li>
                </ul>
              </div> */}
              </div>
            </div>
            <div className="header-navigation__profile">
              <ul className="header-navigation__actions">
                {/* <li className="header-navigation__item-actions">
                <a href="#" className="header-navigation__item-actions-anchor">
                  <div className="header-navigation__item-actions-icon">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.74999 11.583C1.37533 11.583 1.05933 11.4547 0.801992 11.198C0.545326 10.9407 0.416992 10.6247 0.416992 10.25V1.74999C0.416992 1.37533 0.545326 1.05933 0.801992 0.801992C1.05933 0.545326 1.37533 0.416992 1.74999 0.416992H14.25C14.6247 0.416992 14.9407 0.545326 15.198 0.801992C15.4547 1.05933 15.583 1.37533 15.583 1.74999V10.25C15.583 10.6247 15.4547 10.9407 15.198 11.198C14.9407 11.4547 14.6247 11.583 14.25 11.583H1.74999ZM7.99999 6.62499L1.49999 2.81199V10.25C1.49999 10.3193 1.52433 10.3783 1.57299 10.427C1.62166 10.4757 1.68066 10.5 1.74999 10.5H14.25C14.3193 10.5 14.3783 10.4757 14.427 10.427C14.4757 10.3783 14.5 10.3193 14.5 10.25V2.81199L7.99999 6.62499ZM7.99999 5.22899L14.375 1.49999H1.62499L7.99999 5.22899ZM1.49999 2.81199V1.49999V10.25C1.49999 10.3193 1.52433 10.3783 1.57299 10.427C1.62166 10.4757 1.68066 10.5 1.74999 10.5H1.49999V10.25V2.81199Z" fill="#0067B2" />
                    </svg>
                  </div>
                  <div className="header-navigation__item-actions-text">
                    Alerts
                  </div>
                </a>
              </li> */}
                <li className="header-navigation__item-actions">
                  <a
                    href="#"
                    className="header-navigation__item-actions-anchor"
                    onClick={handleLogout}
                  >
                    <div className="header-navigation__item-actions-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.833 14C1.45833 14 1.14233 13.8717 0.885 13.615C0.628333 13.3577 0.5 13.0417 0.5 12.667V1.74999C0.5 1.37533 0.628333 1.05933 0.885 0.801992C1.14233 0.545326 1.45833 0.416992 1.833 0.416992H7.104V1.49999H1.833C1.77767 1.49999 1.72233 1.52766 1.667 1.58299C1.611 1.63899 1.583 1.69466 1.583 1.74999V12.667C1.583 12.7223 1.611 12.7777 1.667 12.833C1.72233 12.889 1.77767 12.917 1.833 12.917H7.104V14H1.833ZM10.604 10.104L9.833 9.33299L11.417 7.74999H5.104V6.66699H11.417L9.833 5.08299L10.604 4.31199L13.5 7.20799L10.604 10.104Z"
                          fill="#0067B2"
                        />
                      </svg>
                    </div>
                    <div className="header-navigation__item-actions-text">
                      Logout
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="body__content">
        <div className="hero-banner">
          <div className="container mid-container hero-banner__container">
            <div className="hero-banner__container--title">
              <div className="hero-banner__container-sub-title">{storeId}</div>
              <div className="hero-banner__container-main-title">
                Shipment Dashboard
              </div>
            </div>
            <div className="hero-banner__container--date">
              {formatDate(fromDate, dateFormatToDisplay)} -{" "}
              {formatDate(toDate, dateFormatToDisplay)}
            </div>
          </div>
        </div>
        <div className="dashboard-at-glance container mid-container">
          {/* use object/array to handle this */}
          <button
            className={
              isCardSelected == "onTime"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("onTime")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("onTime")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {onTimeCount}
              </div>
              <div className="dashboard-at-glance__card-title">On Time</div>
            </div>
          </button>
          <button
            className={
              isCardSelected == "exception"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("exception")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("error")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {exceptionCount}
              </div>
              <div className="dashboard-at-glance__card-title">Exceptions</div>
            </div>
          </button>

          <button
            className={
              isCardSelected == "outForDelivery"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("outForDelivery")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("outbound")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {outForDeliveryCount}
              </div>
              <div className="dashboard-at-glance__card-title">
                Out for Delivery
              </div>
            </div>
          </button>
          <button
            className={
              isCardSelected == "cancelled"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("cancelled")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("error")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {cancelledCount}
              </div>
              <div className="dashboard-at-glance__card-title">
                Shipment Cancelled
              </div>
            </div>
          </button>
          <button
            className={
              isCardSelected == "delayed"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("delayed")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("caution")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {delayedCount}
              </div>
              <div className="dashboard-at-glance__card-title">Delayed</div>
            </div>
          </button>
          <button
            className={
              isCardSelected == "delivered"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("delivered")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("success")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {deliveredCount}
              </div>
              <div className="dashboard-at-glance__card-title">Delivered</div>
            </div>
          </button>
          <button
            className={
              isCardSelected == "deliveredToday"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("deliveredToday")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("success")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {deliveredTodayCount}
              </div>
              <div className="dashboard-at-glance__card-title">
                Delivered Today
              </div>
            </div>
          </button>
          <button
            className={
              isCardSelected == "early"
                ? "selectedCard dashboard-at-glance__card"
                : "dashboard-at-glance__card"
            }
            onClick={() => filterByBlock("early")}
          >
            <div className="dashboard-at-glance__card-icon">
              {dashboardIconPack("onTime")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {earlyDeliveryCount}
              </div>
              <div className="dashboard-at-glance__card-title">Early</div>
            </div>
          </button>
        </div>
        <div className="filter-section container mid-container">
          <div className="filter-section__header">
            <button className="filter-section__button"  onClick={toggleFilter}>
              <div className="filter-section__icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
                    fill="#694ED6"
                  />
                </svg>
              </div>
              <div className="filter-section-title">My filters</div>
              <div className="filter-section-dp-icon">
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0L5 5L10 0H0Z" fill="black" fillOpacity="0.75" />
                </svg>
              </div>
            </button>
          </div>
          {showFilter ? (
          <><div className="filter-section__body">
                <div className="filter-section__body-level-1">
                  <ul className="filter-section-list">
                    {/* add active class if its selected */}
                    <li className={innerFilter == 1 ?"filter-section-item active" : "filter-section-item" } onClick={() => showInnerFilter(1)}>
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">
                          <svg className="default-icon" width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0664 19.6001L21.5 10.1665L19.8336 8.5337L12.0664 16.3337L8.1336 12.4001L6.5 14.0001L12.0664 19.6001ZM14 26.8337C12.1776 26.8337 10.4555 26.4836 8.8336 25.7833C7.2112 25.0836 5.7944 24.1281 4.5832 22.9169C3.372 21.7057 2.41653 20.2889 1.7168 18.6665C1.01653 17.0446 0.666397 15.3225 0.666397 13.5001C0.666397 11.6558 1.01653 9.9225 1.7168 8.3001C2.41653 6.6777 3.372 5.2665 4.5832 4.0665C5.7944 2.8665 7.2112 1.91664 8.8336 1.2169C10.4555 0.516637 12.1776 0.166504 14 0.166504C15.8443 0.166504 17.5776 0.516637 19.2 1.2169C20.8224 1.91664 22.2336 2.8665 23.4336 4.0665C24.6336 5.2665 25.5835 6.6777 26.2832 8.3001C26.9835 9.9225 27.3336 11.6558 27.3336 13.5001C27.3336 15.3225 26.9835 17.0446 26.2832 18.6665C25.5835 20.2889 24.6336 21.7057 23.4336 22.9169C22.2336 24.1281 20.8224 25.0836 19.2 25.7833C17.5776 26.4836 15.8443 26.8337 14 26.8337ZM14 24.6001C17.0891 24.6001 19.7112 23.5222 21.8664 21.3665C24.0221 19.2113 25.1 16.5892 25.1 13.5001C25.1 10.411 24.0221 7.7889 21.8664 5.6337C19.7112 3.47797 17.0891 2.4001 14 2.4001C10.9109 2.4001 8.2888 3.47797 6.1336 5.6337C3.97786 7.7889 2.9 10.411 2.9 13.5001C2.9 16.5892 3.97786 19.2113 6.1336 21.3665C8.2888 23.5222 10.9109 24.6001 14 24.6001Z" fill="#1C1B1F" />
                          </svg>
                          <svg className="active-icon" width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0664 19.6001L21.5 10.1665L19.8336 8.5337L12.0664 16.3337L8.13358 12.4001L6.49998 14.0001L12.0664 19.6001ZM14 26.8337C12.1776 26.8337 10.4554 26.4836 8.83358 25.7833C7.21118 25.0836 5.79438 24.1281 4.58318 22.9169C3.37198 21.7057 2.41652 20.2889 1.71678 18.6665C1.01652 17.0446 0.666382 15.3225 0.666382 13.5001C0.666382 11.6558 1.01652 9.9225 1.71678 8.3001C2.41652 6.6777 3.37198 5.2665 4.58318 4.0665C5.79438 2.8665 7.21118 1.91664 8.83358 1.2169C10.4554 0.516637 12.1776 0.166504 14 0.166504C15.8442 0.166504 17.5776 0.516637 19.2 1.2169C20.8224 1.91664 22.2336 2.8665 23.4336 4.0665C24.6336 5.2665 25.5834 6.6777 26.2832 8.3001C26.9834 9.9225 27.3336 11.6558 27.3336 13.5001C27.3336 15.3225 26.9834 17.0446 26.2832 18.6665C25.5834 20.2889 24.6336 21.7057 23.4336 22.9169C22.2336 24.1281 20.8224 25.0836 19.2 25.7833C17.5776 26.4836 15.8442 26.8337 14 26.8337Z" fill="#0067B2" />
                          </svg>
                        </div>
                        <div className="filter-section-btn-text">
                          Shipment Status
                        </div>
                      </button>
                    </li>
                    <li className={innerFilter == 2 ?"filter-section-item active" : "filter-section-item" } onClick={() => showInnerFilter(2)}>
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">
                          <svg className="default-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.9 10L12 8.4336L15.1 10V2.7336H8.9V10ZM5.3336 19.1664V16.5H12V19.1664H5.3336ZM2.2336 24.5C1.6336 24.5 1.1112 24.2779 0.6664 23.8336C0.222134 23.3888 0 22.8664 0 22.2664V2.7336C0 2.1336 0.222134 1.6112 0.6664 1.1664C1.1112 0.722134 1.6336 0.5 2.2336 0.5H21.7664C22.3664 0.5 22.8888 0.722134 23.3336 1.1664C23.7779 1.6112 24 2.1336 24 2.7336V22.2664C24 22.8664 23.7779 23.3888 23.3336 23.8336C22.8888 24.2779 22.3664 24.5 21.7664 24.5H2.2336ZM2.2336 22.2664H21.7664V2.7336H17.3336V13.6L12 10.9336L6.6664 13.6V2.7336H2.2336V22.2664Z" fill="#1C1B1F" />
                          </svg>
                          <svg className="active-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.2336 24.5C1.6336 24.5 1.1112 24.2779 0.6664 23.8336C0.222134 23.3888 0 22.8664 0 22.2664V2.7336C0 2.1336 0.222134 1.6112 0.6664 1.1664C1.1112 0.722134 1.6336 0.5 2.2336 0.5H21.7664C22.3664 0.5 22.8888 0.722134 23.3336 1.1664C23.7779 1.6112 24 2.1336 24 2.7336V22.2664C24 22.8664 23.7779 23.3888 23.3336 23.8336C22.8888 24.2779 22.3664 24.5 21.7664 24.5H2.2336ZM5.3336 19.1664H12V16.5H5.3336V19.1664ZM6.6664 13.6L12 10.9336L17.3336 13.6V2.7336H6.6664V13.6Z" fill="#0067B2" />
                          </svg>
                        </div>
                        <div className="filter-section-btn-text">
                          Shipment Information
                        </div>
                      </button>
                    </li>
                    <li className="filter-section-item">
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">



                          <svg className="default-icon" width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.6336 22.1335C5.54454 22.1335 4.61654 21.75 3.8496 20.9831C3.0832 20.2167 2.7 19.289 2.7 18.1999H0.333603V3.0663C0.333603 2.4663 0.555736 1.94416 1 1.4999C1.44427 1.05563 1.9664 0.833496 2.5664 0.833496H21.6336V6.3335H25.3L29.6664 12.1335V18.1999H27.2C27.2 19.289 26.8165 20.2167 26.0496 20.9831C25.2832 21.75 24.3445 22.1335 23.2336 22.1335C22.1445 22.1335 21.2165 21.75 20.4496 20.9831C19.6832 20.2167 19.3 19.289 19.3 18.1999H10.6C10.6 19.289 10.2165 20.2167 9.4496 20.9831C8.6832 21.75 7.74454 22.1335 6.6336 22.1335ZM6.6336 19.9335C7.12214 19.9335 7.53307 19.7612 7.8664 19.4167C8.19974 19.0722 8.3664 18.6666 8.3664 18.1999C8.3664 17.7108 8.19974 17.2996 7.8664 16.9663C7.53307 16.633 7.12214 16.4663 6.6336 16.4663C6.16694 16.4663 5.76134 16.633 5.4168 16.9663C5.07227 17.2996 4.9 17.7108 4.9 18.1999C4.9 18.6666 5.07227 19.0722 5.4168 19.4167C5.76134 19.7612 6.16694 19.9335 6.6336 19.9335ZM2.5664 15.9663H3.4C3.7776 15.433 4.23867 15.0052 4.7832 14.6831C5.32774 14.361 5.94454 14.1999 6.6336 14.1999C7.30027 14.1999 7.9112 14.3666 8.4664 14.6999C9.02214 15.0332 9.4888 15.4554 9.8664 15.9663H19.4336V3.0663H2.5664V15.9663ZM23.2336 19.9335C23.7221 19.9335 24.1331 19.7612 24.4664 19.4167C24.7997 19.0722 24.9664 18.6666 24.9664 18.1999C24.9664 17.7108 24.7997 17.2996 24.4664 16.9663C24.1331 16.633 23.7221 16.4663 23.2336 16.4663C22.7669 16.4663 22.3613 16.633 22.0168 16.9663C21.6723 17.2996 21.5 17.7108 21.5 18.1999C21.5 18.6666 21.6723 19.0722 22.0168 19.4167C22.3613 19.7612 22.7669 19.9335 23.2336 19.9335ZM21.6336 13.1663H27.6664L24.2 8.5335H21.6336V13.1663Z" fill="#1C1B1F" />
                          </svg>


                          <svg className="active-icon" width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.63362 22.1335C5.54455 22.1335 4.61655 21.75 3.84962 20.9831C3.08322 20.2167 2.70002 19.289 2.70002 18.1999H0.333618V3.0663C0.333618 2.4663 0.555751 1.94416 1.00002 1.4999C1.44428 1.05563 1.96642 0.833496 2.56642 0.833496H21.6336V6.3335H25.3L29.6664 12.1335V18.1999H27.2C27.2 19.289 26.8166 20.2167 26.0496 20.9831C25.2832 21.75 24.3446 22.1335 23.2336 22.1335C22.1446 22.1335 21.2166 21.75 20.4496 20.9831C19.6832 20.2167 19.3 19.289 19.3 18.1999H10.6C10.6 19.289 10.2166 20.2167 9.44962 20.9831C8.68322 21.75 7.74455 22.1335 6.63362 22.1335ZM6.63362 19.9335C7.12215 19.9335 7.53309 19.7612 7.86642 19.4167C8.19975 19.0722 8.36642 18.6666 8.36642 18.1999C8.36642 17.7108 8.19975 17.2996 7.86642 16.9663C7.53309 16.633 7.12215 16.4663 6.63362 16.4663C6.16695 16.4663 5.76135 16.633 5.41682 16.9663C5.07229 17.2996 4.90002 17.7108 4.90002 18.1999C4.90002 18.6666 5.07229 19.0722 5.41682 19.4167C5.76135 19.7612 6.16695 19.9335 6.63362 19.9335ZM23.2336 19.9335C23.7222 19.9335 24.1331 19.7612 24.4664 19.4167C24.7998 19.0722 24.9664 18.6666 24.9664 18.1999C24.9664 17.7108 24.7998 17.2996 24.4664 16.9663C24.1331 16.633 23.7222 16.4663 23.2336 16.4663C22.767 16.4663 22.3614 16.633 22.0168 16.9663C21.6723 17.2996 21.5 17.7108 21.5 18.1999C21.5 18.6666 21.6723 19.0722 22.0168 19.4167C22.3614 19.7612 22.767 19.9335 23.2336 19.9335ZM21.6336 13.1663H27.6664L24.2 8.5335H21.6336V13.1663Z" fill="#0067B2" />
                          </svg>



                        </div>
                        <div className="filter-section-btn-text">
                          Shipper Information
                        </div>
                      </button>
                    </li>
                    <li className="filter-section-item">
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">

                          <svg className="default-icon" width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.3665 22.1335C24.4556 22.1335 25.3836 21.75 26.1505 20.9831C26.9169 20.2167 27.3001 19.289 27.3001 18.1999H29.6665V3.0663C29.6665 2.4663 29.4444 1.94416 29.0001 1.4999C28.5558 1.05563 28.0337 0.833496 27.4337 0.833496H8.3665V6.3335H4.7001L0.333704 12.1335V18.1999H2.8001C2.8001 19.289 3.18357 20.2167 3.9505 20.9831C4.7169 21.75 5.65557 22.1335 6.7665 22.1335C7.85557 22.1335 8.78357 21.75 9.5505 20.9831C10.3169 20.2167 10.7001 19.289 10.7001 18.1999H19.4001C19.4001 19.289 19.7836 20.2167 20.5505 20.9831C21.3169 21.75 22.2556 22.1335 23.3665 22.1335ZM23.3665 19.9335C22.878 19.9335 22.467 19.7612 22.1337 19.4167C21.8004 19.0722 21.6337 18.6666 21.6337 18.1999C21.6337 17.7108 21.8004 17.2996 22.1337 16.9663C22.467 16.633 22.878 16.4663 23.3665 16.4663C23.8332 16.4663 24.2388 16.633 24.5833 16.9663C24.9278 17.2996 25.1001 17.7108 25.1001 18.1999C25.1001 18.6666 24.9278 19.0722 24.5833 19.4167C24.2388 19.7612 23.8332 19.9335 23.3665 19.9335ZM27.4337 15.9663H26.6001C26.2225 15.433 25.7614 15.0052 25.2169 14.6831C24.6724 14.361 24.0556 14.1999 23.3665 14.1999C22.6998 14.1999 22.0889 14.3666 21.5337 14.6999C20.978 15.0332 20.5113 15.4554 20.1337 15.9663H10.5665V3.0663H27.4337V15.9663ZM6.7665 19.9335C6.27797 19.9335 5.86704 19.7612 5.5337 19.4167C5.20037 19.0722 5.0337 18.6666 5.0337 18.1999C5.0337 17.7108 5.20037 17.2996 5.5337 16.9663C5.86704 16.633 6.27797 16.4663 6.7665 16.4663C7.23317 16.4663 7.63877 16.633 7.9833 16.9663C8.32784 17.2996 8.5001 17.7108 8.5001 18.1999C8.5001 18.6666 8.32784 19.0722 7.9833 19.4167C7.63877 19.7612 7.23317 19.9335 6.7665 19.9335ZM8.3665 13.1663H2.3337L5.8001 8.5335H8.3665V13.1663Z" fill="#1C1B1F" />
                          </svg>
                          <svg className="active-icon" width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.3665 22.1335C24.4556 22.1335 25.3836 21.75 26.1505 20.9831C26.9169 20.2167 27.3001 19.289 27.3001 18.1999H29.6665V3.0663C29.6665 2.4663 29.4444 1.94416 29.0001 1.4999C28.5558 1.05563 28.0337 0.833496 27.4337 0.833496H8.3665V6.3335H4.7001L0.333704 12.1335V18.1999H2.8001C2.8001 19.289 3.18357 20.2167 3.9505 20.9831C4.7169 21.75 5.65557 22.1335 6.7665 22.1335C7.85557 22.1335 8.78357 21.75 9.5505 20.9831C10.3169 20.2167 10.7001 19.289 10.7001 18.1999H19.4001C19.4001 19.289 19.7836 20.2167 20.5505 20.9831C21.3169 21.75 22.2556 22.1335 23.3665 22.1335ZM23.3665 19.9335C22.878 19.9335 22.467 19.7612 22.1337 19.4167C21.8004 19.0722 21.6337 18.6666 21.6337 18.1999C21.6337 17.7108 21.8004 17.2996 22.1337 16.9663C22.467 16.633 22.878 16.4663 23.3665 16.4663C23.8332 16.4663 24.2388 16.633 24.5833 16.9663C24.9278 17.2996 25.1001 17.7108 25.1001 18.1999C25.1001 18.6666 24.9278 19.0722 24.5833 19.4167C24.2388 19.7612 23.8332 19.9335 23.3665 19.9335ZM6.7665 19.9335C6.27797 19.9335 5.86704 19.7612 5.5337 19.4167C5.20037 19.0722 5.0337 18.6666 5.0337 18.1999C5.0337 17.7108 5.20037 17.2996 5.5337 16.9663C5.86704 16.633 6.27797 16.4663 6.7665 16.4663C7.23317 16.4663 7.63877 16.633 7.9833 16.9663C8.32784 17.2996 8.5001 17.7108 8.5001 18.1999C8.5001 18.6666 8.32784 19.0722 7.9833 19.4167C7.63877 19.7612 7.23317 19.9335 6.7665 19.9335ZM8.3665 13.1663H2.3337L5.8001 8.5335H8.3665V13.1663Z" fill="#0067B2" />
                          </svg>

                        </div>
                        <div className="filter-section-btn-text">
                          Recipient Information
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                {innerFilter == 1 ?
                <div className="filter-section__body-level-2 shipper___info__tab">
                  <ul className="filter-section-list">
                    <li className="filter-section-item">

                      {/* add selected class if its selected */}
                      <button className="filter-section-btn selected">
                        <div className="filter-section-btn-icon">
                          <label className="checkbox">
                            <input className="checkbox-input" type="checkbox" name="CheckShipper" onChange={shipperChange} value="delayed" />
                            <span className="checkbox-indicator">
                              <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#0067B2" />
                              </svg>
                            </span>
                          </label>
                        </div>
                        <div className="filter-section-btn-text">
                          Delayed
                        </div>
                        <div className="filter-section-btn-count">
                          {delayedCount}
                        </div>
                      </button>
                    </li>
                    <li className="filter-section-item">
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">
                          <label className="checkbox">
                            <input className="checkbox-input" type="checkbox" name="CheckShipper" onChange={shipperChange} value="delivered" />
                            <span className="checkbox-indicator">
                              <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#0067B2" />
                              </svg>
                            </span>
                          </label>
                        </div>
                        <div className="filter-section-btn-text">
                          Delivered
                        </div>
                        <div className="filter-section-btn-count">
                          {deliveredCount}
                        </div>
                      </button>
                    </li>
                    <li className="filter-section-item">
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">
                          <label className="checkbox">
                            <input className="checkbox-input" type="checkbox" name="CheckShipper" onChange={shipperChange} value="exception" />
                            <span className="checkbox-indicator">
                              <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#0067B2" />
                              </svg>
                            </span>
                          </label>
                        </div>
                        <div className="filter-section-btn-text">
                          Exception
                        </div>
                        <div className="filter-section-btn-count">
                          {exceptionCount}
                        </div>
                      </button>
                    </li>
                    <li className="filter-section-item">
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">
                          <label className="checkbox">
                            <input className="checkbox-input" type="checkbox" name="CheckShipper" onChange={shipperChange} value="inTransit" />
                            <span className="checkbox-indicator">
                              <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#0067B2" />
                              </svg>
                            </span>
                          </label>
                        </div>
                        <div className="filter-section-btn-text">
                          In Transit
                        </div>
                        <div className="filter-section-btn-count">
                          {inTransitCount}
                        </div>
                      </button>
                    </li>
                    <li className="filter-section-item">
                      <button className="filter-section-btn">
                        <div className="filter-section-btn-icon">
                          <label className="checkbox">
                            <input className="checkbox-input" type="checkbox" name="CheckShipper" onChange={shipperChange} value="label" />
                            <span className="checkbox-indicator">
                              <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#0067B2" />
                              </svg>
                            </span>
                          </label>
                        </div>
                        <div className="filter-section-btn-text">
                          Label Created
                        </div>
                        <div className="filter-section-btn-count">
                          {labelCreatedCount}
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                : 
                <><div className="filter-section__body-level-2">
                    <ul className="filter-section-list">
                    {innerFilterJson.map((item) => (
                      <li className="filter-section-item">

                        {/* add selected class if its selected */}
                        <button className="filter-section-btn">
                          <div className="filter-section-btn-icon">
                            <label className="checkbox">
                              <input className="checkbox-input" type="checkbox" name="CheckShipper" onChange={shipperInfoChange} value= {item.name} />
                              <span className="checkbox-indicator">
                                <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#0067B2" />
                                </svg>
                              </span>
                            </label>
                          </div>
                          <div className="filter-section-btn-text">
                            {item.name}
                          </div>
                          <div className="filter-section-btn-count">
                          {item.value}
                          </div>
                        </button>
                      </li>
                       ))}
                     
                     
                   
                
                    </ul>
                  </div><div className="filter-section__body-level-3">

                      <ul className="filter-section-list">
                      {innerFilterJson1.map((item) => (
                        <li className="filter-section-item">
                          <button className="filter-section-btn">
                            <div className="filter-section-btn-icon">
                              <label className="checkbox">
                              <input
                                className="checkbox-input"
                                type="checkbox"
                                name="CheckShipper"
                                onChange={(event) => valueBasedFilter(event, item.type)}
                                value={item.name}
                              />

                               
                            
                                <span className="checkbox-indicator">
                                  <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z" fill="#0067B2" />
                                  </svg>
                                </span>
                              </label>
                            </div>
                            <div className="filter-section-btn-text">
                            {item.name}
                            </div>
                            <div className="filter-section-btn-count">
                              {item.count}
                            </div>
                          </button>
                        </li>
                      ))}
                      
                        
                      </ul>
                    </div></>
                }
                

              </div><div className="filter-section__footer">
                  <div className="filter-section-action">
                    <button className="btn btn-ship--secondary" onClick={toggleFilter}>
                      CLOSE
                    </button>
                    <button className="btn btn-ship--primary" onClick={() => applyFilter()}>
                      APPLY
                    </button>
                  </div>
                </div></>
          ) : "" }
          <ul className="filter-section__applied">
          {selectedList.length > 0 && selectedList.map((item) => 
              <li className="filter-section__applied-list">
                <div className="btn btn-filter-pill">
                  <span>{item}</span>
                  <button className="btn btn-close-pill" onClick={() => clearFilter(item)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.99984 0.166748C2.774 0.166748 0.166504 2.77425 0.166504 6.00008C0.166504 9.22592 2.774 11.8334 5.99984 11.8334C9.22567 11.8334 11.8332 9.22592 11.8332 6.00008C11.8332 2.77425 9.22567 0.166748 5.99984 0.166748ZM8.9165 8.09425L8.094 8.91675L5.99984 6.82258L3.90567 8.91675L3.08317 8.09425L5.17734 6.00008L3.08317 3.90591L3.90567 3.08342L5.99984 5.17758L8.094 3.08342L8.9165 3.90591L6.82234 6.00008L8.9165 8.09425Z" fill="#0067B2" />
                    </svg>

                  </button>
                </div>
              </li>
              )}
          
              <li className="filter-section__applied-list">
                <button className="btn btn-close-reset" onClick={clearSearchValue}>
                  Reset
                </button>
              </li>
            </ul>
        </div>

        <div className="shipping-list container mid-container">
          <Paper>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table aria-label="shipping table" className="filter-table">
                <TableHead>
                  <TableRow>
                    <TableCell width="274">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          TRACKING NUMBER
                        </div>
                        <div className="filter-table__sort-icon ascending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left" className="status-cell">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">STATUS</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          SCHEDULED DELIVERY DATE
                        </div>
                        <div className="filter-table__sort-icon none">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          {" "}
                          SCHEDULED DELIVERY TIME BEFORE
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">SHIPPER NAME</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          SHIPPER COMPANY
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">SHIPPER CITY</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">SHIPPER STATE</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">SHIP DATE</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          DELIVERY COMPANY
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">STORE ID</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          RECIPIENT CONTACT NAME
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          RECIPIENT COMPANY
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          RECIPIENT ADDRESS
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          RECIPIENT CITY
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          RECIPIENT STATE
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          RECIPIENT COUNTRY
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          ACCOUNT NUMBER
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">FEDEX COMPANY</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          {" "}
                          Number of Attempted Deliveries
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">DELIVERY DATE</div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button className="filter-table__header filter-table__header--button">
                        <div className="filter-table__title">
                          MASTER TRACKING NUMBER
                        </div>
                        <div className="filter-table__sort-icon desending">
                          <svg
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 5L5 0L10 5H0Z"
                              fill="black"
                              fillOpacity="0.75"
                            />
                          </svg>
                        </div>
                      </button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.trackingNumber}>
                      <TableCell
                        component="td"
                        scope="row"
                        align="left"
                        className="tranckRow"
                      >
                        {row.trackingNumber}
                      </TableCell>
                      <TableCell component="td" scope="row" align="left">
                        {row.status === "Delivered" && (
                          <>
                            <img src={checkCircle} />
                          </>
                        )}
                        {row.isDelayed && (
                          <>
                            <img src={yellowAlertImg} />
                            {/* Add caution icon (yellow) */}
                          </>
                        )}
                        {row.status === "In transit" && !row.isDelayed && (
                          <>
                            <img src={transit} />
                          </>
                        )}
                        {row.status === "Initiated" && (
                          <>
                            <img src={labelImg} />
                          </>
                        )}
                        {(row.status === "Delivery exception" ||
                          row.status === "Shipment exception") &&
                          !row.isDelayed && (
                            <>
                              <img src={redAlertImg} />
                            </>
                          )}
                        &nbsp; {row.status}
                        <br />
                        {row.isDelivered !== true &&
                          row.isException !== true && (
                            <small>{row.statusDescription}</small>
                          )}
                      </TableCell>
                      <TableCell align="left">
                        {row.scheduledDeliveryDate !== "" &&
                        row.scheduledDeliveryDate !== null
                          ? formatDate(
                              row.scheduledDeliveryDate,
                              dateFormatToDisplay
                            )
                          : row.isDelivered
                          ? ""
                          : "Pending"}
                      </TableCell>
                      <TableCell align="left">
                        {row.scheduledDeliveryDate !== "" &&
                        row.scheduledDeliveryDate !== null
                          ? formatDate(
                              row.scheduledDeliveryDate,
                              timeFormatToDisplay
                            )
                          : row.isDelivered
                          ? ""
                          : "Pending"}
                      </TableCell>
                      <TableCell align="left">{row.shipperName}</TableCell>
                      <TableCell align="left">{row.shipperCompany}</TableCell>
                      <TableCell align="left">{row.shipperCity}</TableCell>
                      <TableCell align="left">{row.shipperState}</TableCell>
                      <TableCell align="left">
                        {formatDate(row.shipDate, dateFormatToDisplay) === ""
                          ? "Pending"
                          : formatDate(row.shipDate, dateFormatToDisplay)}
                      </TableCell>
                      <TableCell align="left">{row.deliveryCompany}</TableCell>
                      <TableCell align="left">{row.storeId}</TableCell>
                      <TableCell align="left">
                        {row.recipientContactName}
                      </TableCell>
                      <TableCell align="left">{row.recipientCompany}</TableCell>
                      <TableCell align="left">{row.recipientAddress}</TableCell>
                      <TableCell align="left">{row.recipientCity}</TableCell>
                      <TableCell align="left">{row.recipientState}</TableCell>
                      <TableCell align="left">{row.recipientCountry}</TableCell>
                      <TableCell align="left">{row.accountNumber}</TableCell>
                      <TableCell align="left">{row.fedExCompany}</TableCell>

                      <TableCell align="left">
                        {row.numberOfAttemptedDeliveries}
                      </TableCell>
                      <TableCell align="left">
                        {formatDate(row.deliveredTime, dateTimeFormatToDisplay)}
                      </TableCell>
                      <TableCell align="left">
                        {row.masterTrackingNumber}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
        </div>
        <div className="footer__content">
          
          <div className="footer__item">
            Help for Shipment tracking
          </div>
          <div className="footer__item">
            The Service Desk:
            servicedesk@petsmart.com
          </div>
          <div className="footer__item"> 800.406.2155
          </div>
        </div>
      </div>
    </>
  );
}
