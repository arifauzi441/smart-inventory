(() => {
    const salesDataEvent = document.getElementById(`topSalesEvent`).value
    const data = JSON.parse(salesDataEvent)

    const topProducts = Object.values(data).map(item => {return item.product_name})
    const topSales = Object.values(data).map(item => {return item.amount})

    const ctx2 = document.getElementById('doughnut').getContext('2d');
    const doughnut = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Ramadhan', 'Imlek ', 'Natal', 'Valentine', 'Kemerdekaan ', 'Tahun Baru'],
            datasets: [{
                label: 'Penjualan',
                data: topSales,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const productName = topProducts[index];
                            const salesAmount = topSales[index];
                            return `Produk: ${productName}, Jumlah: ${salesAmount}`;
                        }
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
})();
