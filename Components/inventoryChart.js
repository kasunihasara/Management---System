const { ipcRenderer } = require("electron");
const { Chart } = require('chart.js');

export class inventoryChart extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {
        this.render();
        let reply = ipcRenderer.sendSync('inventoryChart', 2022);
        
        const labels = []
        const d = []
        for (let i = 0; i < reply.length; i++) {
            labels[i] = reply[i].pname
            d[i] = reply[i].quantity
        }
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: d,
            }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 7.8 //this change the font size
                            }
                        }
                    }
                }
            }
        };

        const myChart = new Chart(
            this.shadowRoot.getElementById('myChart'),
            config
        );


    }

    render() {
        this.shadowRoot.innerHTML += `

        <link rel="stylesheet" href="bootstrap-5.2.0-dist/css/bootstrap.css">
        <link rel="stylesheet" type="" href="bootstrap-5.2.0-dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="Components/table.css">           
        <script src="node_modules/chart.js/dist/chart.min.js"></script>

        <div style="width:100%; height:100%">
            <canvas id="myChart"></canvas>
        </div>

        
            `;
    }
}

customElements.define("inventory-chart", inventoryChart);