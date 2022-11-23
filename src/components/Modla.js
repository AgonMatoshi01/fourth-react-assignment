import React from "react";
import './Modal.css'

const Modal = ({modalVisible,srcPath}) => {
    const handleEsc = (e) => {
        if (e.keyCode === 27) // '27' The key code for the esc keyboard button
        {
            modalVisible(false)
        }
    };
    window.addEventListener('keydown', handleEsc);

    return (
        <div>
            <div className="modalBackground" onClick={() => {
                modalVisible(false)
            }}>
                <div className="modalContainer">
                    <div className="photo">
                        <img
                            src={srcPath} alt=""
                            onClick={
                                () => window.removeEventListener('keydown', handleEsc)
                            }
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Modal;