const { ipcRenderer } = require("electron");

export class salesReport extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {

        
        let reply = ipcRenderer.sendSync('inoiceReport', 2022);
        let reValue = ipcRenderer.sendSync('returnValue', 2022);
        let sales = ipcRenderer.sendSync('salesReport', 'a string');
        
        let total=0;
        
        for(let i=0;i<reply.length;i++){
            total +=reply[i].value
        }

        let profit=(total*7)/100

        let LMIncome=sales[2].value
        let differance=profit-(LMIncome*7)/100
        
        

        this.render(profit,total,LMIncome,differance)
        
        
        const table = this.shadowRoot.querySelector('#tbl');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].pname;
            row.insertCell(1).innerHTML = reply[i].value;
            row.insertCell(2).innerHTML = reply[i].value - ((reply[i].value * 7) / 100);
            row.insertCell(3).innerHTML = reValue[i].value;
            row.insertCell(4).innerHTML = (reply[i].value * 7) / 100;

            



        }
        
        
    }

    render(profit,total,LMIncome,differance) {
        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="bootstrap-5.2.0-dist/css/bootstrap.css">
        <link rel="stylesheet" type="" href="bootstrap-5.2.0-dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="" href="Components/invoice.css">
        <div class="container" style="width: 40%; margin-top:0.5%">
        <div class="row">
            
            
                <h4>Monthly  Sales Analysis Report</h4>
        

        </div>

       

        <div class="row">
            <table id="tbl">
                <tr>
                    <th class="c1">Products</th>
                    <th class="c2">Sellings</th>
                    <th class="c1">Buying Cost</th>
                    <th class="c2">Returns</th>
                    <th class="c1">Profit</th>
                
                </tr>
                
                
            </table>
        </div>
        <div class="row">
            <h7 style="font-size:15px;">Sales Distribution According to the Products in the Quatar</h7>
            <sales-chart></sales-chart>
        </div>
        <br>
        <div class="row" id="s1">
            <div class="col-2"></div>
            <div class="col-5" style="font-size:10px; text-align: left;">
               <p>Monthly Income By Selling</p>
               <p>Monthly Profit</p>
               <p>Last Month Income</p>
               <p>Profit Differance</p> 
            </div>
            <div class="col-3" style="font-size:10px; text-align: right;">
                <p>`+total+`</p>
                <p>`+profit+`</p>
                <p>`+LMIncome+`</p>
                <p>`+differance+`</p>
            </div>
            <div class="col-1"></div>

        </div>
    </div>


    
            `;
    }

}
customElements.define("sales-report", salesReport);