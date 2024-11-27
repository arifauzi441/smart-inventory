const openModalButtons = document.querySelectorAll('.open-modal');
const searchInput = document.getElementById(`searchInput`)

openModalButtons.forEach((button,index) => {
    button.addEventListener('click', function () {
        const modal = document.querySelectorAll('#modalForm')[index];
        document.querySelectorAll(`#modalForm`).forEach(modal => {
            modal.classList.remove(`show`)
        })
        modal.classList.add('show');
    });
    const closeModalButton = document.querySelectorAll('#closeForm')[index];
    closeModalButton.addEventListener('click', function () {
        const modal = document.querySelectorAll('#modalForm')[index];
        modal.classList.remove('show');
    });
});

searchInput.addEventListener(`input`, function () {
    setTimeout(() => {
        document.getElementById(`searchForm`).submit()
    },1000)
})

window.onload = function(){
    searchInput.focus()
    const length = searchInput.value.length;
    searchInput.setSelectionRange(length, length)
}