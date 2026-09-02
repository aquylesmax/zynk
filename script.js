// ==========================================
// ZYNK AUTOMAÇÕES
// JavaScript principal
// ==========================================


// Efeito de aparecimento dos elementos
// quando entram na tela

const elements = document.querySelectorAll(
    '.service, .solution, .project-card, .contact-item'
);


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


// Configuração inicial

elements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


// ==========================================
// EFEITO NO HEADER DURANTE O SCROLL
// ==========================================

const header = document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(5,7,11,0.95)";

    } else {

        header.style.background =
            "rgba(5,7,11,0.75)";

    }

});