import ShipmentTableInfo from "../interfaces/shipmentTableInfo";
// 1== normal , 2= status, 3= date, 4=dateTime
const intialShipmentTableData: ShipmentTableInfo = {
  trackingNumber: {
    field: "trackingNumber",
    tableHeadLine: "Tracking Number",
    type: 1,
  },
  status: {
    field: "status",
    tableHeadLine: "Status",
    type: 2,
  },
  scheduledDeliveryDate: {
    field: "scheduledDeliveryDate",
    tableHeadLine: "Scheduled Delivery Date",
    type: 3,
  },
  scheduledDeliveryTimeBefore: {
    field: "scheduledDeliveryTimeBefore",
    tableHeadLine: "Scheduled Delivery Time Before",
    type: 3,
  },
  shipperName: {
    field: "shipperName",
    tableHeadLine: "Shipper Name",
    type: 1,
  },
  shipperCompany: {
    field: "shipperName",
    tableHeadLine: "Shipper Company",
    type: 1,
  },

  shipperCity: {
    field: "shipperCity",
    tableHeadLine: "Shipper City",
    type: 1,
  },

  shipperState: {
    field: "shipperState",
    tableHeadLine: "Shipper State",
    type: 1,
  },

  shipDate: {
    field: "shipDate",
    tableHeadLine: "Ship Date",
    type: 3,
  },

  storeId: {
    field: "storeId",
    tableHeadLine: "Store Id",
    type: 1,
  },

  recipientContactName: {
    field: "recipientContactName",
    tableHeadLine: "Recipient Contact Name",
    type: 1,
  },
  recipientCompany: {
    field: "recipientCompany",
    tableHeadLine: "Recipient Company",
    type: 1,
  },

  recipientAddress: {
    field: "recipientAddress",
    tableHeadLine: "Recipient Address",
    type: 1,
  },

  recipientPostal: {
    field: "recipientPostal",
    tableHeadLine: "Recipient Postal",
    type: 1,
  },

  recipientCity: {
    field: "recipientCity",
    tableHeadLine: "Recipient City",
    type: 1,
  },

  recipientState: {
    field: "recipientState",
    tableHeadLine: "Recipient State",
    type: 1,
  },

  recipientCountry: {
    field: "recipientCountry",
    tableHeadLine: "Recipient Country",
    type: 1,
  },

  accountNumber: {
    field: "accountNumber",
    tableHeadLine: "Account Number",
    type: 1,
  },
  fedExCompany: {
    field: "fedExCompany",
    tableHeadLine: "fedEx Company",
    type: 1,
  },
  numberOfAttemptedDeliveries: {
    field: "numberOfAttemptedDeliveries",
    tableHeadLine: "Number of Attempted Deliveries",
    type: 1,
  },
  deliveredTime: {
    field: "deliveredTime",
    tableHeadLine: "Delivered Time",
    type: 4,
  },
  masterTrackingNumber: {
    field: "masterTrackingNumber",
    tableHeadLine: "Master Tracking Number",
    type: 1,
  },
  packageWeightKg: {
    field: "packageWeightKg",
    tableHeadLine: "Pkg Wt (Kg)",
    type: 1,
  },
  packageWeightLbs: {
    field: "packageWeightLbs",
    tableHeadLine: "Pkg Wt (Lbs) ",
    type: 1,
  },
  purchaseOrderNumber: {
    field: "purchaseOrderNumber",
    tableHeadLine: "Purchase Order Number",
    type: 1,
  },
  shippedBy: {
    field: "shippedBy",
    tableHeadLine: "Sshipped By",
    type: 1,
  },
  // shippedTo: {
  //   field: "shippedTo",
  //   tableHeadLine: "shipped To",
  //   type: 1,
  // },
  shipperAddress: {
    field: "shipperAddress",
    tableHeadLine: "Shipper Address",
    type: 1,
  },
  shipperPostal: {
    field: "shipperPostal",
    tableHeadLine: "Shipper Postal",
    type: 1,
  },
  shipperCountry: {
    field: "shipperCountry",
    tableHeadLine: "Shipper Country",
    type: 1,
  },
  specialHandling: {
    field: "specialHandling",
    tableHeadLine: "Special Handling",
    type: 1,
  },
  serviceType: {
    field: "serviceType",
    tableHeadLine: "Service Type",
    type: 1,
  },
  packageCount: {
    field: "packageCount",
    tableHeadLine: "No. of packages",
    type: 1,
  },
};

export default intialShipmentTableData;

/*

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
  insertedTime: string;  */
