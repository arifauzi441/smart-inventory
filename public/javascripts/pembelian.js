const produkKotak = document.querySelectorAll('.kotak');
const formAtas = document.querySelector('.form-atas');
const formBawah = document.querySelector('.form-bawah');
const rekomendasi = document.querySelector('.rekemendasi');

// Variabel untuk menyimpan total jumlah barang dan total harga
let totalJumlahBarang = 0;
let totalHarga = 0;

produkKotak.forEach(kotak => {
    kotak.addEventListener('click', () => {
        const bgnInput = document.createElement('div');
        bgnInput.classList.add('bgn-input');

        // Ambil informasi produk dari kotak yang diklik
        const judulProduk = kotak.querySelector('.ket-jdl').textContent;
        const hargaProduk = parseInt(kotak.querySelector('.ket-hrg').textContent.replace('Rp ', '').replace(',', ''));
        
        // Format HTML untuk menampilkan produk baru
        bgnInput.innerHTML = `
            <div class="isi-input-atas">
                <span class="jdl">${judulProduk}</span>
                <span class="jdl-jml">Jumlah :</span>
            </div>
            <div class="isi-input-bawah">
                <span class="hrg">Rp ${hargaProduk}</span>
                <input class="inp-jml" type="number" placeholder="Input Jumlah">
            </div>
        `;
        
        formAtas.appendChild(bgnInput);
        
        formBawah.classList.add('aktif');
        rekomendasi.classList.add('aktif');

        // Ambil elemen input jumlah dan harga
        const inpJml = bgnInput.querySelector('.inp-jml');
        const hrgElement = bgnInput.querySelector('.hrg');
        
        // Ambil elemen .hrg-total dan .jmlh-brg untuk menampilkan total harga dan jumlah barang
        const hrgTotal = formBawah.querySelector('.hrg-total');
        const jmlhBrg = formBawah.querySelector('.jmlh-brg');
        
        // Variabel untuk menyimpan harga total produk sebelumnya
        let previousTotal = 0;
        let previousJumlah = 0;

        // Fungsi untuk menghitung dan update harga total serta jumlah barang
        inpJml.addEventListener('input', () => {
            const jumlah = parseInt(inpJml.value) || 0;
            const harga = hargaProduk;

            // Kurangi harga total produk sebelumnya dari totalHarga
            totalHarga -= previousTotal;

            // Tambahkan harga baru berdasarkan jumlah yang diinputkan
            const currentTotal = jumlah * harga;
            totalHarga += currentTotal;

            // Update harga total sebelumnya
            previousTotal = currentTotal;

            // Update total harga di .hrg-total
            hrgTotal.textContent = `Rp ${totalHarga.toLocaleString()}`;

            // Update jumlah barang yang dibeli
            totalJumlahBarang = totalJumlahBarang - previousJumlah + jumlah;

            // Update jumlah barang di .jmlh-brg
            jmlhBrg.textContent = totalJumlahBarang;
            
            // Simpan jumlah yang dimasukkan untuk produk ini
            previousJumlah = jumlah;
        });
    });
});
