const produkKotak = document.querySelectorAll('.kotak');
const formAtas = document.querySelector('.form-atas');
const formBawah = document.querySelector('.form-bawah');
const rekomendasi = document.querySelector('.rekemendasi');
const payment = document.querySelector(`.inp-byr`)
const paymentButton = document.querySelector(`.bgn-tombol button`)
const searchInput = document.getElementById(`searchInput`)
// Variabel untuk menyimpan total jumlah barang dan total harga
let totalJumlahBarang = 0;
let totalHarga = 0;

produkKotak.forEach(kotak => {
    kotak.addEventListener('click', () => {
        const bgnInput = document.createElement('div');
        bgnInput.classList.add('bgn-input');
        paymentButton.disabled = false

        // Ambil informasi produk dari kotak yang diklik
        const judulProduk = kotak.querySelector('.ket-jdl').textContent;
        const hargaProduk = parseInt(
            kotak.querySelector('.ket-hrg').textContent
                .replace(/[^\d,]/g, '') // Hapus semua kecuali angka dan koma
                .split(',')[0] // Ambil bagian sebelum koma
                .replace(/\./g, '') // Hapus separator ribuan
        );
        const product_id = kotak.querySelector('.ket-id').value
        const product_stock = kotak.querySelector(`.stock`).value
        // Format HTML untuk menampilkan produk baru
        bgnInput.innerHTML = `
            <button class="hapus-btn">X</button>
            <div class="isi-input-atas">
                <span class="jdl">${judulProduk}</span>
                <span class="jdl-jml">Jumlah :</span>
                <input type="hidden" name="product_id" value="${product_id}">
            </div>
            <div class="isi-input-bawah">
                <span class="hrg">Rp ${hargaProduk}</span>
                <input class="price" type="hidden" name="price" value="${hargaProduk}">
                <input class="inp-jml" type="number" min="1" max="${product_stock}" value="1" name="amount_product" placeholder="Input Jumlah" required>
            </div>
        `;
        formAtas.appendChild(bgnInput);
        formBawah.classList.add('aktif');
        rekomendasi.classList.add('aktif');
        rekomendasi.querySelector(`ul li`).innerHTML = kotak.querySelector(`.rekom-name`).value

        // Ambil elemen input jumlah dan harga
        const inpJml = bgnInput.querySelector('.inp-jml');
        const hrgElement = bgnInput.querySelector('.hrg');
        const priceElement = bgnInput.querySelector('.price');

        // Ambil elemen .hrg-total dan .jmlh-brg untuk menampilkan total harga dan jumlah barang
        const hrgTotal = formBawah.querySelector('.hrg-total');
        const hrgTotalPrice = formBawah.querySelector('.hrg-total-price');
        const jmlhBrg = formBawah.querySelector('.jmlh-brg');

        // Variabel untuk menyimpan harga total produk sebelumnya
        let previousTotal = 0;
        let previousJumlah = 0;

        // Fungsi untuk menghitung dan update harga total serta jumlah barang
        inpJml.addEventListener('input', () => {
            const jumlah = parseInt(inpJml.value) || 0;
            const harga = hargaProduk;
            hrgElement.innerHTML = harga * jumlah
            priceElement.value = hrgElement.innerHTML

            // Kurangi harga total produk sebelumnya dari totalHarga
            totalHarga -= previousTotal;

            // Tambahkan harga baru berdasarkan jumlah yang diinputkan
            const currentTotal = jumlah * harga;
            totalHarga += currentTotal;

            // Update harga total sebelumnya
            previousTotal = currentTotal;

            // Update total harga di .hrg-total
            hrgTotal.textContent = `Rp ${totalHarga.toLocaleString()}`;
            hrgTotalPrice.value = totalHarga
            payment.min = totalHarga

            // Update jumlah barang yang dibeli
            totalJumlahBarang = totalJumlahBarang - previousJumlah + jumlah;

            // Update jumlah barang di .jmlh-brg
            jmlhBrg.textContent = totalJumlahBarang;

            // Simpan jumlah yang dimasukkan untuk produk ini
            previousJumlah = jumlah;
        });

        const event = new Event("input", { bubbles: true });
        inpJml.dispatchEvent(event)

        // Ambil tombol X
        const hapusBtn = bgnInput.querySelector('.hapus-btn');

        // Tambahkan event listener untuk tombol X
        hapusBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Menghindari klik yang tidak diinginkan

            // Ambil elemen input yang ingin dihapus
            const inputElement = bgnInput.querySelector('.inp-jml');
            
            if (inputElement) {
                // Ambil nilai jumlah input sebelum dihapus
                const jumlahInput = parseInt(inputElement.value) || 0;
                
                // Kurangi total harga dan jumlah barang berdasarkan input yang dihapus
                totalHarga -= jumlahInput * hargaProduk;
                hrgTotal.textContent = `Rp ${totalHarga.toLocaleString()}`;
                
                totalJumlahBarang -= jumlahInput;
                jmlhBrg.textContent = totalJumlahBarang;
                
                // Hapus elemen input (input yang terkait)
                bgnInput.remove();
                
                // Periksa jika tidak ada input lagi di form-atas
                if (formAtas.querySelectorAll('.bgn-input').length === 0) {
                    formAtas.classList.remove('aktif'); // Sembunyikan form atas
                    rekomendasi.classList.remove('aktif'); // Sembunyikan rekomendasi
                }
            }
            if(formAtas.innerHTML == ` `){
                paymentButton.disabled = true
            } 
        });
    });
});

const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text"),
    eventSelect = document.querySelector(`.event-select`)

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));       

options.forEach(option =>{
    option.addEventListener("click", ()=>{
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        eventSelect.value = sBtn_text.innerText.toLowerCase()

        optionMenu.classList.remove("active");
    });
});

searchInput.addEventListener(`input`, function(){
    setTimeout(() => {
        document.getElementById(`searchForm`).submit()
    }, 1000)
})

window.onload = function(){
    searchInput.focus()
    const length = searchInput.value.length
    searchInput.setSelectionRange(length, length)
}