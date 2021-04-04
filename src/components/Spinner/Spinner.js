import React, {useEffect} from 'react';
import { Spinner as BSpinner } from 'react-bootstrap';
import styles from './spinnerStyle.module.css';

export default function Spinner() {

    useEffect(()=>{
      document.body.style.overflow = "hidden";

        return ()=>{
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
        className={styles.spinnerContainer}
        >
        <BSpinner 
        className={styles.spinner}
        animation="border" 
        role="status"
        size="lg"
        >
            <span className="sr-only">Loading...</span>
        </BSpinner>
        </div>
    )
}
