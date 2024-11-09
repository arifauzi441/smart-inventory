const ctx = document.getElementById('barchart').getContext('2d');
const barchart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        datasets: [{
            label: 'Penjualan',
            data: [12, 19, 3, 5, 2, 3, 7, 8, 4, 9, 6, 10], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',  // January
                'rgba(54, 162, 235, 0.2)',  // February
                'rgba(255, 206, 86, 0.2)',  // March
                'rgba(75, 192, 192, 0.2)',  // April
                'rgba(153, 102, 255, 0.2)', // May
                'rgba(255, 159, 64, 0.2)',  // June
                'rgba(255, 99, 132, 0.2)',  // July
                'rgba(54, 162, 235, 0.2)',  // August
                'rgba(255, 206, 86, 0.2)',  // September
                'rgba(75, 192, 192, 0.2)',  // October
                'rgba(153, 102, 255, 0.2)', // November
                'rgba(255, 159, 64, 0.2)'   // December
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',   // January
                'rgba(54, 162, 235, 1)',   // February
                'rgba(255, 206, 86, 1)',   // March
                'rgba(75, 192, 192, 1)',   // April
                'rgba(153, 102, 255, 1)',  // May
                'rgba(255, 159, 64, 1)',   // June
                'rgba(255, 99, 132, 1)',   // July
                'rgba(54, 162, 235, 1)',   // August
                'rgba(255, 206, 86, 1)',   // September
                'rgba(75, 192, 192, 1)',   // October
                'rgba(153, 102, 255, 1)',  // November
                'rgba(255, 159, 64, 1)'    // December
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF'  
                }
            }
        },

        scales: {
            x: {
                ticks: {
                    color: '#D3D3D3'  
                }
            },
            y: {
                ticks: {
                    color: '#D3D3D3' 
                },
                beginAtZero: true
            }
        }
    }
});
