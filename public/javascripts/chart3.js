(() => {
    const ctx3 = document.getElementById('myChart').getContext('2d');
    const salesDataEvent = document.getElementById(`topSalesDay`).value
    const data = JSON.parse(salesDataEvent)
    
    const topProducts = Object.values(data).map(item => {return item.product_name})
    const topSales = Object.values(data).map(item => {return item.amount})
    console.log(data)
    console.log(topProducts)
    console.log(topSales)
    
    const data3 = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Indomie',
                data: topSales,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 5,
                hoverRadius: 10,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4 
            }
        ]
    };
    
    const config3 = {
        type: 'line',
        data: data3,
        options: {
            scales: {
                x: {
                    ticks: {
                        color: '#D3D3D3'  
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#D3D3D3'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#FFFFFF'  
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const monthIndex = context.dataIndex;
                            const productName = topProducts[monthIndex];
                            const salesAmount = topSales[monthIndex];
                            return `Top Product: ${productName} - Sales: ${salesAmount}`;
                        }
                    }
                }
            },
            animation: {
                duration: 400, 
                easing: 'linear' 
            },
            hover: {
                mode: 'nearest', 
                intersect: true
            }
        }
    };
    
    const myChart = new Chart(ctx3, config3);
})()
