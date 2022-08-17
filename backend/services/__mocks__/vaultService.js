const Vault = require("../../model/vaultModel");

const mockedData = [
  {
    _id: {
      $oid: "62fbc4527efeb465d3a2d97e",
    },
    title: "test account",
    description: "My primary test accounts credential",
    domain: "account.test.com",
    username: "U2FsdGVkX18ZyZKivlWEFtoRU4Q92uXqSu6plr84K10=",
    password: "U2FsdGVkX19Fq2ze3IkMff6nR/rCyAN0KWhAmhxxrd8=",
    user: {
      $oid: "62fbc4487efeb465d3a2d97b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "62fbc4847efeb465d3a2d984",
    },
    title: "twitter account",
    description: "My primary twitter accounts credential",
    domain: "account.twitter.com",
    username:
      "U2FsdGVkX1+vkA9bJ+HTu9OOfKrSJ9AuZ7yXiFRsP160U/vox1kfNmnsBahA0lDu",
    password: "U2FsdGVkX19rZ7hEPMRzcPfPyLv8ELKoR1WYmsuc5xI=",
    user: {
      $oid: "62fbc4487efeb465d3a2d97b",
    },
    __v: 0,
  },
];

const getAllVaultsData = async (userId) => {
  return mockedData;
};

const getSingleVault = async (id) => {
  const data = mockedData.find((vault) => vault._id.$oid == id);
  return data;
};

const saveVault = async (vault) => {
  const newVault = new Vault({ ...vault });
  mockedData.push(newVault);
  return newVault;
};

const updateSingleVault = async (id, data) => {
  const vault = mockedData.find((vault) => vault._id.$oid == id);
  const updatedVault = { ...vault, ...data };

  //find index
  const index = mockedData.indexOf(vault);
  if (index > -1) {
    mockedData.splice(index, 1);
    mockedData.push(updatedVault);
    return updatedVault;
  }
};

const deleteSingleVault = async (id) => {
  const vault = mockedData.find((vault) => vault._id.$oid == id);
  const index = mockedData.indexOf(vault);

  if (index > -1) {
    mockedData.splice(index, 1);
  }
  return vault;
};

module.exports = {
  getAllVaultsData,
  getSingleVault,
  saveVault,
  updateSingleVault,
  deleteSingleVault,
};
