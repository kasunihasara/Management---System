const { ipcRenderer } = require('electron');
export class AvailableItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync('availableItem', 'a string');

        const na = reply;




        this.render()
        const table = this.shadowRoot.querySelector('#jana');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].pname;
            row.insertCell(1).innerHTML = reply[i].price;
            row.insertCell(2).innerHTML = reply[i].category;
            row.insertCell(3).innerHTML = reply[i].quantity;


        }















    }






    render() {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Inventory/Available Items</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Item</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                
            </tr>

           
        </table>

        


    </div>
    <br><br>
    </div>
              
    
            `;

    }

}

customElements.define('available-item', AvailableItem)