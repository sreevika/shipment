import React  from "react";


interface AppliedFilterProps {
    selectedFilterListForUI:any;
    clearFilter: (item: any) => void;
    anyFilter:boolean;
    resetAllFilters:() => void;
  }

const AppliedFilter: React.FC<AppliedFilterProps> = ({
    selectedFilterListForUI,
    clearFilter,
    anyFilter,
    resetAllFilters
}) => {
  return (<>
  <ul className="filter-section__applied">
{selectedFilterListForUI.length > 0 &&
  selectedFilterListForUI.map((filterInfo) => (
    <li className="filter-section__applied-list">
      <div className="btn btn-filter-pill">
        <span>{filterInfo.display}</span>
        <button
          className="btn btn-close-pill"
          onClick={() => clearFilter(filterInfo)}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99984 0.166748C2.774 0.166748 0.166504 2.77425 0.166504 6.00008C0.166504 9.22592 2.774 11.8334 5.99984 11.8334C9.22567 11.8334 11.8332 9.22592 11.8332 6.00008C11.8332 2.77425 9.22567 0.166748 5.99984 0.166748ZM8.9165 8.09425L8.094 8.91675L5.99984 6.82258L3.90567 8.91675L3.08317 8.09425L5.17734 6.00008L3.08317 3.90591L3.90567 3.08342L5.99984 5.17758L8.094 3.08342L8.9165 3.90591L6.82234 6.00008L8.9165 8.09425Z"
              fill="#0067B2"
            />
          </svg>
        </button>
      </div>
    </li>
  ))}
{anyFilter == true ? (
  <li className="filter-section__applied-list">
    <button
      className="btn btn-close-reset"
      onClick={resetAllFilters}
    >
      Reset
    </button>
  </li>
) : (
  ""
)}
</ul>
</>
 );
};

export default AppliedFilter;