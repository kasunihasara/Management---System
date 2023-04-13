const { ipcRenderer } = require('electron');
export class InventoryManagement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync('im', 'a string');
        console.log(reply[0].name)
        const na = reply;




        this.render()
        const table = this.shadowRoot.querySelector('#jana');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].pname;
            row.insertCell(1).innerHTML = reply[i].price;
            row.insertCell(2).innerHTML = reply[i].category;
            row.insertCell(3).innerHTML = reply[i].quantity;
            row.insertCell(4).innerHTML = "<img src='images/icons8-delete-16.png' id='del" + i + "'>";

            const dele = this.shadowRoot.querySelector('#del' + i);
            dele.addEventListener('click', () => {
                const tb = this.shadowRoot.querySelector('#tb');
                let obj = JSON.parse('{"p_id": ' + reply[i].p_id + ',"s_id":' + reply[i].s_id + '}');
                console.log(obj)
                ipcRenderer.send("imdelete", obj)
                tb.remove()

                this.connectedCallback()




            })






        }
}






    render() {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Inventory/Inventary Management</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Item</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th></th>
                
                
            </tr>

           
        </table>       


    </div>
    <br><br>
    </div>
              
    
            `;

    }

}

customElements.define('inventory-management', InventoryManagement)