// write-down the shared components such as form validatior,utility functions etc.

//update object immutably
export const updateObject = (oldState, updatedProperties) => {
    return {
        ...oldState,
        ...updatedProperties
    };
}
