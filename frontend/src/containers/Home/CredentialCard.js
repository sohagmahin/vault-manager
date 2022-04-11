import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { VaultInputMode } from "../../shared/utility";
import VaultInputModal from "./VaultInputModal/VaultInputModal";
import { removeCredential } from "../../store/actions/index";

const CredentialCard = ({
  id,
  title,
  description,
  domain,
  username,
  password,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const currentCredential = {
    id,
    title,
    description,
    domain,
    username,
    password,
  };

  const removeItem = () => {
    dispatch(removeCredential(id));
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
      <div className="card w-96 bg-primary text-primary-content">
        <div className="navbar bg-primary">
          <div className="flex-1">
            <h2 className="card-title ml-3">{title}</h2>
          </div>
          <div className="flex-none">
            <div class="dropdown dropdown-end">
              <button
                tabIndex="0"
                className="card-actions btn btn-square btn-ghost items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
              <ul
                tabindex="0"
                class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-36"
              >
                <li>
                  <a onClick={() => setShowModal(true)}>Edit</a>
                </li>
                <li>
                  <a onClick={removeItem}>Delete</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p>{description}</p>
          <p>{domain}</p>
          <p>{username}</p>
          <p>{password}</p>
        </div>
      </div>
    </>
  );
};

export default CredentialCard;

{
  /* <>
{showModal ? (
  <VaultInputModal
    showModal={showModal}
    setShowModal={setShowModal}
    selectedVaultMode={VaultInputMode.UPDATE}
    updateData={currentCredential}
  />
) : null}
<div
  classNameName="flex flex-col p-2 m-3 shadow-sm bg-gray-100"
  onClick={() => setShowModal(true)}
>
  <p>{title}</p>
  <p>{description}</p>
  <p>{domain}</p>
  <p>{username}</p>
  <p>{password}</p>
</div>
</> */
}
