import NormalFilterInfo from "../interfaces/normalFilterInfo";

const initialNormalFilterInfo: NormalFilterInfo = {
  accountNo: {
    field: "accountNumber",
    //sectionValue: filterConditions.filter_layer1_accountNo,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_accountNo",
    display: "Account No",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  deliveredDate: {
    field: "deliveredTime",
    //sectionValue: filterConditions.filter_layer1_deliveredDate,
    sectionValue: undefined,
    type: "date",
    filterVariable: "filter_layer1_deliveredDate",
    display: "Delivered Date",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  numberOfAttempt: {
    field: "numberOfAttemptedDeliveries",
    //sectionValue: filterConditions.filter_layer1_attemptDelivery,
    sectionValue: undefined,
    type: "number",
    filterVariable: "filter_layer1_attemptDelivery",
    display: "No of Attempt",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  packageKg: {
    field: "packageWeightKg",
    //sectionValue: filterConditions.filter_layer1_packageKg,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_packageKg",
    display: "PKG(KG)",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  packageLbs: {
    field: "packageWeightLbs",
    //sectionValue: filterConditions.filter_layer1_packageLbs,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_packageLbs",
    display: "PKG(Lbs)",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  purchaseOrderNumber: {
    field: "purchaseOrderNumber",
    //sectionValue: filterConditions.filter_layer1_purchaseOrder,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_purchaseOrder",
    display: "PO No",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  reference: {
    field: "reference",
    //sectionValue: filterConditions.filter_layer1_reference,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_reference",
    display: "Reference",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  scheduledDeliveryDate: {
    field: "scheduledDeliveryDate",
    //sectionValue: filterConditions.filter_layer1_scheduledDeliveryDate,
    sectionValue: undefined,
    type: "date",
    filterVariable: "filter_layer1_scheduledDeliveryDate",
    display: "Sch. Delivery Date",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  shipDate: {
    field: "shipDate",
    //sectionValue: filterConditions.filter_layer1_shipDate,
    sectionValue: undefined,
    type: "date",
    filterVariable: "filter_layer1_shipDate",
    display: "Ship Date",
    filterType: "shipInfo",
    checkedStatus: false,
    count: 0,
  },
  recipientContactName: {
    field: "recipientContactName",
    //sectionValue: filterConditions.filter_layer1_recipientContactName,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_recipientContactName",
    display: "Recipient Name",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
  },
  recipientCompany: {
    field: "recipientCompany",
    //sectionValue: filterConditions.filter_layer1_recipientCompany,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_recipientCompany",
    display: "Recipient Company",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
  },
  recipientAddress: {
    field: "recipientAddress",
    //sectionValue: filterConditions.filter_layer1_recipientAddress,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_recipientAddress",
    display: "Recipient Address",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
  },
  recipientCity: {
    field: "recipientCity",
    //sectionValue: filterConditions.filter_layer1_recipientCity,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_recipientCity",
    display: "Recipient City",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
  },
  recipientState: {
    field: "recipientState",
    //sectionValue: filterConditions.filter_layer1_recipientState,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_recipientState",
    display: "Recipient State",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
  },
  recipientCountry: {
    field: "recipientCountry",
    //sectionValue: filterConditions.filter_layer1_recipientCountry,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_recipientCountry",
    display: "Recipient Country",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
  },
  recipientPostal: {
    field: "recipientPostal",
    //sectionValue: filterConditions.filter_layer1_recipientPostal,
    sectionValue: undefined,
    type: "string",
    filterVariable: "filter_layer1_recipientPostal",
    display: "Recipient Postal",
    filterType: "recpInfo",
    checkedStatus: false,
    count: 0,
  },
};

export default initialNormalFilterInfo;
