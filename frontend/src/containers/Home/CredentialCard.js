import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { VaultInputMode } from "../../shared/utility";
import VaultInputModal from "./VaultInputModal/VaultInputModal";
import { removeCredential } from "../../store/actions/index";
import CustomInput from "../../components/UI/Input/CustomInput";

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

  const input_field = (labelText, placeholder) => (
    <>
      <label
        for="helper-text"
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
        for="desciption"
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
      >
        {text}
      </textarea>
    </>
  );

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

      <div className="block p-6 md:w-72 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
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
        {customTextArea(description)}
        {input_field("Domain Name", domain)}
        {input_field("Username", username)}
        {input_field("Password", password)}
      </div>
    </>
  );
};

export default CredentialCard;
