import React, { useState } from "react";
import CreateButton from "./CreateButton";
import Card from "./Card/Card";
import { successToast, errorToast } from "../../shared/utility";
import { useGetAllVaultQuery } from "../../feature/vault/vaultApi";

function Home() {
  const [successToastMsg, setSuccessToastMsg] = useState("");
  const [errToastMsg, setErrToastMsg] = useState("");

  const { data, isLoading, isError, error } = useGetAllVaultQuery() || {};
  const { data: vaults, message } = data || {};

  if (isLoading)
    return <div className="flex items-center justify-center">Loading....</div>;

  if (isError) {
    return <div>{error.message}</div>;
  }

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
      <div className="flex flex-col flex-wrap justify-center gap-3 m-2 sm:flex-row">
        {vaults &&
          vaults?.map((vault) => {
            return (
              <Card
                data={vault}
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

export default Home;
