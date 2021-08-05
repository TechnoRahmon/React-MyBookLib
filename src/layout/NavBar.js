import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (

        <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">My BookLib</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>

                    <div className="d-flex">
                            
                            <Link className="nav-link active"  to="/">Books</Link>
                           
                            <Link className="nav-link" to="/admin">Admin</Link>
                           
                        </div>
                </div>
                </nav>

        </div>
    )
}
