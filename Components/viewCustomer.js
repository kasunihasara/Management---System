const { ipcRenderer } = require('electron');
export class viewCustomer extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync('viewCustomer', 'a string');
        console.log(reply[0].name)
        const na = reply;




        this.render()
        const table = this.shadowRoot.querySelector('#jana');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].name;
            row.insertCell(1).innerHTML = reply[i].phone;
            row.insertCell(2).innerHTML = reply[i].address;
            row.insertCell(3).innerHTML = reply[i].route;
            row.insertCell(4).innerHTML = "<img src='images/icons8-delete-16.png' id='del" + i + "'>";
            row.insertCell(5).innerHTML = `<a onclick='updatecustomer(${reply[i].customer_id})'><img src='images/icons8-update-48.png' style="width:15%; height:15%;"></a>`;

            const dele = this.shadowRoot.querySelector('#del' + i);
            dele.addEventListener('click', () => {
                const tb = this.shadowRoot.querySelector('#tb');


                const response=ipcRenderer.send("deleteCustomer", reply[i].customer_id)
                if(response){
                    tb.remove();
                    console.log("records deleted");
                }else{ 
                    tb.remove();
                    console.log("can't delete Customer");
                    alert("can't delete Customer");
                }
                
                console.log("%%%%%%")
                this.connectedCallback()



            })






        }















    }






    render() {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Customer/View Customer</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Customer</th>
                <th>Contact No</th>
                <th>Address</th>
                <th>Route</th>
                <th></th>
                
            </tr>

           
        </table>
    
        


    </div>
    <br><br>
    </div>
              
    
            `;

    }

}

customElements.define('view-customer', viewCustomer)