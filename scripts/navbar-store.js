console.log("inside menuu script");

const navbar = document.getElementById("main-navbar");
navbar.style.backgroundColor = "#181818";


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
    shopLookSubmenu.setAttribute("style", "bottom: 0; height: 65vh;");
})
shopLookMainmenu?.addEventListener("mouseleave", () => {
    shopLookSubmenu.setAttribute("style", "bottom: 65vh; height: 0;");
})

shopLookSubmenu?.addEventListener("mouseenter", () => {
    shopLookSubmenu.setAttribute("style", "bottom: 0; height: 65vh;");
    navbar.style.backgroundColor = "#181818";
})

shopLookSubmenu?.addEventListener("mouseleave", () => {
    shopLookSubmenu.setAttribute("style", "bottom: 65vh; height: 0;");
})

console.log(navbarSpecialEdition);

navbarSpecialEdition?.addEventListener("mouseover", () => {
    specialEditionsSubmenu.setAttribute("style", "bottom: 0; height: 65vh;");
})
navbarSpecialEdition?.addEventListener("mouseleave", () => {
    specialEditionsSubmenu.setAttribute("style", "bottom: 65vh; height: 0;");
})

specialEditionsSubmenu?.addEventListener("mouseenter", () => {
    specialEditionsSubmenu.setAttribute("style", "bottom: 0; height: 65vh;");
    navbar.style.backgroundColor = "#181818";
})
specialEditionsSubmenu?.addEventListener("mouseleave", () => {
    specialEditionsSubmenu.setAttribute("style", "bottom: 65vh; height: 0;");
})


navbarCollaborations?.addEventListener("mouseover", () => {
    collaborationsSubmenu.setAttribute("style", "bottom: 0; height: 100vh;");
})
navbarCollaborations?.addEventListener("mouseleave", () => {
    collaborationsSubmenu.setAttribute("style", "bottom: 100vh; height: 0;");
})

collaborationsSubmenu?.addEventListener("mouseenter", () => {
    collaborationsSubmenu.setAttribute("style", "bottom: 0; height: 100vh;");
    navbar.style.backgroundColor = "#181818";
})
collaborationsSubmenu?.addEventListener("mouseleave", () => {
    collaborationsSubmenu.setAttribute("style", "bottom: 100vh; height: 0;");
})


navbarLamboWorld?.addEventListener("mouseover", () => {
    lamboSubmenu.setAttribute("style", "bottom: 0; height: 100vh;");
})
navbarLamboWorld?.addEventListener("mouseleave", () => {
    lamboSubmenu.setAttribute("style", "bottom: 100vh; height: 0;");
})

lamboSubmenu?.addEventListener("mouseenter", () => {
    lamboSubmenu.setAttribute("style", "bottom: 0; height: 100vh;");
    navbar.style.backgroundColor = "#181818";
})
lamboSubmenu?.addEventListener("mouseleave", () => {
    lamboSubmenu.setAttribute("style", "bottom: 100vh; height: 0;");
})

navbarPromo?.addEventListener("mouseover", () => {
    promoSubmenu.setAttribute("style", "bottom: 0; height: 65vh;");
})
navbarPromo?.addEventListener("mouseleave", () => {
    promoSubmenu.setAttribute("style", "bottom: 65vh; height: 0;");
})

promoSubmenu?.addEventListener("mouseenter", () => {
    promoSubmenu.setAttribute("style", "bottom: 0; height: 65vh;");
    navbar.style.backgroundColor = "#181818";
})
promoSubmenu?.addEventListener("mouseleave", () => {
    promoSubmenu.setAttribute("style", "bottom: 65vh; height: 0;");
})


