import React from "react";

const CredentialCard = ({ title, desciption, domain, username, password }) => {
  return (
    <div className="flex flex-col p-2 m-3 shadow-sm bg-gray-100">
      <p>{title}</p>
      <p>{desciption}</p>
      <p>{domain}</p>
      <p>{username}</p>
      <p>{password}</p>
    </div>
  );
};

export default CredentialCard;
