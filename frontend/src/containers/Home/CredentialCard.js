import React, { useState } from "react";
import { VaultInputMode } from "../../shared/utility";
import VaultInputModal from "./VaultInputModal/VaultInputModal";

const CredentialCard = ({
  id,
  title,
  description,
  domain,
  username,
  password,
}) => {
  const [showModal, setShowModal] = useState(false);
  const currentCredential = {
    id,
    title,
    description,
    domain,
    username,
    password,
  };
  return (
    <>
      {showModal ? (
        <VaultInputModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedVaultMode={VaultInputMode.UPDATE}
          updateData={currentCredential}
        />
      ) : null}
      <div
        className="flex flex-col p-2 m-3 shadow-sm bg-gray-100"
        onClick={() => setShowModal(true)}
      >
        <p>{title}</p>
        <p>{description}</p>
        <p>{domain}</p>
        <p>{username}</p>
        <p>{password}</p>
      </div>
    </>
  );
};

export default CredentialCard;
