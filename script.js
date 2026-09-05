// ==========================================
// ZYNK AUTOMAÇÕES
// JavaScript principal
// ==========================================


// ==========================================
// EFEITO DE APARECIMENTO DOS ELEMENTOS
// ==========================================

const elements = document.querySelectorAll(
    '.sector-section, .project-card, .contact-item, .history-content'
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


elements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


// ==========================================
// HEADER DURANTE O SCROLL
// ==========================================

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) return;


    if (window.scrollY > 50) {

        header.style.background =
            "rgba(5,7,11,0.95)";

    } else {

        header.style.background =
            "rgba(5,7,11,0.75)";

    }

});


// ==========================================
// SISTEMA DE ABAS DOS SETORES
// ==========================================

const sectorTabs =
    document.querySelectorAll(".sector-tab");


const sectorPanels =
    document.querySelectorAll(".sector-panel");


function changeSector(selectedSector) {


    // --------------------------------------
    // ALTERA A ABA ATIVA
    // --------------------------------------

    sectorTabs.forEach((tab) => {

        const isActive =
            tab.dataset.sector === selectedSector;


        tab.classList.toggle(
            "active",
            isActive
        );


        tab.setAttribute(
            "aria-selected",
            isActive
        );

    });


    // --------------------------------------
    // ALTERA O PAINEL E O VÍDEO
    // --------------------------------------

    sectorPanels.forEach((panel) => {

        const isActive =
            panel.dataset.panel === selectedSector;


        panel.classList.toggle(
            "active",
            isActive
        );


        const video =
            panel.querySelector(".sector-video");


        if (!video) return;


        if (isActive) {

            video.currentTime = 0;

            video.muted = true;

            video.play().catch(() => {});

        } else {

            video.pause();

        }

    });

}


// ==========================================
// CLIQUE NAS ABAS
// ==========================================

sectorTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        const selectedSector =
            tab.dataset.sector;


        changeSector(selectedSector);

    });

});


// ==========================================
// INICIA O PRIMEIRO VÍDEO
// ==========================================

const firstVideo =
    document.querySelector(
        '.sector-panel.active .sector-video'
    );


if (firstVideo) {

    firstVideo.muted = true;

    firstVideo.play().catch(() => {});

}


// ==========================================
// PAUSAR VÍDEOS QUANDO A SEÇÃO SAI DA TELA
// ==========================================

const sectorSection =
    document.querySelector(".sector-section");


if (sectorSection) {


    const sectorObserver =
        new IntersectionObserver(
            (entries) => {


                entries.forEach((entry) => {


                    const videos =
                        document.querySelectorAll(
                            ".sector-video"
                        );


                    videos.forEach((video) => {


                        const panel =
                            video.closest(
                                ".sector-panel"
                            );


                        if (entry.isIntersecting) {


                            if (
                                panel &&
                                panel.classList.contains("active")
                            ) {

                                video.muted = true;

                                video.play().catch(
                                    () => {}
                                );

                            }


                        } else {

                            video.pause();

                        }

                    });

                });

            },
            {
                threshold: 0.15
            }
        );


    sectorObserver.observe(
        sectorSection
    );

}