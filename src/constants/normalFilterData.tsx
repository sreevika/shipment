import NormalFilterInfo from "../interfaces/normalFilterInfo";

const intialNormalFilterInfo: NormalFilterInfo = {
  accountNo: {
    field: "accountNumber",
    //sectionValue: filterConditions.filter_layer1_accountNo,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_accountNo",
    display: "Account No",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Account Number",
    orginalData: [],
  },
  deliveredDate: {
    field: "deliveredTime",
    //sectionValue: filterConditions.filter_layer1_deliveredDate,
    sectionValue:[],
    type: "date",
    filterVariable: "filter_layer1_deliveredDate",
    display: "Delivered Date",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Delivered Date",
    orginalData: [],
  },
  numberOfAttempt: {
    field: "numberOfAttemptedDeliveries",
    //sectionValue: filterConditions.filter_layer1_attemptDelivery,
    sectionValue:[],
    type: "number",
    filterVariable: "filter_layer1_attemptDelivery",
    display: "No of Attempt",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Number Of Attempted Deliveries",
    orginalData: [],
  },
  packageKg: {
    field: "packageWeightKg",
    //sectionValue: filterConditions.filter_layer1_packageKg,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_packageKg",
    display: "PKG(KG)",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Package Weight (Kg)",
    orginalData: [],
  },
  packageLbs: {
    field: "packageWeightLbs",
    //sectionValue: filterConditions.filter_layer1_packageLbs,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_packageLbs",
    display: "PKG(Lbs)",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Package Weight (Lbs)",
    orginalData: [],
  },
  purchaseOrderNumber: {
    field: "purchaseOrderNumber",
    //sectionValue: filterConditions.filter_layer1_purchaseOrder,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_purchaseOrder",
    display: "PO No",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Purchase Order Number",
    orginalData: [],
  },
  reference: {
    field: "reference",
    //sectionValue: filterConditions.filter_layer1_reference,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_reference",
    display: "Reference",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Reference",
    orginalData: [],
  },
  scheduledDeliveryDate: {
    field: "scheduledDeliveryDate",
    //sectionValue: filterConditions.filter_layer1_scheduledDeliveryDate,
    sectionValue:[],
    type: "date",
    filterVariable: "filter_layer1_scheduledDeliveryDate",
    display: "Sch. Delivery Date",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Scheduled Delivery Date",
    orginalData: [],
  },
  shipDate: {
    field: "shipDate",
    //sectionValue: filterConditions.filter_layer1_shipDate,
    sectionValue:[],
    type: "date",
    filterVariable: "filter_layer1_shipDate",
    display: "Ship Date",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Ship Date",
    orginalData: [],
  },
  recipientContactName: {
    field: "recipientContactName",
    //sectionValue: filterConditions.filter_layer1_recipientContactName,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_recipientContactName",
    display: "Recipient Name",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Recipient Contact Name",
    orginalData: [],
  },
  recipientCompany: {
    field: "recipientCompany",
    //sectionValue: filterConditions.filter_layer1_recipientCompany,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_recipientCompany",
    display: "Recipient Company",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Recipient Company",
    orginalData: [],
  },
  recipientAddress: {
    field: "recipientAddress",
    //sectionValue: filterConditions.filter_layer1_recipientAddress,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_recipientAddress",
    display: "Recipient Address",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Recipient Address",
    orginalData: [],
  },
  recipientCity: {
    field: "recipientCity",
    //sectionValue: filterConditions.filter_layer1_recipientCity,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_recipientCity",
    display: "Recipient City",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Recipient City",
    orginalData: [],
  },
  recipientState: {
    field: "recipientState",
    //sectionValue: filterConditions.filter_layer1_recipientState,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_recipientState",
    display: "Recipient State",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Recipient State",
    orginalData: [],
  },
  recipientCountry: {
    field: "recipientCountry",
    //sectionValue: filterConditions.filter_layer1_recipientCountry,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_recipientCountry",
    display: "Recipient Country",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Recipient Country",
    orginalData: [],
  },
  recipientPostal: {
    field: "recipientPostal",
    //sectionValue: filterConditions.filter_layer1_recipientPostal,
    sectionValue:[],
    type: "string",
    filterVariable: "filter_layer1_recipientPostal",
    display: "Recipient Postal",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
    displayFilterTab: "Recipient Country",
    orginalData: [],
  },
};

export default intialNormalFilterInfo;
