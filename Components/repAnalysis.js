const { ipcRenderer } = require("electron");

export class repAnalysis extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback(p = 100, m = 'Month', y = 'Year', tp = 0) {

        this.render(p, m, y, tp);


        const click = this.shadowRoot.querySelector('#click');


        click.addEventListener('click', () => {
            const month = this.shadowRoot.querySelector('#month').value;
            const year = this.shadowRoot.querySelector('#year').value;
            let m = 0;
            switch (month) {
                case 'January':
                    m = 1;
                    break;
                case 'February':
                    m = 2;
                    break;
                case 'March':
                    m = 3;
                    break;
                case 'April':
                    m = 4;
                    break;
                case 'May':
                    m = 5;
                    break;
                case 'june':
                    m = 6;
                    break;
                case 'july':
                    m = 7;
                    break;
                case 'August':
                    m = 8;
                    break;
                case 'September':
                    m = 9;
                    break;
                case 'October':
                    m = 10;
                    break;
                case 'November':
                    m = 11;
                    break;
                case 'December':
                    m = 12;
                    break;
                default:
                    break;
            }

            console.log(m, year.value)
            let obj = JSON.parse('{"month":"' + m + '", "year":"' + year + '"}');



            let reply = ipcRenderer.sendSync('repAnalysis', obj);
            console.log(reply[0].total_price)
            let tp = reply[0].total_price
            let pre = Math.round((reply[0].total_price / 2000000) * 100);
            const container = this.shadowRoot.querySelector('.container');

            console.log(p)
            container.remove()
            this.connectedCallback(pre, month, year, tp.toLocaleString('en-US'))



        })



    }

    render(pre, m, y, total_price) {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="bootstrap-5.2.0-dist/css/bootstrap.css">
        <link rel="stylesheet" type="" href="bootstrap-5.2.0-dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="" href="Components/repA.css">
        <link rel="stylesheet" type="" href="Components/repA2.css">
        <div class="container">
        <div class="row">
            <div class="col-4">
                <div class="" style="padding:2%">
                <input list="browsers" name="month" id="month" placeholder=` + m + ` >
                <datalist id="browsers">
                  <option value="January">
                  <option value="February">
                  <option value="March">
                  <option value="April">
                  <option value="May">
                  <option value="june">
                  <option value="july">
                  <option value="August">
                  <option value="September">
                  <option value="October">
                  <option value="November">
                  <option value="December">

                </datalist>
                </div>
            </div>
            <div class="col-6">
                <div class="" style="padding:1%">
                <input list="browsers1" name="year" id="year" style="width:100%" placeholder=` + y + `>
                <datalist id="browsers1">
                <option value="2018">
                <option value="2019">
                <option value="2020">
                <option value="2021">
                <option value="2022">
                </datalist>
                    
                </div>
            </div>
            <div class="col-2">
                <button class="b1" id="click">Click</button>
            </div>
        </div>

        <br>
        <div class="row">
            <div class="col-4">
           
                <rep-progress id="repChart" val="` + pre + `"></rep-progress>
            </div>
            <div class="col-8">
                <div class="row">
                    <br><br>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="b2">
                            <h2 class="bh3">2,000,000</h2><br>
                            <h2 class="bh3">Monthly Target</h2>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="b2" style="background-color:#EDC5F6">
                            <h2 class="bh3">` + total_price + `</h2><br>
                            <h2 class="bh3">Monthly Sales</h2>
                        </div>

                    </div>
                </div>
            </div>
            

        </div>

    </div>


    
            `;
    }

}
customElements.define("rep-analysis", repAnalysis);