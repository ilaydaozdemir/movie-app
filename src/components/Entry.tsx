import React, { useRef, useState } from "react";

const Entry: React.FC = () => {
  const users = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  function onClick() {
    setUserName(users.current?.value);
  }
  return (
    <div>
      <header>Welcome {userName ?? "unknown user"}</header>
      <input ref={users} />
      <button onClick={onClick}>Entry</button>
    </div>
  );
};
export default Entry;
