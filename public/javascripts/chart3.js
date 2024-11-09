const ctx3 = document.getElementById('myChart').getContext('2d');

const data3 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
        {
            label: 'Indomie',
            data: [65, 59, 200, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: 'rgba(255, 99, 132, 1)',
            pointRadius: 5,
            hoverRadius: 10,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.4 
        },
        {
            label: 'Sedap',
            data: [-40, -30, 40, 60, 75, 70, 90],
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: 'rgba(54, 162, 235, 1)',
            pointRadius: 5,
            hoverRadius: 10,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.5)',
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
