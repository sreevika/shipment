import React  from "react";

interface CardSectionProps {
    isCardSelected: string;
    filterByBlock: (searchType: string) => void;
    dashboardIconPack: (iconName: string) => JSX.Element | undefined;
    onTimeCount: number;
    exceptionCount: number;
    outForDeliveryCount: number;
    cancelledCount: number;
    delayedCount: number;
    deliveredCount: number;
    deliveredTodayCount: number; // Add this prop
    earlyDeliveryCount: number;
   
  }

const CardSection: React.FC<CardSectionProps> = ({
    isCardSelected,
    filterByBlock,
    dashboardIconPack,
    onTimeCount,
    exceptionCount,
    outForDeliveryCount,
    cancelledCount,
    delayedCount,
    deliveredCount,
    deliveredTodayCount,
    earlyDeliveryCount
}) => {
  return (
    <><div className="dashboard-at-glance container mid-container">
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
</div> </>
  );
};

export default CardSection;