import * as React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import './loading.css';

export default function Loading({isLoading, text}) {
    return (
        <LoadingOverlay
            className="loading-progress"
            active={isLoading}
            spinner
            text={text}
        />
    );
}
