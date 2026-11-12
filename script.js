// MENGAMBIL ELEMEN SEARCH
const searchInput = document.getElementById("search");

// MENGAMBIL SEMUA KARTU MENU
const menuCards = document.querySelectorAll(".menu-card");

// MENGAMBIL PESAN MENU TIDAK DITEMUKAN
const noResult = document.getElementById("no-result");

// MENJALANKAN FUNGSI KETIKA PENGGUNA MENGETIK
searchInput.addEventListener("input", function () {

    // MENGAMBIL KATA PENCARIAN
    const searchValue = searchInput.value.toLowerCase().trim();

    // MENGHITUNG MENU YANG DITEMUKAN
    let found = 0;

    // MEMERIKSA SETIAP KARTU MENU
    menuCards.forEach(function (card) {

        // MENGAMBIL NAMA MENU
        const menuName = card.querySelector("h3").textContent.toLowerCase();

        // MEMERIKSA KECOCOKAN NAMA MENU
        if (menuName.includes(searchValue)) {

            // MENAMPILKAN MENU YANG COCOK
            card.style.display = "flex";

            found++;

        } else {

            // MENYEMBUNYIKAN MENU YANG TIDAK COCOK
            card.style.display = "none";

        }

    });

    // MENAMPILKAN PESAN JIKA MENU TIDAK DITEMUKAN
    noResult.style.display = found === 0 ? "block" : "none";

});
