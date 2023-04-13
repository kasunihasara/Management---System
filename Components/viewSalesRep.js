const { ipcRenderer } = require('electron');
export class viewSalesRep extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync('viewSalesRep', 'a string');
        console.log(reply[0].name)
        const na = reply;




        this.render()
        const table = this.shadowRoot.querySelector('#jana');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);


            row.insertCell(0).innerHTML = reply[i].rep_id;
            row.insertCell(1).innerHTML = reply[i].name;
            row.insertCell(2).innerHTML = reply[i].phone;
            row.insertCell(3).innerHTML = reply[i].address;
            row.insertCell(4).innerHTML = "<img src='images/icons8-delete-16.png' id='del" + i + "'>";
            row.insertCell(5).innerHTML = `<a onclick='updaterep(${reply[i].rep_id})'><img src='images/icons8-update-48.png' style="width:17%; height:17%;"></a>`;


            const dele = this.shadowRoot.querySelector('#del' + i);
            dele.addEventListener('click', () => {
                const tb = this.shadowRoot.querySelector('#tb');


                const response=ipcRenderer.send("deleteSalesRep", reply[i].rep_id)
                console.log("records delete status",response);
                if(response){
                    tb.remove();
                    console.log("records deleted");
                }else{
                    tb.remove();
                    console.log("can't delete SalesRep");
                    alert("can't delete SalesRep");
                }
              
                this.connectedCallback()




            })






        }















    }






    render() {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Sales Rep/View Sales Rep</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Rep Id</th>
                <th>Sales Rep</th>
                <th>Contact No</th>
                <th>Address</th>
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

customElements.define('view-sales-rep', viewSalesRep)