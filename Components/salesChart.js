const { ipcRenderer } = require("electron");
const { Chart } = require('chart.js');

export class salesChart extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {
        this.render();
        let reply = ipcRenderer.sendSync('salesReport', 'a string');
        console.log(reply)


        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        let m = reply[0].month - 1;
        const d = []
        for (let i = 0; i < reply.length; i++) {
            d[m] = reply[i].value
            m++
        }




        const data = {
            labels: labels,
            datasets: [{
                data: d,
                borderColor: "red",
                fill: false
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                legend: { display: false }
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

        <div style="width:100%; height:80%">
            <canvas id="myChart"></canvas>
        </div>

        
            `;
    }
}

customElements.define("sales-chart", salesChart);