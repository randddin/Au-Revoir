document.addEventListener("DOMContentLoaded", function () {
  // Seleksi elemen HTML dengan class "filter-products"
  const productsContainer = document.querySelector(".filter-products");

  // Fungsi untuk membuat HTML untuk satu produk
  function createProduct(product) {
    const productHTML = `
      <div class="filter-product ${product.categories.join(" ")}">
        <img src="${product.imageSrc}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price}</div>
        <div class="stars">
          ${"<i class='fas fa-star'></i>".repeat(Math.floor(product.stars))}
          ${
            product.stars % 1 !== 0
              ? "<i class='fas fa-star-half-alt'></i>"
              : ""
          }
        </div>
      </div>
    `;
    return productHTML;
  }

  // Fungsi untuk menampilkan produk berdasarkan kategori yang dipilih
  function displayProducts(category, searchFilter) {
    productsContainer.innerHTML = ""; // Kosongkan container produk

    // Fetch data produk 
    fetch("https://be-jayapura-8-aurevoir.up.railway.app/products")
      .then((response) => response.json())
      .then((data) => {
        const productsData = data.productsData;

        // Loop melalui data produk
        productsData.forEach((product) => {
          // Ambil nama produk untuk pencarian
          const productName = product.name.toLowerCase();
          const categoryMatch =
            category === "all" || product.categories.includes(category);
          const searchMatch = productName.includes(searchFilter);

          // Tampilkan produk jika sesuai dengan kategori dan pencarian
          if (categoryMatch && searchMatch) {
            const productHTML = createProduct(product);
            productsContainer.innerHTML += productHTML;
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Seleksi semua tombol filter dengan class "filter-btn"
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Tambahkan event listener untuk setiap tombol filter
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterId = button.id; // Dapatkan ID tombol yang diklik
      const searchFilter = searchInput.value.trim().toLowerCase(); // Ambil kata kunci pencarian

      // Hapus kelas 'active-btn' dari semua tombol filter
      resetActiveBtn();

      // Tambahkan kelas 'active-btn' ke tombol yang diklik
      button.classList.add("active-btn");

      // Tampilkan produk berdasarkan kategori dan pencarian yang dipilih
      displayProducts(filterId, searchFilter);
    });
  });

  // Tampilkan semua produk saat halaman pertama kali dimuat
  displayProducts("all", "");

  // Mendapatkan elemen input pencarian
  const searchInput = document.getElementById("find");

  // Menambahkan event listener untuk input pencarian saat pengguna mengetik
  searchInput.addEventListener("input", () => {
    const filterId = document.querySelector(".active-btn")?.id || "all"; // Dapatkan kategori filter aktif atau "all" jika tidak ada yang aktif
    const searchFilter = searchInput.value.trim().toLowerCase(); // Ambil kata kunci pencarian

    // Tampilkan produk berdasarkan kategori dan pencarian yang dipilih
    displayProducts(filterId, searchFilter);
  });

  // Fungsi untuk mereset status aktif pada semua tombol filter
  function resetActiveBtn() {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active-btn");
    });
  }
});
