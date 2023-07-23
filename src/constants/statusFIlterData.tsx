import StatusFilterInfo from "../interfaces/statusFilterInfo";

const initialStatusFiltersInfo: StatusFilterInfo = {
  delayed: {
    field: "isDelayed",
    sectionValue: true,
    display: "Delayed",
    checkedStatus: false,
    count: 0,
  },
  delivered: {
    field: "isDelivered",
    sectionValue: true,
    display: "Delivered",
    checkedStatus: false,
    count: 0,
  },
  exception: {
    field: "isException",
    sectionValue: true,
    display: "Exception",
    checkedStatus: false,
    count: 0,
  },
  inTransit: {
    field: "status",
    sectionValue: "In transit",
    display: "In transit",
    checkedStatus: false,
    count: 0,
  },
  label: {
    field: "status",
    sectionValue: "Initiated",
    display: "Label",
    checkedStatus: false,
    count: 0,
  },
  
};

export default initialStatusFiltersInfo;
