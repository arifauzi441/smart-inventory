const bestSellerDatas = document.getElementById(`bestSellerDatas`).value
const bestSeller = JSON.parse(bestSellerDatas)

const topProductsName = bestSeller.map(data => {
    return data.product_name
});
const quantitySold = bestSeller.map(data => {
    return data.sold
});

const data4 = {
    labels: topProductsName,
    datasets: [{
        label: 'Penjualan Produk',
        data: quantitySold,
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
        borderWidth: 2
    }]
};

function adjustRadiusBasedOnData(ctx) {
    const v = ctx.parsed.y;
    return v < 50 ? 5
        : v < 70 ? 9
        : v < 90 ? 12
        : 15;
}

const config = {
    type: 'radar',
    data: data4,
    options: {
        plugins: {
        legend: {
            labels: {
            color: '#FFFFFF'
            }
        },
        tooltip: {
        enabled: true
        },
    },
        elements: {
        point: {
            radius: adjustRadiusBasedOnData,
            hoverRadius: 15,
        }
    },
    scales: {
        r: {
            beginAtZero: true,
            max: quantitySold[0],
            angleLines: {
            color: 'grey'
        },
            grid: {
            color: 'grey'
        },
        ticks: {
            color: '#FFFFFF',
            backdropColor: 'rgba(0, 0, 0, 0)'
        },
        pointLabels: {
            color: '#FFFFFF'
        }
        }
    }
    }
};

const ctx4 = document.getElementById('radar').getContext('2d');
new Chart(ctx4, config);
