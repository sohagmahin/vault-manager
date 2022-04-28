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
        className="flex justify-center p-6 md:w-72 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={() => setShowModal(true)}
      >
        {PLUS_ICON}
      </div>
    </div>
  );
}

export default CreateCard;
