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
console.log(navbarListItem);
navbarListItem?.addEventListener("mouseover", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 0; height: 100vh;");
})
navbarListItem?.addEventListener("mouseout", () => {
    document.getElementById("shop-the-look-submenu").setAttribute("style","bottom: 100vh; height: 0;");
})
