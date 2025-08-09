import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <h1>setInterval Performance Comparison</h1>
      <p>
        Real-time demonstration of setInterval running on the main thread versus
        in a web worker
      </p>
    </header>
  );
};

export default Header;
