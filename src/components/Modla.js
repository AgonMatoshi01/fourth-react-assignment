import React from "react";
import './Modal.css'

const Modal = ({modalVisible, photo}) => {
    const {farm, server, id, secret} = photo
    const srcPath = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';

    return (
        <div>
            <div className="modalBackground" onClick={() => {
                modalVisible(false)
            }}>
                <div className="modalContainer" >
                    <div className="photo" >
                        <img src={srcPath}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal;