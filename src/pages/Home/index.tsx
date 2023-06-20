import { useEffect, useState } from "react";

//import SearchBar from "material-ui-search-bar";

import Grid from "@mui/material/Grid";
import "./home-style.css";

import petsmartImg from "../../assets/images/petsmart.png";
import pangeaImg from "../../assets/images/pangea.png";
import checkCircle from "../../assets/images/check_circle.png";
import transit from "../../assets/images/transit.png";
import labelImg from "../../assets/images/label-img.png";
import rightArrowImg from "../../assets/images/line_end_arrow.png";
import packageImg from "../../assets/images/package.png";
import redAlertImg from "../../assets/images/red-alert.png";
import yellowAlertImg from "../../assets/images/yellow-alert.png";
import greenTickImg from "../../assets/images/green-tick.png";

import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  useTheme,
  Box,
  IconButton,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return day + "/" + month + "/" + year;
}
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
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

let originalRows1: shipment[] = [];
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
        originalRows1 = response.data.data;
        setRows(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  const navigate = useNavigate(); // Use the useNavigate hook here

  const [searchType, setSearchType] = useState("storeId");
  const [searchValue, setSearchValue] = useState("");

  const searchTypeSelectionChange = (e: { target: { value: any } }) => {
    setSearchType(e.target.value);
  };

  const handleLogout = () => {
    navigate("/login"); // Use the navigate function to navigate to the login page
  };
  let originalRows = originalRows1;
  const searchValueChange = (e: any) => {
    setSearchValue(e.target.value);

    if (searchType != "" && searchValue != "") {
      if (searchType == "storeId") {
        originalRows = originalRows1.filter((item) => {
          return Object.keys(item).some(
            (key) => item.storeId == e.target.value
          );
        });
      } else {
        originalRows = originalRows1.filter((item) => {
          return Object.keys(item).some(
            (key) => item.trackingNumber == e.target.value
          );
        });
      }
    } else {
      originalRows = originalRows1;
    }

    setRows(originalRows1);
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
  const date = new Date();
  const last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayDate = getFormattedDate(date);
  const lastDayDate = getFormattedDate(last);
  const [data, setData] = useState(originalRows);

  const filterByBlock = (value: string) => {
    if (value === "") setRows(originalRows);
    else {
      let filteredData = originalRows;
      if (value === "all") {
        filteredData = originalRows;
      } else if (value === "onTime") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some((key) => item.isOnTime == true);
        });
      } else if (value === "exception") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(
            (key) => item.isException == true && item.isDelivered == false
          );
        });
      } else if (value === "delivered") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some((key) => item.isDelivered == true);
        });
      } else if (value === "delayed") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some((key) => item.isDelayed == true);
        });
      } else if (value === "early") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some((key) => item.isEarly == true);
        });
      } else if (value === "cancelled") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some((key) => item.isCancelled == true);
        });
      } else if (value === "outForDelivery") {
        filteredData = originalRows.filter((item) => {
          return Object.keys(item).some(
            (key) => item.isOutForDelivery == true && item.isDelivered == false
          );
        });
      }

      setData(filteredData);
      setRows(filteredData);
    }
  };

  // Rest of your code...

  return (
    <>
      <nav className="navigation">
        <a className="logo-container">
          <div className="mr-3 pl-4">
            <img className="logo-1" src={petsmartImg} alt="..." />
          </div>
          <div className="mr-3">
            <span className="pipe"></span>
          </div>
          <div>
            <img className="logo-2" src={pangeaImg} alt="..." />
          </div>
        </a>
        <div className="navigation-right">
          <ul className="navigation-center">
            <li>
              <a href="" className="nav-link active nav-link1">
                FedEx
              </a>
            </li>
            <li>
              <a href="" className="nav-link disabled">
                Ups
              </a>
            </li>
            <li className="nav-item"></li>
          </ul>
          <div className="form form-inline my-2 my-lg-0">
            <div className="search-select">
              <select
                className="form-control form-input select-search"
                value={searchType}
                onChange={searchTypeSelectionChange}
              >
                <option value="storeId">Store ID</option>
                <option value="trackNo">Tracking Number</option>
              </select>
            </div>
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control form-input"
              placeholder="Search..."
              value={searchValue}
              onChange={searchValueChange}
            />
          </div>

          <div className="logout-bar">
            <a className="logout-link" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </nav>

      <div className="imgBanner">
        <div className="container imgBanner-container">
          <div className="imgBanner-content">
            <div className="LabelHead">Shipment Dashboard</div>
            <div className=" LabelHead1">
              {lastDayDate} - {todayDate}
            </div>
          </div>
        </div>
        <div className="dashboard-pattern"></div>
      </div>
      <div className="GridPannel">
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
      </div>
      <div className="table-div">
        <Paper>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>TRACKING NUMBER</TableCell>
                  <TableCell align="left">STATUS</TableCell>
                  <TableCell align="left">SCHEDULED DELIVERY DATE</TableCell>
                  <TableCell align="left">
                    SCHEDULED DELIVERY TIME BEFORE
                  </TableCell>
                  <TableCell align="left">SHIPPER NAME</TableCell>
                  <TableCell align="left">SHIPPER COMPANY</TableCell>
                  <TableCell align="left">SHIPPER CITY</TableCell>
                  <TableCell align="left">SHIPPER STATE</TableCell>
                  <TableCell align="left">SHIP DATE</TableCell>
                  <TableCell align="left">DELIVERY COMPANY</TableCell>
                  <TableCell align="left">STORE ID</TableCell>
                  <TableCell align="left">RECIPIENT CONTACT NAME</TableCell>
                  <TableCell align="left">RECIPIENT COMPANY</TableCell>
                  <TableCell align="left">RECIPIENT ADDRESS</TableCell>
                  <TableCell align="left">RECIPIENT CITY</TableCell>
                  <TableCell align="left">RECIPIENT STATE</TableCell>
                  <TableCell align="left">RECIPIENT COUNTRY</TableCell>
                  <TableCell align="left">ACCOUNT NUMBER</TableCell>
                  <TableCell align="left">FEDEX COMPANY</TableCell>
                  <TableCell align="left">
                    Number of Attempted Deliveries
                  </TableCell>
                  <TableCell align="left">DELIVERY DATE</TableCell>
                  <TableCell align="left">MASTER TRACKING NUMBER</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.trackingNumber}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                      className="tranckRow"
                      width="25%"
                    >
                      {row.trackingNumber}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                      width="25%"
                    >
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
                      <small>{row.statusDescription}</small>
                    </TableCell>
                    <TableCell align="left" width="15%">
                      {row.scheduledDeliveryDate == null && <>-- </>}
                      {row.scheduledDeliveryDate != null && (
                        <>{row.scheduledDeliveryDate} </>
                      )}
                    </TableCell>
                    <TableCell align="left" width="18%">
                      {row.scheduledDeliveryTimeBefore == null && <>-- </>}
                      {row.scheduledDeliveryTimeBefore != null && (
                        <> {row.scheduledDeliveryTimeBefore} </>
                      )}{" "}
                    </TableCell>
                    <TableCell align="left" width="17%">
                      {row.shipperName}
                    </TableCell>
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
    </>
  );
}
