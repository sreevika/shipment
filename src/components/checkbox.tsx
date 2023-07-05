import React, { ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  count: number;
  value:string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  name,
  count,
  value
}) => {
  console.log("ddddddddddd" + value);
  return (
    <>
      <div className="filter-section-btn-icon">
        <label className="checkbox">
          <input
            className="checkbox-input"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            name={name}
            value={value}
          />
          <span className="checkbox-indicator">
            <svg
              width="17"
              height="13"
              viewBox="0 0 17 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z"
                fill="#0067B2"
              />
            </svg>
          </span>
        </label>
      </div>
      <div className="filter-section-btn-text">{label}</div>
      <div className="filter-section-btn-count">{count}</div>
    </>
  );
};

export default Checkbox;
