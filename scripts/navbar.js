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

//main-nav elements
const shopLookMainmenu = document.getElementById("shop-the-look");
const navbarSpecialEdition = document.getElementById("special-editions");
const navbarCollaborations = document.getElementById("collaborations");
const navbarLamboWorld = document.getElementById("lambo-world");
const navbarPromo = document.getElementById("promo");

//submenu-nav items
const shopLookSubmenu = document.getElementById("shop-the-look-submenu");
const specialEditionsSubmenu = document.getElementById("special-editions-submenu");
const collaborationsSubmenu = document.getElementById("collaborations-submenu");
const lamboSubmenu = document.getElementById("lambo-world-submenu");
const promoSubmenu = document.getElementById("promo-submenu");

shopLookMainmenu?.addEventListener("mouseover", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 0; height: 65vh;");
})
shopLookMainmenu?.addEventListener("mouseleave", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 65vh; height: 0;");
})

shopLookSubmenu?.addEventListener("mouseenter", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 0; height: 65vh;");
    document.getElementById("main-navbar").style.backgroundColor = "#181818";
})

shopLookSubmenu?.addEventListener("mouseleave", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 65vh; height: 0;");
})


navbarSpecialEdition?.addEventListener("mouseover", () => {
    document.getElementById("special-editions-submenu").setAttribute("style","bottom: 0; height: 65vh;");
})
navbarSpecialEdition?.addEventListener("mouseleave", () => {
    document.getElementById("special-editions-submenu").setAttribute("style","bottom: 65vh; height: 0;");
})

specialEditionsSubmenu.addEventListener("mouseenter", () => {
    document.getElementById("special-editions-submenu").setAttribute("style","bottom: 0; height: 65vh;");
    document.getElementById("main-navbar").style.backgroundColor = "#181818";
})
specialEditionsSubmenu.addEventListener("mouseleave", () => {
    document.getElementById("special-editions-submenu").setAttribute("style","bottom: 65vh; height: 0;");
})


navbarCollaborations?.addEventListener("mouseover", () => {
    document.getElementById("collaborations-submenu").setAttribute("style","bottom: 0; height: 100vh;");
})
navbarCollaborations?.addEventListener("mouseleave", () => {
    document.getElementById("collaborations-submenu").setAttribute("style","bottom: 100vh; height: 0;");
})

collaborationsSubmenu.addEventListener("mouseenter", () => {
    document.getElementById("collaborations-submenu").setAttribute("style","bottom: 0; height: 100vh;");
    document.getElementById("main-navbar").style.backgroundColor = "#181818";
})
collaborationsSubmenu.addEventListener("mouseleave", () => {
    document.getElementById("collaborations-submenu").setAttribute("style","bottom: 100vh; height: 0;");
})


navbarLamboWorld?.addEventListener("mouseover", () => {
    document.getElementById("lambo-world-submenu").setAttribute("style","bottom: 0; height: 100vh;");
})
navbarLamboWorld?.addEventListener("mouseleave", () => {
    document.getElementById("lambo-world-submenu").setAttribute("style","bottom: 100vh; height: 0;");
})

lamboSubmenu.addEventListener("mouseenter", () => {
    document.getElementById("lambo-world-submenu").setAttribute("style","bottom: 0; height: 100vh;");
    document.getElementById("main-navbar").style.backgroundColor = "#181818";
})
lamboSubmenu.addEventListener("mouseleave", () => {
    document.getElementById("lambo-world-submenu").setAttribute("style","bottom: 100vh; height: 0;");
})

navbarPromo?.addEventListener("mouseover", () => {
    document.getElementById("promo-submenu").setAttribute("style","bottom: 0; height: 65vh;");
})
navbarPromo?.addEventListener("mouseleave", () => {
    document.getElementById("promo-submenu").setAttribute("style","bottom: 65vh; height: 0;");
})

promoSubmenu.addEventListener("mouseenter", () => {
    document.getElementById("promo-submenu").setAttribute("style","bottom: 0; height: 65vh;");
    document.getElementById("main-navbar").style.backgroundColor = "#181818";
})
promoSubmenu.addEventListener("mouseleave", () => {
    document.getElementById("promo-submenu").setAttribute("style","bottom: 65vh; height: 0;");
})
