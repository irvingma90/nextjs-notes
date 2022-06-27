import Link from 'next/link'

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark text-white font-weight-bold">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link href="/">
                            <a className="nav-item nav-link" aria-current="page">Home</a>
                        </Link>
                        <Link href="/about">
                            <a className="nav-item nav-link">About</a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navigation;