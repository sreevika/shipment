import React  from "react";

interface FilterOptionsProps {
  innerFilter :number
  showInnerFilter: (searchType: string) => void;
  statusFilterInfo :any;
  clickedItem: (item: string) => void;
  selectedDiv :any;
  Checkbox:any;
  statusFilterCheckboxChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
  innerFilterJson :any;
  shipperInfoChange: (item: string) => void;
  firstlevelClick :boolean;
  shipAndRecpFilterInfo:any;
  selectedOption : any;
  selectedDiv_level2:any;
  normalFilterCheckboxChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
  closeButton : () => void;
  applyFilters: () => void;
  }

const FilterOptions: React.FC<FilterOptionsProps> = ({
  innerFilter,
  showInnerFilter,
  statusFilterInfo,
  clickedItem,
  selectedDiv,
  Checkbox,
  statusFilterCheckboxChange,
  innerFilterJson,
  shipperInfoChange,
  firstlevelClick,
  shipAndRecpFilterInfo,
  selectedOption,
  selectedDiv_level2,
  normalFilterCheckboxChange,
  closeButton,
  applyFilters
}) => {
  return (<>
<div className="filter-section__body">
  <div className="filter-section__body-level-1">
    <ul className="filter-section-list">
      {/* add active class if its selected */}
      <li
        className={
          innerFilter == 1
            ? "filter-section-item active"
            : "filter-section-item"
        }
        onClick={() => showInnerFilter("shipStatus")}
      >
        <button className="filter-section-btn">
          <div className="filter-section-btn-icon">
            <svg
              className="default-icon"
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0664 19.6001L21.5 10.1665L19.8336 8.5337L12.0664 16.3337L8.1336 12.4001L6.5 14.0001L12.0664 19.6001ZM14 26.8337C12.1776 26.8337 10.4555 26.4836 8.8336 25.7833C7.2112 25.0836 5.7944 24.1281 4.5832 22.9169C3.372 21.7057 2.41653 20.2889 1.7168 18.6665C1.01653 17.0446 0.666397 15.3225 0.666397 13.5001C0.666397 11.6558 1.01653 9.9225 1.7168 8.3001C2.41653 6.6777 3.372 5.2665 4.5832 4.0665C5.7944 2.8665 7.2112 1.91664 8.8336 1.2169C10.4555 0.516637 12.1776 0.166504 14 0.166504C15.8443 0.166504 17.5776 0.516637 19.2 1.2169C20.8224 1.91664 22.2336 2.8665 23.4336 4.0665C24.6336 5.2665 25.5835 6.6777 26.2832 8.3001C26.9835 9.9225 27.3336 11.6558 27.3336 13.5001C27.3336 15.3225 26.9835 17.0446 26.2832 18.6665C25.5835 20.2889 24.6336 21.7057 23.4336 22.9169C22.2336 24.1281 20.8224 25.0836 19.2 25.7833C17.5776 26.4836 15.8443 26.8337 14 26.8337ZM14 24.6001C17.0891 24.6001 19.7112 23.5222 21.8664 21.3665C24.0221 19.2113 25.1 16.5892 25.1 13.5001C25.1 10.411 24.0221 7.7889 21.8664 5.6337C19.7112 3.47797 17.0891 2.4001 14 2.4001C10.9109 2.4001 8.2888 3.47797 6.1336 5.6337C3.97786 7.7889 2.9 10.411 2.9 13.5001C2.9 16.5892 3.97786 19.2113 6.1336 21.3665C8.2888 23.5222 10.9109 24.6001 14 24.6001Z"
                fill="#1C1B1F"
              />
            </svg>
            <svg
              className="active-icon"
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0664 19.6001L21.5 10.1665L19.8336 8.5337L12.0664 16.3337L8.13358 12.4001L6.49998 14.0001L12.0664 19.6001ZM14 26.8337C12.1776 26.8337 10.4554 26.4836 8.83358 25.7833C7.21118 25.0836 5.79438 24.1281 4.58318 22.9169C3.37198 21.7057 2.41652 20.2889 1.71678 18.6665C1.01652 17.0446 0.666382 15.3225 0.666382 13.5001C0.666382 11.6558 1.01652 9.9225 1.71678 8.3001C2.41652 6.6777 3.37198 5.2665 4.58318 4.0665C5.79438 2.8665 7.21118 1.91664 8.83358 1.2169C10.4554 0.516637 12.1776 0.166504 14 0.166504C15.8442 0.166504 17.5776 0.516637 19.2 1.2169C20.8224 1.91664 22.2336 2.8665 23.4336 4.0665C24.6336 5.2665 25.5834 6.6777 26.2832 8.3001C26.9834 9.9225 27.3336 11.6558 27.3336 13.5001C27.3336 15.3225 26.9834 17.0446 26.2832 18.6665C25.5834 20.2889 24.6336 21.7057 23.4336 22.9169C22.2336 24.1281 20.8224 25.0836 19.2 25.7833C17.5776 26.4836 15.8442 26.8337 14 26.8337Z"
                fill="#0067B2"
              />
            </svg>
          </div>
          <div className="filter-section-btn-text">
            Shipment Status
          </div>
        </button>
      </li>
      <li
        className={
          innerFilter == 2
            ? "filter-section-item active"
            : "filter-section-item"
        }
        onClick={() => showInnerFilter("shipInfo")}
      >
        <button className="filter-section-btn">
          <div className="filter-section-btn-icon">
            <svg
              className="default-icon"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.9 10L12 8.4336L15.1 10V2.7336H8.9V10ZM5.3336 19.1664V16.5H12V19.1664H5.3336ZM2.2336 24.5C1.6336 24.5 1.1112 24.2779 0.6664 23.8336C0.222134 23.3888 0 22.8664 0 22.2664V2.7336C0 2.1336 0.222134 1.6112 0.6664 1.1664C1.1112 0.722134 1.6336 0.5 2.2336 0.5H21.7664C22.3664 0.5 22.8888 0.722134 23.3336 1.1664C23.7779 1.6112 24 2.1336 24 2.7336V22.2664C24 22.8664 23.7779 23.3888 23.3336 23.8336C22.8888 24.2779 22.3664 24.5 21.7664 24.5H2.2336ZM2.2336 22.2664H21.7664V2.7336H17.3336V13.6L12 10.9336L6.6664 13.6V2.7336H2.2336V22.2664Z"
                fill="#1C1B1F"
              />
            </svg>
            <svg
              className="active-icon"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.2336 24.5C1.6336 24.5 1.1112 24.2779 0.6664 23.8336C0.222134 23.3888 0 22.8664 0 22.2664V2.7336C0 2.1336 0.222134 1.6112 0.6664 1.1664C1.1112 0.722134 1.6336 0.5 2.2336 0.5H21.7664C22.3664 0.5 22.8888 0.722134 23.3336 1.1664C23.7779 1.6112 24 2.1336 24 2.7336V22.2664C24 22.8664 23.7779 23.3888 23.3336 23.8336C22.8888 24.2779 22.3664 24.5 21.7664 24.5H2.2336ZM5.3336 19.1664H12V16.5H5.3336V19.1664ZM6.6664 13.6L12 10.9336L17.3336 13.6V2.7336H6.6664V13.6Z"
                fill="#0067B2"
              />
            </svg>
          </div>
          <div className="filter-section-btn-text">
            Shipment Information
          </div>
        </button>
      </li>

      <li
        className={
          innerFilter == 4
            ? "filter-section-item active"
            : "filter-section-item"
        }
        onClick={() => showInnerFilter("recpInfo")}
      >
        <button className="filter-section-btn">
          <div className="filter-section-btn-icon">
            <svg
              className="default-icon"
              width="30"
              height="23"
              viewBox="0 0 30 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3665 22.1335C24.4556 22.1335 25.3836 21.75 26.1505 20.9831C26.9169 20.2167 27.3001 19.289 27.3001 18.1999H29.6665V3.0663C29.6665 2.4663 29.4444 1.94416 29.0001 1.4999C28.5558 1.05563 28.0337 0.833496 27.4337 0.833496H8.3665V6.3335H4.7001L0.333704 12.1335V18.1999H2.8001C2.8001 19.289 3.18357 20.2167 3.9505 20.9831C4.7169 21.75 5.65557 22.1335 6.7665 22.1335C7.85557 22.1335 8.78357 21.75 9.5505 20.9831C10.3169 20.2167 10.7001 19.289 10.7001 18.1999H19.4001C19.4001 19.289 19.7836 20.2167 20.5505 20.9831C21.3169 21.75 22.2556 22.1335 23.3665 22.1335ZM23.3665 19.9335C22.878 19.9335 22.467 19.7612 22.1337 19.4167C21.8004 19.0722 21.6337 18.6666 21.6337 18.1999C21.6337 17.7108 21.8004 17.2996 22.1337 16.9663C22.467 16.633 22.878 16.4663 23.3665 16.4663C23.8332 16.4663 24.2388 16.633 24.5833 16.9663C24.9278 17.2996 25.1001 17.7108 25.1001 18.1999C25.1001 18.6666 24.9278 19.0722 24.5833 19.4167C24.2388 19.7612 23.8332 19.9335 23.3665 19.9335ZM27.4337 15.9663H26.6001C26.2225 15.433 25.7614 15.0052 25.2169 14.6831C24.6724 14.361 24.0556 14.1999 23.3665 14.1999C22.6998 14.1999 22.0889 14.3666 21.5337 14.6999C20.978 15.0332 20.5113 15.4554 20.1337 15.9663H10.5665V3.0663H27.4337V15.9663ZM6.7665 19.9335C6.27797 19.9335 5.86704 19.7612 5.5337 19.4167C5.20037 19.0722 5.0337 18.6666 5.0337 18.1999C5.0337 17.7108 5.20037 17.2996 5.5337 16.9663C5.86704 16.633 6.27797 16.4663 6.7665 16.4663C7.23317 16.4663 7.63877 16.633 7.9833 16.9663C8.32784 17.2996 8.5001 17.7108 8.5001 18.1999C8.5001 18.6666 8.32784 19.0722 7.9833 19.4167C7.63877 19.7612 7.23317 19.9335 6.7665 19.9335ZM8.3665 13.1663H2.3337L5.8001 8.5335H8.3665V13.1663Z"
                fill="#1C1B1F"
              />
            </svg>
            <svg
              className="active-icon"
              width="30"
              height="23"
              viewBox="0 0 30 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3665 22.1335C24.4556 22.1335 25.3836 21.75 26.1505 20.9831C26.9169 20.2167 27.3001 19.289 27.3001 18.1999H29.6665V3.0663C29.6665 2.4663 29.4444 1.94416 29.0001 1.4999C28.5558 1.05563 28.0337 0.833496 27.4337 0.833496H8.3665V6.3335H4.7001L0.333704 12.1335V18.1999H2.8001C2.8001 19.289 3.18357 20.2167 3.9505 20.9831C4.7169 21.75 5.65557 22.1335 6.7665 22.1335C7.85557 22.1335 8.78357 21.75 9.5505 20.9831C10.3169 20.2167 10.7001 19.289 10.7001 18.1999H19.4001C19.4001 19.289 19.7836 20.2167 20.5505 20.9831C21.3169 21.75 22.2556 22.1335 23.3665 22.1335ZM23.3665 19.9335C22.878 19.9335 22.467 19.7612 22.1337 19.4167C21.8004 19.0722 21.6337 18.6666 21.6337 18.1999C21.6337 17.7108 21.8004 17.2996 22.1337 16.9663C22.467 16.633 22.878 16.4663 23.3665 16.4663C23.8332 16.4663 24.2388 16.633 24.5833 16.9663C24.9278 17.2996 25.1001 17.7108 25.1001 18.1999C25.1001 18.6666 24.9278 19.0722 24.5833 19.4167C24.2388 19.7612 23.8332 19.9335 23.3665 19.9335ZM6.7665 19.9335C6.27797 19.9335 5.86704 19.7612 5.5337 19.4167C5.20037 19.0722 5.0337 18.6666 5.0337 18.1999C5.0337 17.7108 5.20037 17.2996 5.5337 16.9663C5.86704 16.633 6.27797 16.4663 6.7665 16.4663C7.23317 16.4663 7.63877 16.633 7.9833 16.9663C8.32784 17.2996 8.5001 17.7108 8.5001 18.1999C8.5001 18.6666 8.32784 19.0722 7.9833 19.4167C7.63877 19.7612 7.23317 19.9335 6.7665 19.9335ZM8.3665 13.1663H2.3337L5.8001 8.5335H8.3665V13.1663Z"
                fill="#0067B2"
              />
            </svg>
          </div>
          <div className="filter-section-btn-text">
            Recipient Information
          </div>
        </button>
      </li>
    </ul>
  </div>
  {innerFilter == 1 ? (
    <div className="filter-section__body-level-2 shipper___info__tab">
      {innerFilter == 1 ? (
        <ul className="filter-section-list">
          {Object.keys(statusFilterInfo).map((key) => (
            <li
              className="filter-section-item"
              onClick={() => clickedItem(key)}
              key={key}
            >
              <button
                className={
                  selectedDiv === key
                    ? "filter-section-btn selected"
                    : "filter-section-btn"
                }
              >
                <Checkbox
                  label={statusFilterInfo[key].display}
                  checked={statusFilterInfo[key].checkedStatus}
                  onChange={statusFilterCheckboxChange}
                  name={key}
                  count={statusFilterInfo[key].count}
                  value={key}
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  ) : innerFilter > 1 ? (
    <>
      <div className="filter-section__body-level-2">
        <ul className="filter-section-list">
          {innerFilterJson.map((item) => (
            <li
              className="filter-section-item"
              onClick={() => clickedItem(item.field)}
            >
              {/* add selected class if its selected */}
              <button
                className={
                  selectedDiv == item.field
                    ? "filter-section-btn selected"
                    : "filter-section-btn"
                }
                onClick={() => shipperInfoChange(item.field)}
              >
                <div className="filter-section-btn-icon"></div>
                <div className="filter-section-btn-text">
                  {item.displayFilterTab}
                </div>
                <div className="filter-section-btn-count"></div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={
          firstlevelClick === true
            ? "filter-section__body-level-3 hideBlock1"
            : "filter-section__body-level-3"
        }
      >
        {(() => {
          const selectedOptionData =
            shipAndRecpFilterInfo[selectedOption];

          if (selectedOptionData) {
            return (
              <ul className="filter-section-list">
                {selectedOptionData.orginalData.map((item) => (
                  <li
                    className="filter-section-item"
                    onClick={() => clickedItem(item.name)}
                  >
                    <button
                      className={
                        selectedDiv_level2 === item.name
                          ? "filter-section-btn selected"
                          : "filter-section-btn"
                      }
                    >
                      <Checkbox
                        label={item.name}
                        checked={
                          shipAndRecpFilterInfo[
                            selectedOption
                          ]?.sectionValue?.includes(
                            item.name
                          ) ?? false
                        }
                        onChange={normalFilterCheckboxChange}
                        name={selectedOption}
                        count={item.count}
                        value={item.name}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            );
          } else {
            return null;
          }
        })()}
      </div>
    </>
  ) : (
    ""
  )}
</div>
<div className="filter-section__footer">
  <div className="filter-section-action">
    <button
      className="btn btn-ship--secondary"
      onClick={closeButton}
    >
      CLOSE
    </button>
    <button
      className="btn btn-ship--primary"
      onClick={() => applyFilters()}
    >
      APPLY
    </button>
  </div>
</div>
</>
 );
};

export default FilterOptions;