import React, { useState, useEffect } from "react";
import VaultInputModal from "./VaultInputModal/VaultInputModal";
import FAB from "../../components/UI/Button/FAB";
import { VaultInputMode } from "../../shared/utility";
import { PLUS_ICON } from "../../constants/images";

function CreateButton() {
  const [showModal, setShowModal] = useState(false);

  //get window dimention
  const [windowDimention, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimention]);

  let normalAddButton = (
    <div
      className="flex justify-center p-6 md:w-72 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      onClick={() => setShowModal(true)}
    >
      {PLUS_ICON}
    </div>
  );

  let FABButton = (
    <div className="fixed bottom-4 right-6">
      <FAB onClick={() => setShowModal(true)} />
    </div>
  );
  return (
    <div>
      {showModal ? (
        <VaultInputModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedVaultMode={VaultInputMode.ADD}
        />
      ) : null}

      {windowDimention.winWidth > 640 ? normalAddButton : FABButton}
    </div>
  );
}

export default CreateButton;
