import { useEffect } from "react";

export default callback => {
  useEffect(() => {
    const _handler = e => {
      callback(e);
    };

    document.body.addEventListener("keydown", _handler);
    return () => {
      document.body.removeEventListener("keydown", _handler);
    };
  });
};
