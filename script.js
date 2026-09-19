// =====================================================
// ZYNK AUTOMAÇÕES
// JAVASCRIPT PRINCIPAL
// =====================================================


document.addEventListener("DOMContentLoaded", () => {


    // =================================================
    // EFEITO DE APARECIMENTO
    // =================================================

    const elements = document.querySelectorAll(
        ".sector-section, .project-card, .contact-item, .history-content, .contact-form-wrapper"
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



    // =================================================
    // HEADER DURANTE O SCROLL
    // =================================================

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



    // =================================================
    // MENU HAMBÚRGUER
    // =================================================

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileNav =
        document.querySelector(".mobile-nav");


    if (menuToggle && mobileNav) {


        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("open");


            menuToggle.classList.toggle(
                "active",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        });


        // Fecha o menu quando clicar em algum link

        const mobileLinks =
            mobileNav.querySelectorAll("a");


        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

    }



    // =================================================
    // SISTEMA DE ABAS DOS SETORES
    // =================================================

    const sectorTabs =
        document.querySelectorAll(".sector-tab");


    const sectorPanels =
        document.querySelectorAll(".sector-panel");


    function changeSector(selectedSector) {


        // ---------------------------------------------
        // ALTERA A ABA ATIVA
        // ---------------------------------------------

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


        // ---------------------------------------------
        // ALTERA O PAINEL E O VÍDEO
        // ---------------------------------------------

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



    // =================================================
    // CLIQUE NAS ABAS
    // =================================================

    sectorTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const selectedSector =
                tab.dataset.sector;


            changeSector(selectedSector);

        });

    });



    // =================================================
    // INICIA O PRIMEIRO VÍDEO
    // =================================================

    const firstVideo =
        document.querySelector(
            ".sector-panel.active .sector-video"
        );


    if (firstVideo) {

        firstVideo.muted = true;

        firstVideo.play().catch(() => {});

    }



    // =================================================
    // PAUSAR VÍDEOS QUANDO SAEM DA TELA
    // =================================================

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



    // =================================================
    // FORMULÁRIO
    // =================================================

    const form =
        document.querySelector("#contactForm");


    const cepInput =
        document.querySelector("#cep");


    const cepStatus =
        document.querySelector("#cepStatus");


    const telefoneInput =
        document.querySelector("#telefone");


    // =================================================
    // MÁSCARA DE TELEFONE
    // =================================================

    if (telefoneInput) {

        telefoneInput.addEventListener(
            "input",
            () => {

                let value =
                    telefoneInput.value
                        .replace(/\D/g, "")
                        .slice(0, 11);


                if (value.length <= 10) {

                    value =
                        value.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    value =
                        value.replace(
                            /(\d{4})(\d)/,
                            "$1-$2"
                        );

                } else {

                    value =
                        value.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    value =
                        value.replace(
                            /(\d{5})(\d)/,
                            "$1-$2"
                        );

                }


                telefoneInput.value = value;

            }
        );

    }



    // =================================================
    // MÁSCARA DE CEP
    // =================================================

    if (cepInput) {

        cepInput.addEventListener(
            "input",
            () => {

                let value =
                    cepInput.value
                        .replace(/\D/g, "")
                        .slice(0, 8);


                if (value.length > 5) {

                    value =
                        value.substring(0, 5)
                        + "-"
                        + value.substring(5);

                }


                cepInput.value = value;


                // Se tiver 8 números, busca automaticamente

                const cleanCep =
                    value.replace(/\D/g, "");


                if (cleanCep.length === 8) {

                    buscarCEP(cleanCep);

                }

            }
        );

    }



    // =================================================
    // BUSCAR CEP
    // =================================================

    async function buscarCEP(cep) {

        if (!cepStatus) return;


        cepStatus.textContent =
            "Consultando CEP...";

        cepStatus.classList.remove("error");


        try {

            const response =
                await fetch(
                    `https://viacep.com.br/ws/${cep}/json/`
                );


            if (!response.ok) {

                throw new Error(
                    "Erro na consulta."
                );

            }


            const data =
                await response.json();


            if (data.erro) {

                limparEndereco();


                cepStatus.textContent =
                    "CEP não encontrado.";

                cepStatus.classList.add(
                    "error"
                );

                return;

            }


            preencherEndereco(data);


            cepStatus.textContent =
                "Endereço preenchido automaticamente.";


        } catch (error) {

            cepStatus.textContent =
                "Não foi possível consultar o CEP.";

            cepStatus.classList.add(
                "error"
            );

        }

    }



    // =================================================
    // PREENCHER ENDEREÇO
    // =================================================

    function preencherEndereco(data) {

        const endereco =
            document.querySelector("#endereco");

        const bairro =
            document.querySelector("#bairro");

        const cidade =
            document.querySelector("#cidade");

        const estado =
            document.querySelector("#estado");


        if (endereco) {

            endereco.value =
                data.logradouro || "";

        }


        if (bairro) {

            bairro.value =
                data.bairro || "";

        }


        if (cidade) {

            cidade.value =
                data.localidade || "";

        }


        if (estado) {

            estado.value =
                data.uf || "";

        }

    }



    // =================================================
    // LIMPAR ENDEREÇO
    // =================================================

    function limparEndereco() {

        const campos = [

            "#endereco",
            "#bairro",
            "#cidade",
            "#estado"

        ];


        campos.forEach((selector) => {

            const field =
                document.querySelector(selector);


            if (field) {

                field.value = "";

            }

        });

    }



    // =================================================
    // ENVIO DO FORMULÁRIO PARA WHATSAPP
    // =================================================

    if (form) {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const nome =
                    document.querySelector("#nome")?.value.trim() || "";


                const empresa =
                    document.querySelector("#empresa")?.value.trim() || "";


                const telefone =
                    document.querySelector("#telefone")?.value.trim() || "";


                const email =
                    document.querySelector("#email")?.value.trim() || "";


                const cep =
                    document.querySelector("#cep")?.value.trim() || "";


                const numero =
                    document.querySelector("#numero")?.value.trim() || "";


                const endereco =
                    document.querySelector("#endereco")?.value.trim() || "";


                const bairro =
                    document.querySelector("#bairro")?.value.trim() || "";


                const cidade =
                    document.querySelector("#cidade")?.value.trim() || "";


                const estado =
                    document.querySelector("#estado")?.value.trim() || "";


                const mensagem =
                    document.querySelector("#mensagem")?.value.trim() || "";



                // -----------------------------------------
                // MONTA A MENSAGEM
                // -----------------------------------------

                let texto =

                    "Olá, Zynk! Gostaria de solicitar informações sobre um projeto.\n\n" +

                    "*DADOS DO CLIENTE*\n" +

                    `Nome: ${nome}\n`;


                if (empresa) {

                    texto +=
                        `Empresa: ${empresa}\n`;

                }


                texto +=

                    `Telefone: ${telefone}\n` +

                    `E-mail: ${email}\n\n` +

                    "*ENDEREÇO*\n" +

                    `CEP: ${cep}\n` +

                    `Endereço: ${endereco}, ${numero}\n` +

                    `Bairro: ${bairro}\n` +

                    `Cidade: ${cidade} - ${estado}\n\n` +

                    "*PROJETO*\n" +

                    `${mensagem}`;



                // -----------------------------------------
                // CODIFICA A MENSAGEM
                // -----------------------------------------

                const encodedMessage =
                    encodeURIComponent(texto);


                // -----------------------------------------
                // WHATSAPP
                // -----------------------------------------

                const whatsappNumber =
                    "5515988156277";


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }

});