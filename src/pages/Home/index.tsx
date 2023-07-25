import { useEffect, useRef, useState } from "react";

import "./home-style.css";
import "./_home.scss";
import {
  dateTimeFormatToDisplay,
  dateFormatToDisplay,
  dateFormatForDb
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
import _ from "lodash";
import moment from "moment";

import Shipment from "../../interfaces/shipment";
import {
  dashboardIconPack,
  formatDate,
  getFilterValueforUI,
} from "../../components/commonFunctions";
import Checkbox from "../../components/checkbox";
import StatusRow from "../../components/statusRow";
import SelectedFilterListInfo from "../../interfaces/selectedFilterListInfo";
import initialStatusFilterInfo from "../../constants/statusFIlterData";
import intialNormalFilterInfo from "../../constants/normalFilterData";
import intialShipmentTableData from "../../constants/shipmentTableData";
let originalRows: Shipment[] = [];
let originalRows_backup: Shipment[] = [];
const EDUCONNECT_URL = `https://shipmenttrackingapi-qa.signsharecloud.com/api`;

// For showing the selected List
let selectedListArray: any[] = [];
// for selected  filter List
let selectedFilterListForUI: SelectedFilterListInfo[] = [];


export default function HomePage() {
  const [ShowLoader, setShowLoader] = useState(true);
  const [order, setOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState("trackingNumber");
  const [rows, setRows] = useState<Shipment[]>([]);
  const token = localStorage.getItem("Authorization");
  const levelName = localStorage.getItem("LevelName");
  const surName = localStorage.getItem("SurName");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [statusFilterInfo, setStatusFilterInfo] = useState(
    initialStatusFilterInfo
  );
  const [shipAndRecpFilterInfo, setShipAndRecpFilterInfo] = useState(
    intialNormalFilterInfo
  );
 
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(
          `${EDUCONNECT_URL}/Dashboard/fedex?fromDate=${formatDate(
            fromDate,
            dateFormatForDb
          )}&toDate=${formatDate(toDate, dateFormatForDb)}&levelName=${levelName}&surName=${surName}`,
          config
        );
        originalRows = response.data.data;
        originalRows_backup = response.data.data;
        const compareFn = (a: any, b: any) => a.trackingNumber.localeCompare(b.trackingNumber);
    
      const sortedRows = response.data.data.sort(compareFn);
        setRows(sortedRows);
       
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  const navigate = useNavigate(); // Use the useNavigate hook here
  const [searchType, setSearchType] = useState("Store ID");
  const [searchValue, setSearchValue] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [storeId, setStoreId] = useState("");
  const dropdownRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [firstlevelClick, set_firstlevelClick] = useState(true);

  const handleLogout = () => {
    localStorage.setItem("Authorization", "");
    navigate("/login"); // Use the navigate function to navigate to the login page
  };
  let originalRows1 = originalRows;
  let filterBlockData = originalRows;

  // shipment info array
  const getIntersection = (arr1: any[], arr2: any[]) => {
    return arr1.filter((item) =>
      arr2.some(
        (otherItem) =>
          item.trackingNumberUniqueId === otherItem.trackingNumberUniqueId
      )
    );
  };

  //sreevika pls check
  //set status filter counts
  Object.keys(initialStatusFilterInfo).forEach((key) => {
    const filterField = initialStatusFilterInfo[key].field;
    const filterValue = initialStatusFilterInfo[key].sectionValue;

    const filteredRows = originalRows.filter(
      (item: any) => item[filterField] === filterValue
    );
    const count = Object.keys(filteredRows).length;

    statusFilterInfo[key].count = count;
  });

  //status field checkbox changes
  const statusFilterCheckboxChange = (event: any) => {
    const isChecked = event.target.checked;
    const checkboxValue = event.target.value;

    setStatusFilterInfo((prevState) => ({
      ...prevState,
      [checkboxValue]: {
        ...prevState[checkboxValue],
        checkedStatus: isChecked,
      },
    }));
  };

  const selectSearchType = () => {
    setDropDown(!dropDown);
  };
  const onchangeSearchType = (value: string) => {
    setSearchType(value);
    setDropDown(!dropDown);
    clearSearchValue();
    resetAllFilters();
  };
  const searchValueChange = (e: { target: { value: any } }) => {
    setSearchValue(e.target.value);
  };
  const clearSearchValue = () => {
    setSearchValue("");
    originalRows = originalRows_backup;
    setRows(originalRows);

    setStoreId("");
    setCardSelected("");
    // resetFilters();
  };

  const resetAllFilters = () => {
    setStoreId("");
    setSearchValue("");
    setCardSelected("");

    //reset card filter to do (sreevika)

    //reset filters in filter box
    setStatusFilterInfo(initialStatusFilterInfo);
    //issue found
    //setShipAndRecpFilterInfo(intialNormalFilterInfo);
    Object.keys(shipAndRecpFilterInfo).forEach((element) => {
      setShipAndRecpFilterInfo((prevState) => ({
        ...prevState,
        [element]: {
          ...prevState[element],
          sectionValue: [],
        },
      }));
    });

    //remove all filters from selected list
    selectedFilterListForUI = [];
    originalRows = originalRows_backup;
    setRows(originalRows);
    setShowFilter(false);
    setAnyFilter(false);
  };

  // Clear filter as each item on the selected List
  const clearFilter = (value: SelectedFilterListInfo) => {
    // status filters
    if (value.filterType == 1) {
      selectedFilterListForUI = selectedFilterListForUI.filter(
        (e) => e.key != value.key
      );
      statusFilterInfo[value.key].checkedStatus = false;
    }
    //shipping and receipient filters
    else if (value.filterType == 2) {
      selectedFilterListForUI = selectedFilterListForUI.filter(
        (item) =>
          item.key !== value.key || item.sectionValue !== value.sectionValue
      );
      shipAndRecpFilterInfo[value.key].sectionValue = shipAndRecpFilterInfo[
        value.key
      ].sectionValue.filter((e: any) => e != value.sectionValue);
    } else if (value.filterType == 3 || value.filterType == 4) {
      selectedFilterListForUI = selectedFilterListForUI.filter(
        (e) => e.key != value.key
      );
      setCardSelected("");
      if (searchValue != "") {
        if (searchType != "Store ID") {
          setSearchValue("");
        }
      }
    }

    applyFilters();
  };

  const searchData = (event: { key: string }) => {
    setAnyFilter(true);

    
      //reset filters in filter box
      setStatusFilterInfo(initialStatusFilterInfo);
    
      Object.keys(shipAndRecpFilterInfo).forEach((element) => {
        setShipAndRecpFilterInfo((prevState) => ({
          ...prevState,
          [element]: {
            ...prevState[element],
            sectionValue: [],
          },
        }));
      });

      //remove all filters from selected list
      selectedFilterListForUI = [];

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
          //add items to show in selected list
          const newItem: SelectedFilterListInfo = {
            display: searchValue,
            field: searchValue,
            filterType: 3,
            sectionValue: undefined,
            type: "",
            filterVariable: "",
            key: searchValue,
          };
          const existingItem = selectedFilterListForUI.find(
            (item) => item.key === searchValue
          );
          if (!existingItem) {
            selectedFilterListForUI.push(newItem);
          }
          originalRows1 = originalRows.filter((item) => {
            return Object.keys(item).some(
              () => item.trackingNumber == searchValue
            );
          });
        }

        
      } else {
        originalRows1 = originalRows_backup;
        originalRows = originalRows1;
        resetAllFilters();
        setAnyFilter(false);
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

  // const inTransitCount = Object.keys(
  //   originalRows.filter((item) => item.status === "In transit")
  // ).length;

  // const labelCreatedCount = Object.keys(
  //   originalRows.filter((item) => item.status === "Initiated")
  // ).length;

  const outForDeliveryCount = Object.keys(
    originalRows.filter(
      (item) =>
        item.status === "In transit" &&
        formatDate(item.shipDate, dateFormatToDisplay) ==
          formatDate(new Date(), dateFormatToDisplay)
    )
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

  //Find date interval
  const toDate = new Date();
  const fromDate = new Date(toDate.getTime() - 14 * 24 * 60 * 60 * 1000);
  const filterDataByProperty = (
    data: any[],
    propertyName: string,
    value: boolean
  ) => {
    return data.filter((item) => item[propertyName] === value);
  };
  const [isCardSelected, setCardSelected] = useState("");
  const [anyFilter, setAnyFilter] = useState(false);

  //Apply filter for cards
  const filterByBlock = (value: string) => {
    var displayName: string = value;
    if (value == "deliveredToday") displayName = "DELIVERED TODAY";
    else if (value == "outForDelivery") displayName = "OUT FOR DELIVERY";
    else if (value == "onTime") displayName = "ON TIME";
    const newItem: SelectedFilterListInfo = {
      display: displayName,
      field: value,
      filterType: 3,
      sectionValue: undefined,
      type: "",
      filterVariable: "",
      key: value,
    };
    if (value == isCardSelected) {
      setCardSelected("");
      clearFilter(newItem);
    } else {
      resetAllFilters();
      setAnyFilter(true);
      let tempArr :any[]= [];
      tempArr.push(getFilterValueforUI(value));
      // setSelectedList(tempArr);

      setCardSelected(value);
      if (searchType != "Store ID") {
        setSearchValue("");
      }

      //add items to show in selected list
      const existingItem = selectedFilterListForUI.find(
        (item) => item.key === value
      );
      if (!existingItem) {
        selectedFilterListForUI.push(newItem);
      }

      if (value === "") setRows(originalRows);
      else {
        let filteredData = originalRows;
        if (value === "all") {
          filteredData = originalRows;
        } else if (value === "onTime") {
          filteredData = filterDataByProperty(originalRows, "isOnTime", true);
        } else if (value === "exception") {
          filteredData = filterDataByProperty(
            originalRows,
            "isException",
            true
          );
        } else if (value === "delivered") {
          filteredData = filterDataByProperty(
            originalRows,
            "isDelivered",
            true
          );
        } else if (value === "delayed") {
          filteredData = filterDataByProperty(originalRows, "isDelayed", true);
        } else if (value === "early") {
          filteredData = filterDataByProperty(originalRows, "isEarly", true);
        } else if (value === "cancelled") {
          filteredData = filterDataByProperty(
            originalRows,
            "isCancelled",
            true
          );
        } else if (value === "outForDelivery") {
          filteredData = originalRows.filter((item) => {
            return Object.keys(item).some(
              () =>
                item.status === "In transit" &&
                formatDate(item.shipDate, dateFormatToDisplay) ==
                  formatDate(new Date(), dateFormatToDisplay)
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
        filterBlockData = filteredData;
        setRows(filterBlockData);
      }
    }
  };
  const [selectedDiv, setSelectedDiv] = useState();
  const [selectedDiv_level2, setSelectedDiv_level2] = useState();
  const clickedItem = (value: any) => {
    setSelectedDiv(value);
    setSelectedDiv_level2(value);
    set_firstlevelClick(false);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const generateGroupByData = (
    data: any,
    propertyName: string,
    type: string
  ) => {
    if (type == "date") {

      return _(data)
        .groupBy((item) => {
          const formattedDate = moment(item[propertyName]).format("MM/DD/YYYY");
          return moment(formattedDate).isValid() ? formattedDate : "";
        })
        .map((items, name) => ({
          name,
          count: items.length,
          type: propertyName,
        }))
        .orderBy(["name"], ["asc"]) // Order by the "name" property in ascending order
        .value();
      
    } else {
      
      return _.chain(data)
      .groupBy(propertyName)
      .map((items, name) => ({
        name,
        count: items.length,
        type: propertyName,
      }))
      .orderBy(["name"], ["asc"]) // Order by the "name" property in ascending order
      .value();
    } 
  };

  const shipperInfoChange = (value: string) => {
    Object.keys(shipAndRecpFilterInfo).forEach((key) => {
      if (shipAndRecpFilterInfo[key].field === value) {
        setSelectedOption(key);

        shipAndRecpFilterInfo[key].orginalData = generateGroupByData(
          originalRows,
          value,
          shipAndRecpFilterInfo[key].type
        );
      }
    });
  };

  //check normal filter
  const normalFilterCheckboxChange = (event: {
    target: { name: any; checked: any; value: any };
  }) => {
    const { name, checked, value } = event.target;
    let tempArray: any = [];
    if (checked) {
      const existingItem = shipAndRecpFilterInfo[name].sectionValue.find(
        (item: any) => item == value
      );
      if (!existingItem) {
        tempArray = shipAndRecpFilterInfo[name].sectionValue;
        tempArray.push(value);
      }
    } else {
      tempArray = shipAndRecpFilterInfo[name].sectionValue;
      tempArray = tempArray.filter((item: any) => item != value);
    }
    setShipAndRecpFilterInfo((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        sectionValue: tempArray,
      },
    }));
  };

 
  const [innerFilter, setInnerFilter] = useState(0);
  const [innerFilterJson, setInnerFilterJson] = useState<any[]>([]);

  const toggleFilter = () => {
    setInnerFilter(0)
    setShowFilter(!showFilter);
  };

  // first layer filter
  const showInnerFilter = (val: String) => {
    // shipment status
    if (val == "shipStatus") {
      setInnerFilter(1);
      set_firstlevelClick(true);
    } else if (val == "shipInfo") {
      set_firstlevelClick(true);
      // shipment info
      let shipInfo = Object.values(shipAndRecpFilterInfo).filter(
        (normalFilterInfo) => normalFilterInfo.filterType === "shipInfo"
      );

      setInnerFilterJson(shipInfo);
      setInnerFilter(2);
    } else if (val == "recpInfo") {
      set_firstlevelClick(true);
      //recipient
      let recpInfo = Object.values(shipAndRecpFilterInfo).filter(
        (normalFilterInfo) => normalFilterInfo.filterType === "recpInfo"
      );
      setInnerFilterJson(recpInfo);
      setInnerFilter(4);
    }
  };
  ////////////////////////////////////////////////////////
  //new
  const closeButton = () => {
    setShowFilter(false);
    setStatusFilterInfo(initialStatusFilterInfo);
    // setShipAndRecpFilterInfo(intialNormalFilterInfo);
    //sreevika : need to check how intialNormalFilterInfo.section value getting values
    Object.keys(shipAndRecpFilterInfo).forEach((element) => {
      shipAndRecpFilterInfo[element].sectionValue = [];
    });
    selectedFilterListForUI.forEach((element) => {
      if (element.filterType == 1) {
        //status fiter
        setStatusFilterInfo((prevState) => ({
          ...prevState,
          [element.key]: {
            ...prevState[element.key],
            checkedStatus: true,
          },
        }));
      } else if (element.filterType == 2) {
        var tempArray = shipAndRecpFilterInfo[element.key].sectionValue;
        if (!tempArray.includes(element.sectionValue)) {
          tempArray.push(element.sectionValue);
        }
        setShipAndRecpFilterInfo((prevState) => ({
          ...prevState,
          [element.key]: {
            ...prevState[element.key],
            sectionValue: tempArray,
          },
        }));
      }
    });
    //write logic to set shipAndRecpFilterInfo and statusFilterinfo based on selected filters
  };
  const applyFilters = () => {
    let shipmentDataFilteredByStatus: Shipment[] = [];
    let shipmentDataFilteredByShipAndRecp: Shipment[] = [];
    selectedFilterListForUI = [];
    //find checked status filter count
    const checkedStatusFilterCount = Object.values(statusFilterInfo).filter(
      (filter) => filter.checkedStatus === true
    ).length;
    //if no status filter is checked then status filtered data= orginaldata
    if (checkedStatusFilterCount == 0)
      shipmentDataFilteredByStatus = originalRows;
    else shipmentDataFilteredByStatus = applyFilterByStatus();

    //find normal status filter count
    const checkedNormalFilterCount = Object.values(
      shipAndRecpFilterInfo
    ).filter((filter) => filter.sectionValue.length > 0).length;

    //if no normal filter is checked then normal filtered data= orginaldata
    if (checkedNormalFilterCount == 0)
      shipmentDataFilteredByShipAndRecp = originalRows;
    else shipmentDataFilteredByShipAndRecp = applyFilterByShipAndRecp();

    //get combined records
    const intersectionArray = getIntersection(
      shipmentDataFilteredByStatus,
      shipmentDataFilteredByShipAndRecp
    );
    const uniqueArray_table = intersectionArray.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    //show filtered records in table
    setRows(uniqueArray_table);
    //close filter box
    setShowFilter(false);
    if (checkedStatusFilterCount + checkedNormalFilterCount == 0)
      setAnyFilter(false);
    else setAnyFilter(true);
  };

  //apply Shipment Status Filters
  const applyFilterByStatus = () => {
    let filteredData: Shipment[] = [];
    Object.keys(statusFilterInfo).forEach((key) => {
      const item = statusFilterInfo[key];
      if (item.checkedStatus === true) {
        // Perform desired actions with the checked item
        const tempData = filterStatusData(
          originalRows,
          item.field,
          item.sectionValue,
          item.display
        );
        filteredData = filteredData.concat(tempData);
        //add items to show in selected list
        const newItem: SelectedFilterListInfo = {
          display: item.display,
          field: item.field,
          filterType: 1,
          sectionValue: undefined,
          type: "",
          filterVariable: "",
          key: key,
        };
        const existingItem = selectedFilterListForUI.find(
          (item) => item.key === key
        );
        if (!existingItem) {
          selectedFilterListForUI.push(newItem);
        }
      }
    });

    filteredData = filteredData.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    return filteredData;
  };

  //apply Shipment Status Filters
  const applyFilterByShipAndRecp = () => {
    let filteredData: Shipment[] = [];
    let selectedListTemp: SelectedFilterListInfo[] = [];
    Object.keys(shipAndRecpFilterInfo).forEach((key) => {
      const item = shipAndRecpFilterInfo[key];
      if (item.sectionValue.length > 0) {
        // Perform desired actions with the checked item
        if (filteredData.length == 0) filteredData = originalRows;
        filteredData = filterShipperInfoData(
          filteredData,
          item.field,
          item.sectionValue,
          item.type
        );
        // filteredData = filteredData.concat(tempData);
        item.sectionValue.forEach((itemValue: any) => {
          //add items to show in selected list
          const newItem: SelectedFilterListInfo = {
            display: item.display + " : " + itemValue,
            field: item.field,
            filterType: 2,
            sectionValue: itemValue,
            type: "",
            filterVariable: "",
            key: key,
          };
          selectedListTemp.push(newItem);
        });
        //sreevika (may be need to add multple entries)
      }
    });
    selectedFilterListForUI = selectedFilterListForUI.concat(selectedListTemp);
    filteredData = filteredData.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    return filteredData;
  };

  //generic function to handle status filters
  function filterStatusData(
    originalRows: Shipment[],
    filterProperty: string,
    filterValue: any,
    filterSection: string
  ) {
    // selectedListKeyStatus = selectedListKeyStatus.concat(filterProperty)
    selectedListArray = selectedListArray.concat(filterSection);
    return originalRows.filter((item: any) => {
      return Object.keys(item).some((key) => {
        return item[key] === filterValue && key === filterProperty;
      });
    });
  }

  //generic function to handle normal filters
  function filterShipperInfoData(
    originalRows: Shipment[],
    filterProperty: keyof Shipment,
    filterValue: any[],
    type: string
  ) {
    //sreevika (check logic)
    let filterArray: any[] = [];
    if (type == "number") {
      filterArray = filterValue.map((str) => Number(str));
    } else {
      filterArray = filterValue.map((str) => (str === "null" ? null : str));
    }
    if (type == "date") {

      var filteredData = originalRows.filter((item) => {
        const dateValue = formatDate(item[filterProperty], dateFormatToDisplay);
        const formattedDate = moment(dateValue, "MM/DD/YYYY", true).format("MM/DD/YYYY");
        const isValidDate = moment(formattedDate, "MM/DD/YYYY", true).isValid();
      
        return filterArray.includes(isValidDate ? formattedDate : "");
      });
     
      // var filteredData = originalRows.filter((item) =>
      //   filterArray.includes(
      //     moment(moment(item[filterProperty]).format("MM/DD/YYYY")).isValid()
      //       ? moment(item[filterProperty]).format("MM/DD/YYYY")
      //       : "0000-00-00"
      //   )
      // );
    } else {
      var filteredData = originalRows.filter(
        (item) => filterArray.includes(item[filterProperty])
        // filterArray.includes(item[filterProperty]) ||
        // (filterArray.includes(null) && item[filterProperty] === null)
      );
    }

    return filteredData;
  }

  // ------------------------------------------- Sorting --------------------------------------------//

  const sortedRows = (sortingKey: string) => {
    setSortedColumn(sortingKey);
    // Get the current order from state or set an initial order
    const currentOrder = order === "asc" ? "desc" : "asc";
    
    const compareFn = currentOrder === "asc"
      ? (a: any, b: any) => a[sortingKey].localeCompare(b[sortingKey])
      : (a: any, b: any) => b[sortingKey].localeCompare(a[sortingKey]);
  
    const sortedRows = [...rows].sort(compareFn);
  
    setRows(sortedRows);
    setOrder(currentOrder); // Update the order state
    console.log(sortedRows);
  };
 

  

  // Rest of your code...

  return (
    <>
<div  style={ShowLoader ? { display: "block" } : { display: "none" }} className="overlay" >
  <span className="loader"></span>
</div>
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
              </div>
            </div>
            <div className="header-navigation__profile">
              <ul className="header-navigation__actions">
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
                <div className="hero-banner__container-sub-title">
                  {storeId}
                </div>
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
                <div className="dashboard-at-glance__card-title">
                  Exceptions
                </div>
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
              <button className="filter-section__button" onClick={toggleFilter}>
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
                    <path
                      d="M0 0L5 5L10 0H0Z"
                      fill="black"
                      fillOpacity="0.75"
                    />
                  </svg>
                </div>
              </button>
            </div>
            {showFilter ? (
              <>
                <div className="filter-section__body">
                  <div className="filter-section__body-level-1">
                    <ul className="filter-section-list">
                      {/* add active class if its selected */}
                      <li
                        className={
                          innerFilter == 1
                            ? "filter-section-item active"
                            : "filter-section-item"
                        }
                        onClick={() => showInnerFilter("shipStatus")}
                      >
                        <button className="filter-section-btn">
                          <div className="filter-section-btn-icon">
                            <svg
                              className="default-icon"
                              width="28"
                              height="27"
                              viewBox="0 0 28 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.0664 19.6001L21.5 10.1665L19.8336 8.5337L12.0664 16.3337L8.1336 12.4001L6.5 14.0001L12.0664 19.6001ZM14 26.8337C12.1776 26.8337 10.4555 26.4836 8.8336 25.7833C7.2112 25.0836 5.7944 24.1281 4.5832 22.9169C3.372 21.7057 2.41653 20.2889 1.7168 18.6665C1.01653 17.0446 0.666397 15.3225 0.666397 13.5001C0.666397 11.6558 1.01653 9.9225 1.7168 8.3001C2.41653 6.6777 3.372 5.2665 4.5832 4.0665C5.7944 2.8665 7.2112 1.91664 8.8336 1.2169C10.4555 0.516637 12.1776 0.166504 14 0.166504C15.8443 0.166504 17.5776 0.516637 19.2 1.2169C20.8224 1.91664 22.2336 2.8665 23.4336 4.0665C24.6336 5.2665 25.5835 6.6777 26.2832 8.3001C26.9835 9.9225 27.3336 11.6558 27.3336 13.5001C27.3336 15.3225 26.9835 17.0446 26.2832 18.6665C25.5835 20.2889 24.6336 21.7057 23.4336 22.9169C22.2336 24.1281 20.8224 25.0836 19.2 25.7833C17.5776 26.4836 15.8443 26.8337 14 26.8337ZM14 24.6001C17.0891 24.6001 19.7112 23.5222 21.8664 21.3665C24.0221 19.2113 25.1 16.5892 25.1 13.5001C25.1 10.411 24.0221 7.7889 21.8664 5.6337C19.7112 3.47797 17.0891 2.4001 14 2.4001C10.9109 2.4001 8.2888 3.47797 6.1336 5.6337C3.97786 7.7889 2.9 10.411 2.9 13.5001C2.9 16.5892 3.97786 19.2113 6.1336 21.3665C8.2888 23.5222 10.9109 24.6001 14 24.6001Z"
                                fill="#1C1B1F"
                              />
                            </svg>
                            <svg
                              className="active-icon"
                              width="28"
                              height="27"
                              viewBox="0 0 28 27"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.0664 19.6001L21.5 10.1665L19.8336 8.5337L12.0664 16.3337L8.13358 12.4001L6.49998 14.0001L12.0664 19.6001ZM14 26.8337C12.1776 26.8337 10.4554 26.4836 8.83358 25.7833C7.21118 25.0836 5.79438 24.1281 4.58318 22.9169C3.37198 21.7057 2.41652 20.2889 1.71678 18.6665C1.01652 17.0446 0.666382 15.3225 0.666382 13.5001C0.666382 11.6558 1.01652 9.9225 1.71678 8.3001C2.41652 6.6777 3.37198 5.2665 4.58318 4.0665C5.79438 2.8665 7.21118 1.91664 8.83358 1.2169C10.4554 0.516637 12.1776 0.166504 14 0.166504C15.8442 0.166504 17.5776 0.516637 19.2 1.2169C20.8224 1.91664 22.2336 2.8665 23.4336 4.0665C24.6336 5.2665 25.5834 6.6777 26.2832 8.3001C26.9834 9.9225 27.3336 11.6558 27.3336 13.5001C27.3336 15.3225 26.9834 17.0446 26.2832 18.6665C25.5834 20.2889 24.6336 21.7057 23.4336 22.9169C22.2336 24.1281 20.8224 25.0836 19.2 25.7833C17.5776 26.4836 15.8442 26.8337 14 26.8337Z"
                                fill="#0067B2"
                              />
                            </svg>
                          </div>
                          <div className="filter-section-btn-text">
                            Shipment Status
                          </div>
                        </button>
                      </li>
                      <li
                        className={
                          innerFilter == 2
                            ? "filter-section-item active"
                            : "filter-section-item"
                        }
                        onClick={() => showInnerFilter("shipInfo")}
                      >
                        <button className="filter-section-btn">
                          <div className="filter-section-btn-icon">
                            <svg
                              className="default-icon"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.9 10L12 8.4336L15.1 10V2.7336H8.9V10ZM5.3336 19.1664V16.5H12V19.1664H5.3336ZM2.2336 24.5C1.6336 24.5 1.1112 24.2779 0.6664 23.8336C0.222134 23.3888 0 22.8664 0 22.2664V2.7336C0 2.1336 0.222134 1.6112 0.6664 1.1664C1.1112 0.722134 1.6336 0.5 2.2336 0.5H21.7664C22.3664 0.5 22.8888 0.722134 23.3336 1.1664C23.7779 1.6112 24 2.1336 24 2.7336V22.2664C24 22.8664 23.7779 23.3888 23.3336 23.8336C22.8888 24.2779 22.3664 24.5 21.7664 24.5H2.2336ZM2.2336 22.2664H21.7664V2.7336H17.3336V13.6L12 10.9336L6.6664 13.6V2.7336H2.2336V22.2664Z"
                                fill="#1C1B1F"
                              />
                            </svg>
                            <svg
                              className="active-icon"
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.2336 24.5C1.6336 24.5 1.1112 24.2779 0.6664 23.8336C0.222134 23.3888 0 22.8664 0 22.2664V2.7336C0 2.1336 0.222134 1.6112 0.6664 1.1664C1.1112 0.722134 1.6336 0.5 2.2336 0.5H21.7664C22.3664 0.5 22.8888 0.722134 23.3336 1.1664C23.7779 1.6112 24 2.1336 24 2.7336V22.2664C24 22.8664 23.7779 23.3888 23.3336 23.8336C22.8888 24.2779 22.3664 24.5 21.7664 24.5H2.2336ZM5.3336 19.1664H12V16.5H5.3336V19.1664ZM6.6664 13.6L12 10.9336L17.3336 13.6V2.7336H6.6664V13.6Z"
                                fill="#0067B2"
                              />
                            </svg>
                          </div>
                          <div className="filter-section-btn-text">
                            Shipment Information
                          </div>
                        </button>
                      </li>

                      <li
                        className={
                          innerFilter == 4
                            ? "filter-section-item active"
                            : "filter-section-item"
                        }
                        onClick={() => showInnerFilter("recpInfo")}
                      >
                        <button className="filter-section-btn">
                          <div className="filter-section-btn-icon">
                            <svg
                              className="default-icon"
                              width="30"
                              height="23"
                              viewBox="0 0 30 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M23.3665 22.1335C24.4556 22.1335 25.3836 21.75 26.1505 20.9831C26.9169 20.2167 27.3001 19.289 27.3001 18.1999H29.6665V3.0663C29.6665 2.4663 29.4444 1.94416 29.0001 1.4999C28.5558 1.05563 28.0337 0.833496 27.4337 0.833496H8.3665V6.3335H4.7001L0.333704 12.1335V18.1999H2.8001C2.8001 19.289 3.18357 20.2167 3.9505 20.9831C4.7169 21.75 5.65557 22.1335 6.7665 22.1335C7.85557 22.1335 8.78357 21.75 9.5505 20.9831C10.3169 20.2167 10.7001 19.289 10.7001 18.1999H19.4001C19.4001 19.289 19.7836 20.2167 20.5505 20.9831C21.3169 21.75 22.2556 22.1335 23.3665 22.1335ZM23.3665 19.9335C22.878 19.9335 22.467 19.7612 22.1337 19.4167C21.8004 19.0722 21.6337 18.6666 21.6337 18.1999C21.6337 17.7108 21.8004 17.2996 22.1337 16.9663C22.467 16.633 22.878 16.4663 23.3665 16.4663C23.8332 16.4663 24.2388 16.633 24.5833 16.9663C24.9278 17.2996 25.1001 17.7108 25.1001 18.1999C25.1001 18.6666 24.9278 19.0722 24.5833 19.4167C24.2388 19.7612 23.8332 19.9335 23.3665 19.9335ZM27.4337 15.9663H26.6001C26.2225 15.433 25.7614 15.0052 25.2169 14.6831C24.6724 14.361 24.0556 14.1999 23.3665 14.1999C22.6998 14.1999 22.0889 14.3666 21.5337 14.6999C20.978 15.0332 20.5113 15.4554 20.1337 15.9663H10.5665V3.0663H27.4337V15.9663ZM6.7665 19.9335C6.27797 19.9335 5.86704 19.7612 5.5337 19.4167C5.20037 19.0722 5.0337 18.6666 5.0337 18.1999C5.0337 17.7108 5.20037 17.2996 5.5337 16.9663C5.86704 16.633 6.27797 16.4663 6.7665 16.4663C7.23317 16.4663 7.63877 16.633 7.9833 16.9663C8.32784 17.2996 8.5001 17.7108 8.5001 18.1999C8.5001 18.6666 8.32784 19.0722 7.9833 19.4167C7.63877 19.7612 7.23317 19.9335 6.7665 19.9335ZM8.3665 13.1663H2.3337L5.8001 8.5335H8.3665V13.1663Z"
                                fill="#1C1B1F"
                              />
                            </svg>
                            <svg
                              className="active-icon"
                              width="30"
                              height="23"
                              viewBox="0 0 30 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M23.3665 22.1335C24.4556 22.1335 25.3836 21.75 26.1505 20.9831C26.9169 20.2167 27.3001 19.289 27.3001 18.1999H29.6665V3.0663C29.6665 2.4663 29.4444 1.94416 29.0001 1.4999C28.5558 1.05563 28.0337 0.833496 27.4337 0.833496H8.3665V6.3335H4.7001L0.333704 12.1335V18.1999H2.8001C2.8001 19.289 3.18357 20.2167 3.9505 20.9831C4.7169 21.75 5.65557 22.1335 6.7665 22.1335C7.85557 22.1335 8.78357 21.75 9.5505 20.9831C10.3169 20.2167 10.7001 19.289 10.7001 18.1999H19.4001C19.4001 19.289 19.7836 20.2167 20.5505 20.9831C21.3169 21.75 22.2556 22.1335 23.3665 22.1335ZM23.3665 19.9335C22.878 19.9335 22.467 19.7612 22.1337 19.4167C21.8004 19.0722 21.6337 18.6666 21.6337 18.1999C21.6337 17.7108 21.8004 17.2996 22.1337 16.9663C22.467 16.633 22.878 16.4663 23.3665 16.4663C23.8332 16.4663 24.2388 16.633 24.5833 16.9663C24.9278 17.2996 25.1001 17.7108 25.1001 18.1999C25.1001 18.6666 24.9278 19.0722 24.5833 19.4167C24.2388 19.7612 23.8332 19.9335 23.3665 19.9335ZM6.7665 19.9335C6.27797 19.9335 5.86704 19.7612 5.5337 19.4167C5.20037 19.0722 5.0337 18.6666 5.0337 18.1999C5.0337 17.7108 5.20037 17.2996 5.5337 16.9663C5.86704 16.633 6.27797 16.4663 6.7665 16.4663C7.23317 16.4663 7.63877 16.633 7.9833 16.9663C8.32784 17.2996 8.5001 17.7108 8.5001 18.1999C8.5001 18.6666 8.32784 19.0722 7.9833 19.4167C7.63877 19.7612 7.23317 19.9335 6.7665 19.9335ZM8.3665 13.1663H2.3337L5.8001 8.5335H8.3665V13.1663Z"
                                fill="#0067B2"
                              />
                            </svg>
                          </div>
                          <div className="filter-section-btn-text">
                            Recipient Information
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                  {innerFilter == 1 ? (
                    <div className="filter-section__body-level-2 shipper___info__tab">
                      {innerFilter == 1 ? (
                        <ul className="filter-section-list">
                          {Object.keys(statusFilterInfo).map((key) => (
                            <li
                              className="filter-section-item"
                              onClick={() => clickedItem(key)}
                              key={key}
                            >
                              <button
                                className={
                                  selectedDiv === key
                                    ? "filter-section-btn selected"
                                    : "filter-section-btn"
                                }
                              >
                                <Checkbox
                                  label={statusFilterInfo[key].display}
                                  checked={statusFilterInfo[key].checkedStatus}
                                  onChange={statusFilterCheckboxChange}
                                  name={key}
                                  count={statusFilterInfo[key].count}
                                  value={key}
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : innerFilter > 1 ? (
                    <>
                      <div className="filter-section__body-level-2">
                        <ul className="filter-section-list">
                          {innerFilterJson.map((item) => (
                            <li
                              className="filter-section-item"
                              onClick={() => clickedItem(item.field)}
                            >
                              {/* add selected class if its selected */}
                              <button
                                className={
                                  selectedDiv == item.field
                                    ? "filter-section-btn selected"
                                    : "filter-section-btn"
                                }
                                onClick={() => shipperInfoChange(item.field)}
                              >
                                <div className="filter-section-btn-icon"></div>
                                <div className="filter-section-btn-text">
                                  {item.displayFilterTab}
                                </div>
                                <div className="filter-section-btn-count"></div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className={
                          firstlevelClick === true
                            ? "filter-section__body-level-3 hideBlock1"
                            : "filter-section__body-level-3"
                        }
                      >
                        {(() => {
                          const selectedOptionData =
                            shipAndRecpFilterInfo[selectedOption];

                          if (selectedOptionData) {
                            return (
                              <ul className="filter-section-list">
                                {selectedOptionData.orginalData.map((item) => (
                                  <li
                                    className="filter-section-item"
                                    onClick={() => clickedItem(item.name)}
                                  >
                                    <button
                                      className={
                                        selectedDiv_level2 === item.name
                                          ? "filter-section-btn selected"
                                          : "filter-section-btn"
                                      }
                                    >
                                      <Checkbox
                                        label={item.name}
                                        checked={
                                          shipAndRecpFilterInfo[
                                            selectedOption
                                          ]?.sectionValue?.includes(
                                            item.name
                                          ) ?? false
                                        }
                                        onChange={normalFilterCheckboxChange}
                                        name={selectedOption}
                                        count={item.count}
                                        value={item.name}
                                      />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            );
                          } else {
                            return null;
                          }
                        })()}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="filter-section__footer">
                  <div className="filter-section-action">
                    <button
                      className="btn btn-ship--secondary"
                      onClick={closeButton}
                    >
                      CLOSE
                    </button>
                    <button
                      className="btn btn-ship--primary"
                      onClick={() => applyFilters()}
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <ul className="filter-section__applied">
              {selectedFilterListForUI.length > 0 &&
                selectedFilterListForUI.map((filterInfo) => (
                  <li className="filter-section__applied-list">
                    <div className="btn btn-filter-pill">
                      <span>{filterInfo.display}</span>
                      <button
                        className="btn btn-close-pill"
                        onClick={() => clearFilter(filterInfo)}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.99984 0.166748C2.774 0.166748 0.166504 2.77425 0.166504 6.00008C0.166504 9.22592 2.774 11.8334 5.99984 11.8334C9.22567 11.8334 11.8332 9.22592 11.8332 6.00008C11.8332 2.77425 9.22567 0.166748 5.99984 0.166748ZM8.9165 8.09425L8.094 8.91675L5.99984 6.82258L3.90567 8.91675L3.08317 8.09425L5.17734 6.00008L3.08317 3.90591L3.90567 3.08342L5.99984 5.17758L8.094 3.08342L8.9165 3.90591L6.82234 6.00008L8.9165 8.09425Z"
                            fill="#0067B2"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              {anyFilter == true ? (
                <li className="filter-section__applied-list">
                  <button
                    className="btn btn-close-reset"
                    onClick={resetAllFilters}
                  >
                    Reset
                  </button>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>

          <div className="shipping-list container mid-container">
            <Paper>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table aria-label="shipping table" className="filter-table">
                      <TableHead>
                        <TableRow>
                          {Object.keys(intialShipmentTableData).map(key => {
                            const item = intialShipmentTableData[key];
                            return (
                              <TableCell width="274" key={key}>
                                <button className="filter-table__header filter-table__header--button" onClick={() => sortedRows(key)}>
                                  <div className="filter-table__title">
                                    {item.tableHeadLine}
                                  </div>
                                  <div className={(order === "asc" && sortedColumn === key) ? "filter-table__sort-icon ascending" : "filter-table__sort-icon desending"}>
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
                            );
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.trackingNumber}>
                            {Object.keys(intialShipmentTableData).map(key => {
                              const item = intialShipmentTableData[key];
                              return (
                                <TableCell
                                  component="td"
                                  scope="row"
                                  align="left"
                                 
                                  key={key}
                                >
                               {item.type === 1 ? (
                                    row[item.field]
                                  ) : item.type === 2 ? (
                                      <StatusRow
                                      status={row[item.field]}
                                      isDelayed={row.isDelayed}
                                      isException={row.isException}
                                      isDelivered={row.isDelivered}
                                      statusDescription={row.statusDescription}
                                      />
                                  ) : item.type === 3 ? (
                                    row[item.field] !== "" && row[item.field] !== null
                                      ? formatDate(row[item.field], dateFormatToDisplay)
                                      : row.isDelivered
                                      ? ""
                                      : "Pending"
                                  ) : item.type === 4 ? (
                                    formatDate(row[item.field], dateTimeFormatToDisplay)
                                  ) : null}
                                  
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
        <div className="footer__content">
          <div className="footer__item">Help for Shipment tracking</div>
          <div className="footer__item">
            The Service Desk: servicedesk@petsmart.com
          </div>
          <div className="footer__item"> 800.406.2155</div>
        </div>
      </div>
    </>
  );
}
