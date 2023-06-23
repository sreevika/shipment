import { useEffect, useRef, useState } from "react";

import "./home-style.css";
import "./_home.scss";

import petsmartImg from "../../assets/images/petsmart.png";
import pangeaImg from "../../assets/images/pangea.png";
import checkCircle from "../../assets/images/check_circle.png";
import transit from "../../assets/images/transit.png";
import labelImg from "../../assets/images/label-img.png";

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

function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return day + "/" + month + "/" + year;
}

function getFormattedDate_dt(date: any) {
  if (date != null || date != "") {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return day + "/" + month + "/" + year;
  } else {
    return "00/00/0000";
  }
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
          `${EDUCONNECT_URL}/Dashboard/fedex?fromDate=2023-04-25&toDate=2023-06-23`,
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

  const handleLogout = () => {
    navigate("/login"); // Use the navigate function to navigate to the login page
  };
  let originalRows1 = originalRows;
  const selectSearchType = () => {
    setDropDown(!dropDown);
  };
  const onchangeSearchType = (value: string) => {
    setSearchType(value);
    setDropDown(!dropDown);
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
  };

  const searchData = (event: { key: string }) => {
    if (event.key === "Enter") {
      if (searchType != "" && searchValue != "") {
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
        originalRows1 = originalRows;
      }

      setRows(originalRows1);
    }
  };
  const totalCount = Object.keys(originalRows).length;
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
  const outForDeliveryCount = Object.keys(
    originalRows.filter((item) => item.isOutForDelivery === true)
  ).length;
  const cancelledCount = Object.keys(
    originalRows.filter((item) => item.isCancelled === true)
  ).length;

  const deliveredTodayCount = Object.keys(
    originalRows.filter(
      (item) =>
        item.isDelivered === true &&
        getFormattedDate_dt(item.deliveredTime) == getFormattedDate(new Date())
    )
  ).length;

  const date = new Date();
  const last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayDate = getFormattedDate(date);
  const lastDayDate = getFormattedDate(last);

  const [isCardSelected, setCardSelected] = useState("");

  const filterByBlock = (value: string) => {
    setCardSelected(value);
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
            () => item.isOutForDelivery == true && item.isDelivered == false
          );
        });
      } else if (value === "deliveredToday") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(
            () =>
              getFormattedDate_dt(item.deliveredTime) ==
                getFormattedDate(new Date()) && item.isDelivered == true
          );
        });
      }
      setRows(filteredData);
    }
  };

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
        <div className="hero-banner">
          <div className="container mid-container hero-banner__container">
            <div className="hero-banner__container--title">
              <div className="hero-banner__container-sub-title">{storeId}</div>
              <div className="hero-banner__container-main-title">
                Shipment Dashboard
              </div>
            </div>
            <div className="hero-banner__container--date">
              {lastDayDate} - {todayDate}
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
              {dashboardIconPack("success")}
            </div>
            <div className="dashboard-at-glance__card-stats">
              <div className="dashboard-at-glance__card-count">
                {earlyDeliveryCount}
              </div>
              <div className="dashboard-at-glance__card-title">
                Early Delivery
              </div>
            </div>
          </button>
        </div>
        {/* <div className="GridPannel" >
        <Grid container spacing={2} columns={16}>
          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("all")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={greenTickImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">{totalCount}</span>
                  <br />
                  <small>All Shipment</small>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("onTime")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={rightArrowImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">
                    <a>{onTimeCount}</a>
                  </span>
                  <br />
                  <small>On Time</small>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("exception")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={redAlertImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">
                    <a>{exceptionCount}</a>
                  </span>
                  <br />
                  <small>Exceptions</small>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("outForDelivery")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={rightArrowImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">
                    {outForDeliveryCount}
                  </span>
                  <br />
                  <small>Out for Delivery</small>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("early")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={greenTickImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">{earlyDeliveryCount}</span>
                  <br />
                  <small>Early Delivery</small>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("delayed")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={yellowAlertImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">{delayedCount}</span>
                  <br />
                  <small>Delayed</small>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("delivered")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={greenTickImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">{deliveredCount}</span>
                  <br />
                  <small>Delivered</small>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={4}>
            <div
              className="card dashboardCards"
              onClick={() => filterByBlock("cancelled")}
            >
              <div className="card-items">
                <div id="circle-cover">
                  <div id="circle-head">
                    <img src={packageImg} />
                  </div>
                </div>
                <div className="card-text">
                  <span className="card-header-line">{cancelledCount}</span>
                  <br />
                  <small>Shipment Cancelled</small>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div > */}
        <div className="filter-section container mid-container">
          <div className="filter-section__header">
            <button className="filter-section__button">
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
                        {row.status == "Delivered" && (
                          <>
                            <img src={checkCircle} />
                          </>
                        )}
                        {row.status == "In transit" && (
                          <>
                            <img src={transit} />{" "}
                          </>
                        )}{" "}
                        {row.status == "Label" && (
                          <>
                            <img src={labelImg} />{" "}
                          </>
                        )}{" "}
                        &nbsp; {row.status}
                        <br />
                        {row.status != "Delivered" && (
                          <small>{row.statusDescription}</small>
                        )}{" "}
                      </TableCell>
                      <TableCell align="left">
                        {row.scheduledDeliveryDate == null && <>-- </>}
                        {row.scheduledDeliveryDate != null && (
                          <>{row.scheduledDeliveryDate} </>
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {row.scheduledDeliveryTimeBefore == null && <>-- </>}
                        {row.scheduledDeliveryTimeBefore != null && (
                          <> {row.scheduledDeliveryTimeBefore} </>
                        )}{" "}
                      </TableCell>
                      <TableCell align="left">{row.shipperName}</TableCell>
                      <TableCell align="left">{row.shipperCompany}</TableCell>
                      <TableCell align="left">{row.shipperCity}</TableCell>
                      <TableCell align="left">{row.shipperState}</TableCell>
                      <TableCell align="left">{row.shipDate}</TableCell>
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
                      <TableCell align="left">{row.deliveredTime}</TableCell>
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
        <div className="flex-column flex-md-row text-center justify-content-between py-4 px-4 px-xl-5   footer1">
          {/* d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5  */}
          <div className="text-white mb-3 mb-md-0 ">
            Help for Shipment tracking &nbsp; &nbsp; The Service Desk:
            servicedesk@petsmart.com &nbsp;&nbsp; 800.406.2155
          </div>
        </div>
      </div>
    </>
  );
}
