const { ipcRenderer } = require('electron');
export class viewpayment extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync('viewpayment', 'a string');
        
        console.log(reply[0].name)
        const na = reply;




        this.render()
        const table = this.shadowRoot.querySelector('#jana');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].invoice_no;
            row.insertCell(1).innerHTML = reply[i].amout;
            row.insertCell(2).innerHTML = reply[i].cheque_no;
            row.insertCell(3).innerHTML = reply[i].status;
            row.insertCell(4).innerHTML = reply[i].name;
            row.insertCell(5).innerHTML = "<img src='images/icons8-delete-16.png' id='del" + i + "'>";
            row.insertCell(6).innerHTML = `<a onclick='updatepayment(${reply[i].payment_id})'><img src='images/icons8-update-48.png' style="width:17%; height:17%;"></a>`;


            const dele = this.shadowRoot.querySelector('#del' + i);
            dele.addEventListener('click', () => {
                const tb = this.shadowRoot.querySelector('#tb');


                const response=ipcRenderer.send("deletepayment", reply[i].payment_id)
                console.log(response)
                
                    tb.remove();
                    console.log("records deleted");
                
                
                
                this.connectedCallback()




            })






        }















    }






    render() {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Payment/Veiw Payment</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Invoice No</th>
                <th>Amount(Rs)</th>
                <th>Cheque No</th>
                <th>Status</th>
                <th>Customer</th>
                <th></th>
                <th></th>
                
            </tr>

           
        </table>
      

        


    </div>
    <br><br>
    </div>
              
    
            `;

    }

}

customElements.define('view-payment', viewpayment)