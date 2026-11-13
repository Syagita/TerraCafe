// ===================================
// 1. MENGAMBIL ELEMEN HTML
// ===================================

const searchInput = document.getElementById("search");

const menuCards = document.querySelectorAll(".menu-card");

const filterButtons = document.querySelectorAll(".filter-btn");

const noResult = document.getElementById("no-result");

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");


// ===================================
// 2. VARIABEL KATEGORI
// ===================================

let activeCategory = "all";


// ===================================
// 3. DATA KERANJANG
// ===================================

let cart = [];


// ===================================
// 4. FUNGSI PENCARIAN DAN FILTER
// ===================================

function filterMenu() {

    const searchValue = searchInput.value.toLowerCase().trim();

    let found = 0;

    menuCards.forEach(function(card) {

        const menuName = card.querySelector("h3").textContent.toLowerCase();

        const category = card.dataset.category;

        const categoryMatch =
            activeCategory === "all" || category === activeCategory;

        const searchMatch = menuName.includes(searchValue);

        if (categoryMatch && searchMatch) {

            card.style.display = "flex";

            found++;

        } else {

            card.style.display = "none";

        }

    });

    // Menyembunyikan kategori yang kosong

    document.querySelectorAll(".menu-section").forEach(function(section) {

        const visibleCards = Array.from(
            section.querySelectorAll(".menu-card")
        ).filter(function(card) {

            return card.style.display !== "none";

        });

        section.style.display =
            visibleCards.length > 0 ? "block" : "none";

    });

    // Pesan jika menu tidak ditemukan

    noResult.style.display =
        found === 0 ? "block" : "none";

}


// ===================================
// 5. EVENT SEARCH
// ===================================

searchInput.addEventListener("input", filterMenu);


// ===================================
// 6. EVENT FILTER KATEGORI
// ===================================

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        activeCategory = button.dataset.filter;

        filterMenu();

    });

});


// ===================================
// 7. MENAMBAHKAN TOMBOL KE SETIAP MENU
// ===================================

menuCards.forEach(function(card) {

    const button = document.createElement("button");

    button.textContent = "Tambah ke Keranjang";

    button.classList.add("add-cart-btn");

    button.addEventListener("click", function() {

        const name = card.querySelector("h3").textContent;

        const priceText = card.querySelector("p").textContent;

        const price = Number(priceText.replace(/[^\d]/g, ""));

        addToCart(name, price);

    });

    card.appendChild(button);

});


// ===================================
// 8. FUNGSI TAMBAH KE KERANJANG
// ===================================

function addToCart(name, price) {

    const existingItem = cart.find(function(item) {

        return item.name === name;

    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }

    renderCart();

}


// ===================================
// 9. MENAMPILKAN KERANJANG
// ===================================

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Keranjang kamu masih kosong.
            </p>
        `;

    }

    let total = 0;

    cart.forEach(function(item, index) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        const itemInfo = document.createElement("div");

        const itemName = document.createElement("h4");

        itemName.textContent = item.name;

        const itemPrice = document.createElement("p");

        itemPrice.textContent =
            "Rp" + subtotal.toLocaleString("id-ID");

        itemInfo.appendChild(itemName);

        itemInfo.appendChild(itemPrice);


        // TOMBOL JUMLAH PESANAN

        const controls = document.createElement("div");

        controls.classList.add("cart-controls");

        const minusButton = document.createElement("button");

        minusButton.textContent = "-";

        minusButton.addEventListener("click", function() {

            changeQuantity(index, -1);

        });


        const quantity = document.createElement("span");

        quantity.textContent = item.quantity;


        const plusButton = document.createElement("button");

        plusButton.textContent = "+";

        plusButton.addEventListener("click", function() {

            changeQuantity(index, 1);

        });


        const removeButton = document.createElement("button");

        removeButton.textContent = "×";

        removeButton.classList.add("remove-btn");

        removeButton.addEventListener("click", function() {

            removeItem(index);

        });


        controls.appendChild(minusButton);

        controls.appendChild(quantity);

        controls.appendChild(plusButton);

        controls.appendChild(removeButton);


        cartItem.appendChild(itemInfo);

        cartItem.appendChild(controls);

        cartItems.appendChild(cartItem);

    });


    // MENAMPILKAN TOTAL HARGA

    cartTotal.textContent =
        "Rp" + total.toLocaleString("id-ID");

}


// ===================================
// 10. MENGUBAH JUMLAH PESANAN
// ===================================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    renderCart();

}


// ===================================
// 11. MENGHAPUS MENU
// ===================================

function removeItem(index) {

    cart.splice(index, 1);

    renderCart();

}


// ===================================
// 12. MENAMPILKAN KERANJANG AWAL
// ===================================

renderCart();

// ===================================
// 13. CHECKOUT VIA WHATSAPP
// ===================================

// NOMOR WHATSAPP ADMIN
const adminPhone = "6285113702125";

// MENGAMBIL TOMBOL CHECKOUT
const checkoutButton = document.getElementById("checkout-btn");

// EVENT KLIK CHECKOUT
checkoutButton.addEventListener("click", function() {

    // MEMERIKSA APAKAH KERANJANG KOSONG
    if (cart.length === 0) {

        alert("Keranjang kamu masih kosong!");

        return;

    }

    // MEMBUAT DAFTAR PESANAN
    let message = "Halo Terra Café! Saya ingin memesan:\n\n";

    let total = 0;

    cart.forEach(function(item, index) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        message +=
            `${index + 1}. ${item.name}\n` +
            `   Jumlah: ${item.quantity}\n` +
            `   Harga: Rp${subtotal.toLocaleString("id-ID")}\n\n`;

    });

    // MENAMBAHKAN TOTAL HARGA
    message +=
        `Total Pesanan: Rp${total.toLocaleString("id-ID")}\n\n`;

    message += "Terima kasih!";

    // MEMBUAT LINK WHATSAPP
    const whatsappURL =
        `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

    // MEMBUKA WHATSAPP
    window.open(whatsappURL, "_blank");

});
