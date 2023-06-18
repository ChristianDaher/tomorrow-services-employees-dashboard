class CommonHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header class="header" id="header">
        <nav class="nav flex-center" id="nav">
            <span class="header-left flex-center">
                <img src="images/logo.svg" alt="logo" class="logo" id="logo">
                <h1 class="font-1">TOMORROW SERVICES</h1>
            </span>
            <span class="header-right flex-center">
                <a href="home.html" class="home" id="home"><img src="images/home.svg" alt="home"
                        class="hover-filter-white-to-blue main-home"></a>
                <div class="wrapper"> <a href="profile.html" id="profile"><img src="images/profile.svg" alt="profile"
                            class="hover-filter-white-to-blue main-profile"></a>
                    <div class="dropdown-menu">
                        <button class="check-in">Check-in</button>
                        <a href="index.html" id="logOut" onclick="logOut()">Log out</a>
                    </div>
                </div>
            </span>
        </nav>
    </header>
        `
    }
}
customElements.define('common-header', CommonHeader)

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.assign("http://localhost:5500/employees-dashboard/employees-dashboard/index.html");
}
