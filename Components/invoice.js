const { ipcRenderer } = require("electron");

export class Invoice extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {

        this.render();
        let reply = ipcRenderer.sendSync('inoiceReport', 2022);
        let reply1 = ipcRenderer.sendSync('inventoryChart', 'a string');
        console.log(reply)
        const table = this.shadowRoot.querySelector('#tbl');

        for (let i = 0; i < reply.length; i++) {
            
            const row = table.insertRow(i + 1);

            try{
                row.insertCell(0).innerHTML = reply[i].pname;
                row.insertCell(1).innerHTML = reply[i].price;
                row.insertCell(2).innerHTML = reply[i].total;
                row.insertCell(3).innerHTML = reply[i].value;
                row.insertCell(4).innerHTML = reply1[i].quantity - reply[i].total;
            }catch(exception){
                
            }
            





        }
    }

    render() {
        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="bootstrap-5.2.0-dist/css/bootstrap.css">
        <link rel="stylesheet" type="" href="bootstrap-5.2.0-dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="" href="Components/invoice.css">
        <div class="container" style="width: 40%;">
        <div class="row">
            <div class="col-2">
                <img src="images/kotmale-kisK26bHwB (1).png" alt="" style="height: 70%; width:160%">
            </div>
            <div class="col-10">
                <h4>NAVOD DISTRIBUTION</h4>
                <h7>"Pradeepa",Parawahera,Kekanadura,Matara</h7>
                <h7>0412222974/0761236567</h7>
            </div>

        </div>

        <div class="row">

            <div class="col-6">
                <h7>Outlet ID:....................</h7>
            </div>
            <div class="col-6">
                <h7>Date:....................</h7>
            </div>
        </div>

        <div class="row">
            <table id='tbl'>
                <tr>
                    <th class="c1">Products</th>
                    <th class="c2">Unit Price</th>
                    <th class="c1">Quantity</th>
                    <th class="c2">Value</th>
                    <th class="c1">Free Qty</th>
                </tr>
                <tr>
                    <td>
                        <p></p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                </tr>

                <tr>
                    <td>
                        <p></p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                </tr>
                
                <tr>
                    <td>
                        <p></p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                </tr>
                <tr>
                    <td>
                        <p></p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                </tr>
                <tr>
                    <td>
                        <p></p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                </tr>
                <tr>
                    <td>
                        <p></p>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                </tr>
                
                
            </table>
        </div>

        <div class="row">
            <div class="col-6">
                <h7>..............................</h7><br>
                <h7>Name</h7>
            </div>
            <div class="col-6">
                <h7>...............................</h7><br>
                <h7>Signature</h7>
            </div>
        </div>
    </div>


    
            `;
    }

}
customElements.define("invoice-report", Invoice);