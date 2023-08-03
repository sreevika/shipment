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
import SearchBar from "../../components/fedEx/searchBar";
import StatusRow from "../../components/statusRow";
import SelectedFilterListInfo from "../../interfaces/selectedFilterListInfo";
import initialStatusFilterInfo from "../../constants/statusFIlterData";
import intialNormalFilterInfo from "../../constants/normalFilterData";
import intialShipmentTableData from "../../constants/shipmentTableData";
import CardSection from "../../components/fedEx/cardSection";
import FilterOptions from "../../components/fedEx/filterOptions";
import AppliedFilter from "../../components/fedEx/appliedFilter";


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
        console.log("Fetch Data")
        setShowLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once
  const totalRecords =originalRows_backup.length;
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
    clearSearchValue();
    resetAllFilters();
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
      setAnyFilter(true);
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
  
      
       //console.log(JSON.stringify(rows))
    
        setRows(originalRows1);
        console.log(JSON.stringify(rows))
    }
  };
  let filterRecord = rows.length;
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
  
    setShowLoader(true);
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
      let tempArr :any[] = [];
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
        setShowLoader(false);
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
      var emptyDateText ="";
      if(propertyName === "deliveredTime"){
        emptyDateText ="Not Delivered"
      }

      return _(data)
        .groupBy((item) => {
          const formattedDate = moment(item[propertyName]).format("MM/DD/YYYY");
          return moment(formattedDate).isValid() ? formattedDate : emptyDateText ;
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
    //card selection
    setCardSelected("");
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
     
      var emptyDateText ="";
      if(filterProperty === "deliveredTime"){
        emptyDateText ="Not Delivered"
      }

      var filteredData = originalRows.filter((item) => {
        const dateValue = formatDate(item[filterProperty], dateFormatToDisplay);
        const formattedDate = moment(dateValue, "MM/DD/YYYY", true).format("MM/DD/YYYY");
        const isValidDate = moment(formattedDate, "MM/DD/YYYY", true).isValid();
      
        return filterArray.includes(isValidDate ? formattedDate : emptyDateText);
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
                  onClick={resetAllFilters}
                className="header-navigation__logo-item header-navigation__ps-logo"
              >
                <img
                  className="ps-logo__image"
                  src={petsmartImg}
                  alt="Pet Smart Logo"
                />
              </a>
              <a
                 onClick={resetAllFilters}
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
                <a  onClick={resetAllFilters} className="header-navigation__menu-link active">
                  FedEx
                </a>
              </li>
              {/* <li className="header-navigation__menu-item">
              <a href="#" className="header-navigation__menu-link">
                UPS
              </a>
            </li> */}
            </ul>
            <SearchBar
              searchType={searchType}
              dropDown={dropDown}
              selectSearchType={selectSearchType}
              onchangeSearchType={onchangeSearchType} 
              searchValue={searchValue}
              searchValueChange={searchValueChange}
              searchData={searchData}
              clearSearchValue={clearSearchValue}
            />

          
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
        <CardSection
        isCardSelected={isCardSelected}
        filterByBlock={filterByBlock}
        dashboardIconPack={dashboardIconPack}
        onTimeCount={onTimeCount}
        exceptionCount={exceptionCount}
        outForDeliveryCount={outForDeliveryCount}
        cancelledCount={cancelledCount}
        delayedCount={delayedCount}
        deliveredCount={deliveredCount}
        deliveredTodayCount={deliveredTodayCount}
        earlyDeliveryCount={earlyDeliveryCount}
        />
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
              <div className="div-total-record">{filterRecord}/{totalRecords}</div>
            </div>
            {showFilter ? (
              <FilterOptions
                innerFilter={innerFilter}
                showInnerFilter={showInnerFilter}
                statusFilterInfo={statusFilterInfo}
                clickedItem={clickedItem}
                selectedDiv={selectedDiv}
                Checkbox={Checkbox}
                statusFilterCheckboxChange={statusFilterCheckboxChange}
                innerFilterJson={innerFilterJson}
                shipperInfoChange={shipperInfoChange}
                firstlevelClick={firstlevelClick}
                shipAndRecpFilterInfo={shipAndRecpFilterInfo}
                selectedOption={selectedOption}
                selectedDiv_level2={selectedDiv_level2}
                normalFilterCheckboxChange={normalFilterCheckboxChange}
                closeButton={closeButton}
                applyFilters={applyFilters} 
                />
            ) : (
              ""
            )}
         
            <AppliedFilter
            selectedFilterListForUI={selectedFilterListForUI}
            clearFilter={clearFilter}
            anyFilter={anyFilter}
            resetAllFilters={resetAllFilters}
            />
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
                          
                          <TableRow key={row.trackingNumberUniqueId}>
                           
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

                                  trim(row[item.field]) === "" ? "--" : row[item.field]
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
                                      ? "--"
                                      : "Pending"
                                  ) : item.type === 4 ? (
                                    row[item.field] !== "" && row[item.field] !== null ?
                                    formatDate(row[item.field], dateTimeFormatToDisplay)
                                    : "--"
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
