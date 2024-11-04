// Ambil elemen yang dibutuhkan
const modalForm = document.getElementById('modalForm');
const openIcons = document.querySelectorAll('.plus-icon');
const closeFormButton = document.getElementById('closeForm');

// Fungsi untuk menampilkan modal
function openModal() {
    modalForm.style.display = 'block';
}

// Fungsi untuk menutup modal
function closeModal() {
    modalForm.style.display = 'none';
}

// Tambahkan event listener pada setiap ikon plus-circle
openIcons.forEach(icon => {
    icon.addEventListener('click', () => {openModal(icon.id)});
});

// Tambahkan event listener pada tombol close untuk menutup modal
closeFormButton.addEventListener('click', closeModal);

function openModal(id) {
    modalForm.querySelector(`input[type="hidden"]`).value = id
    modalForm.classList.add('show');
}

function closeModal() {
    modalForm.classList.remove('show');
}
