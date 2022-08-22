import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withErrorModal from "../../components/HOC/withErrorModal/withErrorModal";
import CreateButton from "./CreateButton";
import { getAllCredentials } from "../../store/actions/index";
import CredentialCard from "./CredentialCard/CredentialCard";
import { successToast, errorToast } from "../../shared/utility";

function Home() {
  const dispatch = useDispatch();
  const [vaultData, setVaultData] = useState([]);
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");

  const data = useSelector((state) => state.vault.data);

  useEffect(() => {
    dispatch(getAllCredentials());
  }, []);

  useEffect(() => {
    if (!data) return;
    setVaultData(data);
  }, [data]);
  return (
    <>
      <div className="flex justify-center">
        {/* show success toast message -/DELETE/- */}
        {successToastMsg
          ? successToast(successToastMsg, () => setSuccessToastMsg(""))
          : null}

        {/* show error toast message -/DELETE/- */}
        {errToastMsg ? errorToast(errToastMsg, () => setErrToastMsg("")) : null}
      </div>
      <div className="flex gap-3 m-2 flex-wrap flex-col justify-center sm:flex-row">
        {vaultData?.map((credential) => {
          return (
            <CredentialCard
              id={credential._id}
              title={credential.title}
              description={credential.description}
              domain={credential.domain}
              username={credential.username}
              password={credential.password}
              successToastMsg={successToastMsg}
              errToastMsg={errToastMsg}
              setSuccessToastMsg={setSuccessToastMsg}
              setErrToastMsg={setErrToastMsg}
            />
          );
        })}
        <CreateButton />
      </div>
    </>
  );
}

export default withErrorModal(Home);
