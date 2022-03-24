import React, { useState } from "react";
import CreateModal from "../../components/Home/CreateModal/CreateModal";
import Modal from "../../components/UI/Modal/Modal";

function CreateCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal ? (
        <CreateModal showModal={showModal} setShowModal={setShowModal} />
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
