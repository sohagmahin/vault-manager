import React, { useState } from "react";
import VaultInputModal from "./VaultInputModal/VaultInputModal";
import Modal from "../../components/UI/Modal/Modal";
import { VaultInputMode } from "../../shared/utility";

function CreateCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? (
        <VaultInputModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedVaultMode={VaultInputMode.ADD}
        />
      ) : null}
      <div
        className="flex h-52 w-52 m-2 bg-gray-400"
        onClick={() => setShowModal(true)}
      >
        CreateCard
      </div>
    </>
  );
}

export default CreateCard;
