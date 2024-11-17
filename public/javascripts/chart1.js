const rawData = document.getElementById('topSalesMonth').value;
const data = JSON.parse(rawData);

const topSales = Object.values(data).map(item => item.amount);
const topProducts = Object.values(data).map(item => item.product_name);


const ctx = document.getElementById('barchart').getContext('2d');
const barchart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [{
            label: 'Top Sales per Month',
            data: topSales,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 
                'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
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
                        const monthIndex = context.dataIndex;
                        const productName = topProducts[monthIndex];
                        const salesAmount = topSales[monthIndex];
                        return `Top Product: ${productName} - Sales: ${salesAmount}`;
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
