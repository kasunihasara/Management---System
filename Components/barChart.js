const { ipcRenderer } = require("electron");
const { Chart } = require('chart.js');

export class barChart extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {
        this.render();
        if (this.getAttribute('val')[2] == ']') {
            var month = this.getAttribute('val')[1]
        } else {
            var month = this.getAttribute('val')[1] + this.getAttribute('val')[2]

        }

        console.log(month)

        let m = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let reply = ipcRenderer.sendSync('bar', 2022);
        let num = []
        let j = parseInt(month)
        console.log(num)
        console.log(reply)

        for (let i = 0; i < reply.length; i++) {

            if ((parseInt(month)) - 2 == reply[i].month) {
                j -= 2
                num[j] = reply[i].total
            } else if ((parseInt(month)) - 1 == reply[i].month) {
                j--
                num[j] = reply[i].total
            } else if ((parseInt(month)) == reply[i].month) {
                num[j] = reply[i].total
            } else if ((parseInt(month)) + 1 == reply[i].month) {
                j++
                num[j] = reply[i].total
            } else if ((parseInt(month)) + 2 == reply[i].month) {
                j += 2
                num[j] = reply[i].total
            }
            j = parseInt(month);
        }

        console.log(num)
        const labels = [
            m[parseInt(month) - 2],
            m[parseInt(month) - 1],
            m[parseInt(month)],
            m[parseInt(month) + 1],
            m[parseInt(month) + 2],

        ];


        const data = {
            labels: labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [num[parseInt(month) - 2], num[parseInt(month) - 1], num[parseInt(month)], num[parseInt(month) + 1], num[parseInt(month) + 2]],
            }]
        };

        const config = {
            type: 'bar',
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

        <div style="width:100%; height:500%">
            <canvas id="myChart"></canvas>
        </div>

        <button class="btn btn-primary"></button>
    
            `;
    }
}

customElements.define("bar-chart", barChart);