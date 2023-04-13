const { ipcRenderer } = require("electron");

export class inventoryReport extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {

        
        let reply = ipcRenderer.sendSync('inventoryChart', 2022);
        let reply1 = ipcRenderer.sendSync('inoiceReport', 2022);
        let reply2 = ipcRenderer.sendSync('returnReport', 2022);
       
        console.log(reply1[0].value)
        let total=0;
        for(let i=0;i<reply1.length;i++){
            total+=reply1[i].value;
        }

        let profit=(total*7)/100
        let expencess=total-profit


        this.render(profit,expencess,total);
        const table = this.shadowRoot.querySelector('#tbl');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].pname;
            row.insertCell(1).innerHTML = reply[i].quantity;
            row.insertCell(2).innerHTML = reply1[i].total;
            row.insertCell(3).innerHTML = reply2[i].quantity;
            row.insertCell(4).innerHTML = reply[i].quantity - reply1[i].total - reply2[i].quantity;

        }

        console.log(reply)
    }

    render(profit,expencess,total) {
        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="bootstrap-5.2.0-dist/css/bootstrap.css">
        <link rel="stylesheet" type="" href="bootstrap-5.2.0-dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="" href="Components/invoice.css">
        <div class="container" style="width: 40%; margin-top:0.5%">
        <div class="row">
            
            
                <h4>Monthly Inventory Report</h4>
        

        </div>

       

        <div class="row">
            <table id='tbl'>
                <tr>
                    <th class="c1">Products</th>
                    <th class="c2">In-Stock</th>
                    <th class="c1">Sold Out</th>
                    <th class="c2">Returns</th>
                    <th class="c1">Currents</th>
                    
                </tr>
                
            </table>
        </div>
        <div class="row">
            <h7 style="font-size:15px;">Sales Distribution According to the Products in the Quatar</h7>
            <inventory-chart></inventory-chart>
        </div>
        <br>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3" style="font-size:10px; text-align: left;">
               <p>Monthly Profit</p>
               <p>Monthly Expenses</p>
               <p>Monthly Sells</p>
               <p>Target Sells</p> 
            </div>
            <div class="col-3" style="font-size:10px; text-align: right;">
                <p>`+profit+`</p>
                <p>`+expencess+`</p>
                <p>`+total+`</p>
                <p>2000 000</p>
            </div>
            <div class="col-3"></div>

        </div>
    </div>


    
            `;
    }

}
customElements.define("inventory-report", inventoryReport);