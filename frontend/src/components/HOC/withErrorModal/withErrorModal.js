import React from 'react';
import Modal from '../../UI/Modal/Modal';
import { useSelector, useDispatch } from "react-redux";
import { closeErrorModal } from "../../../store/actions/index";

const withErrorModal = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const data = useSelector(state => state.errorModal.data);
        return (
            <>
                <Modal show={data}>
                    <div>{data}</div>
                    <button
                        className="m-1 px-4 py-2 flex bg-offWhite items-center justify-center rounded-sm"
                        onClick={() => dispatch(closeErrorModal())}>Close</button>
                </Modal>
                <WrappedComponent {...props} />
            </>
        );

    }
}

export default withErrorModal;