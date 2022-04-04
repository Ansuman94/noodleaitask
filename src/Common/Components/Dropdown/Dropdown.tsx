import React from "react";
import "./Dropdown.css";
import * as Types from "./Type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Dropdown = (props: Types.IDropdownProps) => {
  const [showBody, handleShowBody] = React.useState<boolean>(false);
  const getOptions = () => {
    const options = props.options.map((item) => {
      let optionClassName = "each-option";
      if (item.id === props.selectedOption.id) {
        optionClassName += " selected-option";
      }
      if (item.isDisabled) {
        optionClassName += " disabled-option";
      }
      return (
        <div
          key={item.id}
          className={optionClassName}
          onClick={() => {
            props.onSelect({ ...item });
            handleShowBody(false);
          }}
        >
          {item.value}
        </div>
      );
    });
    return <div className="options-wrap">{options}</div>;
  };
  return (
    <div className="dropdown-container">
      <div className="dropdown-label">{props.label}</div>
      <div
        className="dropdown-header"
        onClick={() => handleShowBody(!showBody)}
      >
        {props.selectedOption.value}
        {showBody ? (
          <FontAwesomeIcon className="dropdown-header-icon" icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon
            className="dropdown-header-icon"
            icon={faAngleDown}
          />
        )}
      </div>
      <div className={showBody ? "dropdown-body" : "dropdown-body hide-body"}>
        {getOptions()}
      </div>
    </div>
  );
};

export default Dropdown;
