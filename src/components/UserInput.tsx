import { memo } from "react";

const UserInput = ({
  labelname,
  name,
  placeholder,
  labelText,
  refs,
  onChange,
  showValue,
  type,
  autofocus,
  error,
  id,
  disabled,
  totalPercentage,
  important,
  className,
  labelClass,
  multiple,
  maxLength,
  autoComplete,
  style,
  pattern,
  max,
  onKeyDown = () => { }
}:any) => {
  return (
    <>
      <div className="position-relative">
        {labelname && (
          <div>
            <label className={labelClass + " common-head-fw mb-2 py-0 fw-500"}>
              {labelname ? labelname : ""}
              {important && <span className="text-danger"> *</span>}
            </label>{" "}
            <span className="fs-7">{labelText ? `(${labelText})` : ""}</span>
          </div>
        )}
        <div className="d-flex align-items-center bg-input wes-outerShadow">
          <input
            className={className + " common-input "}
            style={style}
            type={type ? type : "text"}
            autoFocus={autofocus ? autofocus : false}
            placeholder={placeholder ? placeholder : name}
            name={name}
            onChange={onChange}
            autoComplete={autoComplete ? "off" : ""}
            ref={refs}
            id={id}
            maxLength={maxLength ? maxLength : "100"}
            value={showValue}
            disabled={disabled ? disabled : false}
            multiple={multiple ? multiple : false}
            onKeyDown={onKeyDown}
            pattern={pattern}
            max={max}
          />
          {totalPercentage && (
            <label className="px-2 text-muted">
              {totalPercentage == "NaN%" || totalPercentage == "Infinity%" ? "0%" : totalPercentage.substring(0, 5)}
            </label>
          )}
        </div>
        {error && <p className="mb-1 text-danger fs-14">{error}</p>}
      </div>
    </> 
  );
};

export default memo(UserInput); 