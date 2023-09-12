interface UpsShipment {
  
    trackingNumber: string;
    accountNumber: string | null;
    status: string;
    statusCode: string | null;
    statusDescription: string;
    manifestDate: string;
    service: string | null;
    scheduledDeliveryDate: string | null;
    deliveredDate: string | null;
    packageCount: number|null;
    shipperCity: string | null;
    shipperState: string | null;
    shipperCountry: string;
    recipientCity: string;
    recipientState: string;
    recipientCountry: string | null;
    isException: boolean;
    isOutForDelivery: boolean;
  
  }
  
  export default UpsShipment;