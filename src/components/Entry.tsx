import React, { useState } from "react";

const Entry: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [users, setUsers] = useState<boolean>(false);

  const onChange = (event: any) => {
    setUsers(false);
    setUserName(event.target.value);
  };

  const onClick = () => {
    setUsers(true);
  };
  return (
    <div>
      <header>Welcome {users ? userName : "unknown user"}</header>
      <input onChange={onChange} value={userName} />
      <button onClick={onClick}>Entry</button>
    </div>
  );
};
export default Entry;
