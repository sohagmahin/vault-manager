import React, { useState } from "react";
import VaultInputModal from "./VaultInputModal/VaultInputModal";
import Modal from "../../components/UI/Modal/Modal";
import { VaultInputMode } from "../../shared/utility";
import { PLUS_ICON } from "../../constants/images";

function CreateCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal ? (
        <VaultInputModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedVaultMode={VaultInputMode.ADD}
        />
      ) : null}
      <div
        className="flex h-52 w-52 m-2 p-16 bg-gray-400"
        onClick={() => setShowModal(true)}
      >
        {PLUS_ICON}
      </div>
    </div>
  );
}

export default CreateCard;
