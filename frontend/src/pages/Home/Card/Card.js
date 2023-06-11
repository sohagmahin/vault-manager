import React, { useEffect, useState } from "react";
import { VaultInputMode } from "../../../shared/utility";
import VaultInputModal from "../VaultInputModal/VaultInputModal";
import { useRemoveVaultMutation } from "../../../feature/vault/vaultApi";

const Card = ({ data, setSuccessToastMsg, setErrToastMsg }) => {
  const [showModal, setShowModal] = useState(false);
  const { _id, title, description, domain, username, password } = data || {};

  const [removeVault, { data: deletedData, isLoading, error }] =
    useRemoveVaultMutation();

  useEffect(() => {
    if (error) {
      setErrToastMsg("Delete failed!");
      setSuccessToastMsg("");
    }
    if (deletedData) {
      setSuccessToastMsg("Delete successed!");
      setErrToastMsg("");
    }
  }, [deletedData, error]);

  const input_field = (labelText, placeholder) => (
    <>
      <label
        htmlFor="helper-text"
        className="block mt-1 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {labelText}
      </label>
      <input
        type="email"
        id="helper-text"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        disabled
      />
    </>
  );

  const customTextArea = (text) => (
    <>
      <label
        htmlFor="desciption"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Description
      </label>
      <textarea
        id="description"
        disabled
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Description"
        value={text}
      />
    </>
  );

  return (
    <>
      {showModal ? (
        <VaultInputModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedVaultMode={VaultInputMode.UPDATE}
          updateData={data}
        />
      ) : null}

      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md md:w-72 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <button
                tabIndex="0"
                className="items-center card-actions btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
              <ul
                tabIndex="0"
                className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-36"
              >
                <li>
                  <span onClick={() => setShowModal(true)}>Edit</span>
                </li>
                <li>
                  <span onClick={() => removeVault(_id)}>Delete</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {customTextArea(description)}
        {input_field("Domain Name", domain)}
        {input_field("Username", username)}
        {input_field("Password", password)}
      </div>
    </>
  );
};

export default Card;
