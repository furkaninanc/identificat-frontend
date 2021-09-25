import React, { useRef, useState } from 'react';

import cs from 'classnames';

import styles from './DropZone.module.css';

import DropZoneImage from '../../images/DropZone.png';

interface IDropZone {
    onSelect: (file: File) => void;
}

const DropZone: React.FC<IDropZone> = ({ onSelect }) => {
    const [over, setOver] = useState<boolean>(false);
    const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    return (
        <div className={cs(styles.container, over && styles.active)}>
            <input
                accept="image/*"
                onChange={() => {
                    if (fileRef?.current?.files && fileRef.current.files[0])
                        onSelect(fileRef.current.files[0]);
                }}
                className="hidden"
                ref={fileRef}
                type="file"
            />
            <div
                onClickCapture={() => {
                    fileRef?.current?.click();
                }}
                onDropCapture={(event) => {
                    event.preventDefault();
                    setOver(false);

                    if (event.dataTransfer.files[0]) onSelect(event.dataTransfer.files[0]);
                }}
                onDragEnterCapture={() => setOver(true)}
                onDragLeaveCapture={() => setOver(false)}
                onDragOver={(event) => {
                    event.preventDefault();
                }}
                className={styles.dropOverlay}
            />
            <div className={styles.background}>
                <div>
                    <img alt="Drop here" src={DropZoneImage} />
                </div>
                <div className={styles.dropText}>Upload your image</div>
            </div>
        </div>
    );
};

export default DropZone;
