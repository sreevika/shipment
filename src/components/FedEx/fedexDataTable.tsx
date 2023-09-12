import React  from "react";
import ShipmentTableInfo from "../../interfaces/shipmentTableInfo";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";

interface FedexDataTableProps {
    intialShipmentTableData :ShipmentTableInfo,
  }

const FedexDataTable: React.FC<FedexDataTableProps> = ({
    intialShipmentTableData
}) => {
  return (
  
  <><Table aria-label="shipping table" className="filter-table">
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
                                              fillOpacity="0.75" />
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
                                          statusDescription={row.statusDescription} />
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
      </Table><Table aria-label="shipping table" className="filter-table">
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
                                                  fillOpacity="0.75" />
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
                                              statusDescription={row.statusDescription} />
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
          </Table></>