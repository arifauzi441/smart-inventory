
    const openModalButtons = document.querySelectorAll('.open-modal');
    
    openModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = document.getElementById('modalForm');
            modal.classList.add('show');
        });
    });

    const closeModalButton = document.getElementById('closeForm');
    closeModalButton.addEventListener('click', function () {
        const modal = document.getElementById('modalForm');
        modal.classList.remove('show');
    });