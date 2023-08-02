import React from "react";

interface SearchBarProps {
  searchType: string;
  dropDown: boolean;
  selectSearchType: () => void;
  onchangeSearchType: (searchType: string) => void;
  searchValue: string;
  searchValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchData: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSearchValue: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchType,
  dropDown,
  selectSearchType,
  onchangeSearchType,
  searchValue,
  searchValueChange,
  searchData,
  clearSearchValue,
}) => {
  return (
    <>
      <div className="header-navigation__search-bar">
        <div className="header-navigation__search-select">
          <button
            className="header-navigation__search-select-input"
            onClick={selectSearchType}
          >
            {searchType}
            <svg
              width="8"
              height="4"
              viewBox="0 0 8 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0L3.75 3.75L7.5 0H0Z" fill="#737274" />
            </svg>
          </button>

          <div
            className={
              dropDown
                ? "search-select-dropdown active"
                : "search-select-dropdown"
            }
          >
            <ul className="search-select-dp-wrapper">
              <li
                className="search-select-dp-item"
                onClick={() => onchangeSearchType("Store ID")}
              >
                <a>Store ID</a>
              </li>
              <li
                className="search-select-dp-item"
                onClick={() => onchangeSearchType("Tracking number")}
              >
                <a>Tracking number</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-navigation__search-input-box">
          <div className="header-navigation__search-wrapper">
            <div className="search__input-box-prefix">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                  fill="black"
                  fillOpacity="0.54"
                />
              </svg>
            </div>

            <input
              type="text"
              className="search__input-box"
              placeholder="search..."
              value={searchValue}
              onChange={searchValueChange}
              onKeyDown={searchData}
            />
            <button
              className="search__input-box-suffix"
              onClick={clearSearchValue}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#0067B2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
