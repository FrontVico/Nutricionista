// Array de produtos
const produtos = [
    {
        nome: "Camiseta Street-Joker",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta1.jpeg",
        imgCostas: "./assets/Costas/Camiseta1C.jpeg",
        link: "./mostruario/mostruario.html" // Adicione o link de destino aqui
    },
    {
        nome: "Camiseta Smile-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta2.jpeg",
        imgCostas: "./assets/Costas/Camiseta2C.jpeg",
        link: "./mostruario/mostruario.html" // Adicione o link de destino aqui
    },
    {
        nome: "Camiseta Prospery-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta3.jpeg",
        imgCostas: "./assets/Costas/Camiseta3C.jpeg",
        link: "./mostruario/mostruario.html" // Adicione o link de destino aqui
    },
    {
        nome: "Camiseta Street-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta4.jpeg",
        imgCostas: "./assets/Costas/Camiseta4C.jpeg",
        link: "./mostruario/mostruario.html" // Adicione o link de destino aqui
    },
    {
        nome: "Camiseta Street-Angel",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta5.jpeg",
        imgCostas: "./assets/Costas/Camiseta5C.jpeg",
        link: "./mostruario/mostruario.html" // Adicione o link de destino aqui
    },
    {
        nome: "Camiseta Street-Drill",
        preco: "R$ 79,99",
        imgFrente: "./assets/Roupas/Camiseta6.jpeg",
        imgCostas: "./assets/Costas/Camiseta6C.jpeg",
        link: "" // Adicione o link de destino aqui
    }
];

// Função para criar o HTML de um produto
function criarProdutoHTML(produto) {
    return `
        <div class="flex gap-2">
            <a href="${produto.link}" class="relative w-52 h-52 md:w-80 md:h-80 rounded-2xl bg-cover hover:scale-110 duration-300 mt-9 md:ml-9 ml-4 overflow-hidden carousel-container">
                <img class="carousel-image absolute inset-0 w-full h-full object-cover" src="${produto.imgFrente}" alt="${produto.nome}">
                <img class="carousel-image absolute inset-0 w-full h-full object-cover hidden" src="${produto.imgCostas}" alt="${produto.nome} (Costa)">
            </a>
            <div class="ml-3">
                <p class="font-bold md:text-3xl text-xl mt-9">${produto.nome}</p>
                <div class="flex items-center gap-2 justify-between">
                    <p class="font-bold text-lg mt-3">${produto.preco}</p>
                    <button class="bg-gray-950 text-white px-5 rounded-lg add-to-btn mt-3"
                    data-name="${produto.nome}"
                    data-imgFrente="${produto.imgFrente}"
                    data-price="${produto.preco.replace('R$ ', '')}">
                        <i class="bi bi-cart-plus text-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Função para renderizar os produtos
function renderizarProdutos() {
    const container = document.querySelector('#menu');
    container.innerHTML = ''; // Limpa o conteúdo atual do container

    produtos.forEach(produto => {
        container.innerHTML += criarProdutoHTML(produto);
    });

    iniciarCarrossel();
}

// Função para iniciar o carrossel
function iniciarCarrossel() {
    const carrosséis = document.querySelectorAll('.carousel-container');

    carrosséis.forEach(carrossel => {
        const imagens = carrossel.querySelectorAll('.carousel-image');
        let index = 0;

        setInterval(() => {
            imagens.forEach((img, i) => {
                img.classList.remove('hidden');
                if (i !== index) {
                    img.style.opacity = 0;
                } else {
                    img.style.opacity = 1;
                }
            });
            index = (index + 1) % imagens.length;
        }, 3000); // Tempo do carrossel (3 segundos)
    });
}

// Chama a função para renderizar os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', renderizarProdutos);

document.getElementById('menu').addEventListener('click', function(event) {
    const parentButton = event.target.closest(".add-to-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const imgFrente = parentButton.getAttribute("data-imgFrente");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price, imgFrente);
    }
});

function addToCart(name, price, imgFrente) {
    // Recupera o carrinho do localStorage ou inicializa um novo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adiciona o novo item ao carrinho
    cart.push({ name, price, imgFrente });

    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Exibe uma mensagem
    Swal.fire("Produto adicionado ao carrinho!");
}
