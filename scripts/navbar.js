window.addEventListener("scroll",() => {
    const navbar = document.getElementById("main-navbar");
    if(navbar && navbar.style.backgroundColor === "#181818") {
        return;
    }
    if(window.scrollY == 0) {
        return navbar.style.backgroundColor = "transparent";
    }
    navbar.style.backgroundColor = "#181818";
})
const navbarListItem = document.getElementById("shop-the-look");
navbarListItem?.addEventListener("mouseover", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 0; height: 100vh;");
})
navbarListItem?.addEventListener("mouseleave", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 100vh; height: 0;");
})

document.getElementById("shop-the-look-submenu").addEventListener("mouseenter", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 0; height: 100vh;");
    document.getElementById("main-navbar").style.backgroundColor = "#181818"
})

const navbarSpecialEdition = document.getElementById("special-editions");
navbarSpecialEdition?.addEventListener("mouseover", () => {
    document.getElementById("special-editions-submenu").setAttribute("style","bottom: 0; height: 100vh;");
})
navbarSpecialEdition?.addEventListener("mouseleave", () => {
    document.getElementById("special-editions-submenu").setAttribute("style","bottom: 100vh; height: 0;");
})

document.getElementById("special-editions-submenu").addEventListener("mouseenter", () => {
    document.getElementById("special-editions-submenu").setAttribute("style","bottom: 0; height: 100vh;");
    document.getElementById("main-navbar").style.backgroundColor = "#181818"
})
