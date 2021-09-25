import React, { useState } from 'react';
import styles from './App.module.css';

import Logo from '../images/Logo.png';

import DropZone from '../components/DropZone';

interface IUploadFile {
    (file: File): void;
}

interface IBreed {
    name: string;
    match: number;
}

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [breed, setBreed] = useState<IBreed>();

    const uploadFile: IUploadFile = async (file) => {
        setLoading(true);

        const data = new FormData();
        data.append('image', file);

        const result = await fetch('https://identificat-backend.herokuapp.com/upload', {
            method: 'POST',
            body: data,
        })
            .then()
            .then((res) => res.json());

        if (!result.error) {
            setBreed(result.payload);
        } else {
            setBreed(undefined);
        }

        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img alt="identifiCAT" src={Logo} />
            </div>
            <div className={styles.dropZone}>
                <DropZone onSelect={uploadFile} />
            </div>
            <div className={styles.bottomText}>
                <div className={styles.headerText}>
                    <b>
                        {loading && <>Uploading your image...</>}
                        {!loading &&
                            (!breed ? (
                                <>Would you like to know what breed your cat is?</>
                            ) : (
                                <>
                                    Your cat is a <i className={styles.breedText}>{breed.name}!</i>
                                </>
                            ))}
                    </b>
                </div>
                <div className={styles.subText}>
                    {loading && <>It&apos;ll take a couple of seconds.</>}
                    {!loading &&
                        (!breed ? (
                            <>Just drop your cat&apos;s image, and we&apos;ll tell you!</>
                        ) : (
                            <>
                                and we&apos;re <b>{Math.ceil(breed.match * 100)}%</b> sure
                            </>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default App;
