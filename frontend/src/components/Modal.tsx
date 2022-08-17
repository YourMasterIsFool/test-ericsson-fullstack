import React from "react";
import { Icon } from "@iconify/react";
interface Props {
  show: {
    type: boolean;
    default: false;
  };
  onCloseHandler: any;
}
function Header() {
  return null;
}

function Body() {
  return null;
}

function Footer() {
  return null;
}

class Modal extends React.Component<Props> {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  render() {
    const { children, show, onCloseHandler } = this.props;

    if (Array.isArray(children)) {
      const header = children?.find((child) => child.type == Header);
      const body = children?.find((child) => child.type == Body);
      const footer = children?.find((child) => child.type == Footer);

      console.log("header", header);
      return (
        <div className={show ? "modal-container " : "hidden"}>
          <div className="modal-wrapper">
            {header ? (
              <div className="modal-header text-base md:text-xl font-semibold justify-between flex items-center">
                <h1>{header.props.children}</h1>

                {onCloseHandler != null ? (
                  <Icon
                    onClick={onCloseHandler}
                    className="text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-300"
                    icon="ant-design:close-circle-outlined"
                  />
                ) : null}
              </div>
            ) : null}
            {body ? (
              <div className="modal-body font-semibold  ">
                {body.props.children}
              </div>
            ) : null}
            {footer ? (
              <div className="modal-footer w-full font-semibold ">
                {footer.props.children}
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div className="modal-container">
        <div className="modal-wrapper">{children}</div>
      </div>
    );
  }
}

export default Modal;
