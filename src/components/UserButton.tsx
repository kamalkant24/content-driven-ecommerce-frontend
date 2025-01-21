import { memo } from "react";
const UserButton = memo(
  ({ name, action, type, disabled, styleClass,id,setIcon }:any) => {
    return (
      <button
        id={id}
        disabled={disabled ? true : false}
        type={type ? type : "button"}
        onClick={action}
        className={styleClass?styleClass:'bg-transparent border border-white text-white hover:text-black hover:bg-white hover:border-transparent rounded-full px-8 py-4 text-base'}>
        {setIcon}
        {name}
      </button>
    );
  }
);


export default UserButton;