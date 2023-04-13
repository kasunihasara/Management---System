const { ipcRenderer } = require("electron");
const { Chart } = require('chart.js');

export class doughnut extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {
        this.render();

        const labels = [];
        const year = this.getAttribute('val')[1] + this.getAttribute('val')[2] + this.getAttribute('val')[3] + this.getAttribute('val')[4];
        if (this.getAttribute('val')[7] == ']') {
            var month = this.getAttribute('val')[6]
        } else {
            month = this.getAttribute('val')[6] + this.getAttribute('val')[7]

        }



        let obj = JSON.parse('{"month":"' + month + '", "year":"' + year + '"}');
        let reply = ipcRenderer.sendSync('productAnalysis', obj);

        let d = []
        if (reply.length == 0) { d = [10, 10, 10] } else {
            for (let i = 0; i < reply.length; i++) {
                d[i] = reply[i].total
                labels[i] = reply[i].category

            }

        }

        const data = {
            labels: labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: [
                    '#ED8699',
                    '#EDE986',
                    '#E586ED',
                    '#8886ED',

                ],
                borderColor: 'white',

                data: d,

            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {}
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

        <div style="width:80%; height:80%">
            <canvas id="myChart"></canvas>
        </div>

        
    
            `;
    }
}

customElements.define("donut-chart", doughnut);