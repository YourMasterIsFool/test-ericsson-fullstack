import React from "react";

interface Props {
  show: {
    type: boolean;
    default: false;
  };
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
    const { children, show } = this.props;

    const header = children?.find((child) => child.type == Header);
    const body = children?.find((child) => child.type == Header);

    const footer = children?.find((child) => child.type == Header);

    return (
      <div className="modal-container">
        <div className="modal-wrapper w-full h-full"></div>
      </div>
    );
  }
}

export default Modal;
