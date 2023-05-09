import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Spinner() {
    return (
        <div class="fixed-top bg-black d-flex align-items-center justify-content-center" style={{opacity: '0.7', height: '100vh', width: '100vw', zIndex: '10'}}>
            <div class="spinner-border text-secondary" role="status" style={{width: '4rem', height: '4rem', borderWidth: '0.4rem'}}>
            </div>
        </div>
    )
}

export default Spinner;