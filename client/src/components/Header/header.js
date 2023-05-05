import React from 'react'

function Header() {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    
    return (
        <div>
            <h1>{userDetails.name}</h1>
        </div>
    )
}

export default Header