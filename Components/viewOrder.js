const { ipcRenderer } = require('electron');
export class viewOrder extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync('viewOrder', 'a string');
        
        const na = reply;




        this.render()
        const table = this.shadowRoot.querySelector('#jana');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].date;
            row.insertCell(1).innerHTML = reply[i].o_id;
            row.insertCell(2).innerHTML = reply[i].shop_id;
            row.insertCell(3).innerHTML = reply[i].product;
            row.insertCell(4).innerHTML = reply[i].quantity;
            row.insertCell(5).innerHTML = reply[i].status;
            row.insertCell(6).innerHTML = "<img src='images/icons8-delete-16.png' id='del" + i + "'>";
            row.insertCell(7).innerHTML = `<a onclick='updateorder(${reply[i].o_id})'><img src='images/icons8-update-48.png' style="width:25%; height:25%;"></a>`;

            const dele = this.shadowRoot.querySelector('#del' + i);
            dele.addEventListener('click', () => {
                const tb = this.shadowRoot.querySelector('#tb');


                const response=ipcRenderer.send("deleteOrder", reply[i].o_id)
                if(response){
                    tb.remove();
                    console.log("records deleted");
                }else{ 
                    tb.remove();
                    console.log("can't delete order");
                    alert("can't delete order");
                }
                
                
                this.connectedCallback()




            })






        }















    }






    render() {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Employee/Add Sales Rep</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Date</th>
                <th>Order Id</th>
                <th>Shop Id</th>
                <th>product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th></th>
                
            </tr>

           
        </table>
        

        


    </div>
    <br><br>
    </div>
              
    
            `;

    }

}

customElements.define('view-order', viewOrder)