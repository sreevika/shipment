import { useEffect, useRef, useState } from "react";

import "./home-style.css";
import "./_home.scss";
import {
  dateTimeFormatToDisplay,
  dateFormatToDisplay,
  dateFormatForDb,
  
} from "../../constants/dateFormatOptions";
import petsmartImg from "../../assets/images/petsmart.png";
import pangeaImg from "../../assets/images/pangea.png";

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
import _, { trim } from "lodash";
import moment from "moment";

import Shipment from "../../interfaces/shipment";
import {
  dashboardIconPack,
  formatDate,
  getFilterValueforUI,
} from "../../components/commonFunctions";
import Checkbox from "../../components/checkbox";
import SearchBar from "../../components/FedEx/searchBar";
import StatusRow from "../../components/statusRow";
import SelectedFilterListInfo from "../../interfaces/selectedFilterListInfo";
import initialStatusFilterInfo from "../../constants/statusFIlterData";
import intialNormalFilterInfo from "../../constants/normalFilterData";
import intialShipmentTableData from "../../constants/shipmentTableData";
import CardSection from "../../components/FedEx/cardSection";
import FilterOptions from "../../components/FedEx/filterOptions";
import AppliedFilter from "../../components/FedEx/appliedFilter";
import UpsShipment from "../../interfaces/upsShipment";
import Fedex from "./fedex";






export default function HomePage() {
  const [ShowLoader, setShowLoader] = useState(true);
  const dropdownRef = useRef(null);
  const [mainNavigation, setMainNavigation] = useState("fedex");
  const mainNavigationToFedexUps = (option: string) => {
    setMainNavigation(option);
  };
  return (
    <>
{/* <div  style={ShowLoader ? { display: "block" } : { display: "none" }} className="overlay" >
  <span className="loader"></span>
</div> */}
      <div ref={dropdownRef}>
        <nav className="header-navigation">
          <div className="container max-container header-navigation-container">
            <div className="header-navigation__product-image">
              <a
                  // onClick={resetAllFilters}
                className="header-navigation__logo-item header-navigation__ps-logo"
              >
                <img
                  className="ps-logo__image"
                  src={petsmartImg}
                  alt="Pet Smart Logo"
                />
              </a>
              <a
                //  onClick={resetAllFilters}
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
                <a  onClick={() => mainNavigationToFedexUps("fedex")} className={mainNavigation == "fedex" ? "header-navigation__menu-link active" : "header-navigation__menu-link"}>
                  FedEx
                </a>
              </li>
             <li className="header-navigation__menu-item">
              <a onClick={() => mainNavigationToFedexUps("ups")} className={mainNavigation == "ups" ? "header-navigation__menu-link active" : "header-navigation__menu-link"}>
                UPS
              </a>
            </li> 
            </ul>
            {/* <SearchBar
              mainNavigation={mainNavigation}
              searchType={searchType}
              dropDown={dropDown}
              selectSearchType={selectSearchType}
              onchangeSearchType={onchangeSearchType} 
              searchValue={searchValue}
              searchValueChange={searchValueChange}
              searchData={searchData}
              clearSearchValue={clearSearchValue}
            /> */}

          
            <div className="header-navigation__profile">
              <ul className="header-navigation__actions">
                <li className="header-navigation__item-actions">
                  <a
                    href="#"
                    className="header-navigation__item-actions-anchor"
                    // onClick={handleLogout}
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
        <Fedex/>
        <div className="footer">
          <div className="footer__content">
            <div className="footer__item">Help for Shipment tracking</div>
            <div className="footer__item">
              The Service Desk: servicedesk@petsmart.com
            </div>
            <div className="footer__item"> 800.406.2155</div>
          </div>
        </div>

      </div>
    </>
  );
}


