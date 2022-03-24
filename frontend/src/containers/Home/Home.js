// this is home page

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withErrorModal from "../../components/HOC/withErrorModal/withErrorModal";
import CreateCard from "./CreateCard";
import { getAllCredentials } from "../../store/actions/index";
import CredentialCard from "./CredentialCard";

function Home() {
  const dispatch = useDispatch();
  const [vaultData, setVaultData] = useState([]);
  const data = useSelector((state) => state.vault.data);
  useEffect(() => {
    dispatch(getAllCredentials());
  }, []);
  useEffect(() => {
    if (!data) return;
    console.log("====vault data====");
    console.log(data);
    setVaultData(data);
  }, [data]);
  return (
    <div className="flex flex-row">
      {vaultData?.map((credential) => {
        return (
          <CredentialCard
            title={credential.title}
            desciption={credential.description}
            domain={credential.domain}
            username={credential.username}
            password={credential.password}
          />
        );
      })}
      <CreateCard />
    </div>
  );
}

export default withErrorModal(Home);
