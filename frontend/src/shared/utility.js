// update object : immutable
export const updateObject = (oldState, updatedProperties) => {
  return {
    ...oldState,
    ...updatedProperties,
  };
};

//enum: vault input mode
export const VaultInputMode = Object.freeze({
  ADD: "ADD",
  UPDATE: "UPDATE",
});
