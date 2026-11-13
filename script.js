// MENGAMBIL ELEMEN SEARCH
const searchInput = document.getElementById("search");

// MENGAMBIL SEMUA KARTU MENU
const menuCards = document.querySelectorAll(".menu-card");

// MENGAMBIL SEMUA TOMBOL FILTER
const filterButtons = document.querySelectorAll(".filter-btn");

// MENGAMBIL PESAN MENU TIDAK DITEMUKAN
const noResult = document.getElementById("no-result");

// KATEGORI AKTIF
let activeCategory = "all";

// FUNGSI FILTER MENU
function filterMenu() {

    const searchValue = searchInput.value.toLowerCase().trim();

    let found = 0;

    // MEMERIKSA SETIAP KARTU MENU
    menuCards.forEach(function(card) {

        const menuName = card.querySelector("h3").textContent.toLowerCase();

        const category = card.dataset.category;

        // MEMERIKSA KATEGORI
        const categoryMatch =
            activeCategory === "all" || category === activeCategory;

        // MEMERIKSA PENCARIAN
        const searchMatch = menuName.includes(searchValue);

        // MENAMPILKAN MENU YANG SESUAI
        if (categoryMatch && searchMatch) {

            card.style.display = "flex";
            found++;

        } else {

            card.style.display = "none";

        }

    });

    // MENYEMBUNYIKAN BAGIAN KATEGORI YANG KOSONG
    document.querySelectorAll(".menu-section").forEach(function(section) {

        const visibleCards = section.querySelectorAll(
            '.menu-card[style*="display: flex"]'
        );

        section.style.display = visibleCards.length > 0 ? "block" : "none";

    });

    // MENAMPILKAN PESAN JIKA MENU TIDAK DITEMUKAN
    noResult.style.display = found === 0 ? "block" : "none";

}

// EVENT PENCARIAN
searchInput.addEventListener("input", filterMenu);

// EVENT TOMBOL FILTER
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // MENGHAPUS STATUS ACTIVE
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // MEMBERIKAN STATUS ACTIVE
        button.classList.add("active");

        // MENGUBAH KATEGORI AKTIF
        activeCategory = button.dataset.filter;

        // MENJALANKAN FILTER
        filterMenu();

    });

});
