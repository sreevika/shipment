import ShipmentTableInfo from "../interfaces/shipmentTableInfo";

const intialShipmentTableData: ShipmentTableInfo = {
    trackingNumber: {
    field: "trackingNumber",
    tableHeadLine: "Tracking Number",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },
  status: {
    field: "status",
    tableHeadLine: "Status",
    type: 2  // 1== normal , 2= status, 3= date, 4=dateTime
  },
  scheduledDeliveryDate: {
    field: "scheduledDeliveryDate",
    tableHeadLine: "Scheduled Delivery Date",
    type: 3   // 1== normal , 2= status, 3= date, 4=dateTime
  },
  scheduledDeliveryTimeBefore: {
    field: "scheduledDeliveryTimeBefore",
    tableHeadLine: "Scheduled Delivery Time Before",
    type: 3   // 1== normal , 2= status, 3= date, 4=dateTime
  },
  shipperName: {
    field: "shipperName",
    tableHeadLine: "Shipper Name",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },
  shipperCompany: {
    field: "shipperName",
    tableHeadLine: "Shipper Company",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  shipperCity: {
    field: "shipperCity",
    tableHeadLine: "Shipper City",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  shipperState: {
    field: "shipperState",
    tableHeadLine: "Shipper State",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  shipDate: {
    field: "shipDate",
    tableHeadLine: "Ship Date",
    type: 3   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  deliveryCompany: {
    field: "deliveryCompany",
    tableHeadLine: "Delivery Company",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  storeId: {
    field: "storeId",
    tableHeadLine: "Store Id",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  recipientContactName: {
    field: "recipientContactName",
    tableHeadLine: "Recipient Contact Name",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },
  recipientCompany: {
    field: "recipientCompany",
    tableHeadLine: "Recipient Company",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  recipientAddress: {
    field: "recipientAddress",
    tableHeadLine: "Recipient Address",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  recipientCity: {
    field: "recipientCity",
    tableHeadLine: "Recipient City",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  recipientState: {
    field: "recipientState",
    tableHeadLine: "Recipient State",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  recipientCountry: {
    field: "recipientCountry",
    tableHeadLine: "Recipient Country",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  accountNumber: {
    field: "accountNumber",
    tableHeadLine: "Account Number",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },
  fedExCompany: {
    field: "fedExCompany",
    tableHeadLine: "fedEx Company",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  numberOfAttemptedDeliveries: {
    field: "numberOfAttemptedDeliveries",
    tableHeadLine: "Number of Attempted Deliveries",
    type: 1   // 1== normal , 2= status, 3= date, 4=dateTime
  },

  deliveredTime: {
    field: "deliveredTime",
    tableHeadLine: "Delivered Time",
    type: 4   // 1== normal , 2= status, 3= date, 4=dateTime
  },



}

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