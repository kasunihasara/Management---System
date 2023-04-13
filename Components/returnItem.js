const { ipcRenderer } = require("electron");

export class returnItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync("returnIteams", "a string");
        const na = reply;

        this.render();
        const table = this.shadowRoot.querySelector("#jana");

        for (let i = 0; i < reply.length; i++) {
            let obj = JSON.parse('{"date":"' + reply[i].date + '", "c_id":"' + reply[i].customer_id + '", "p_id": "' + reply[i].p_id + '"}');
            const row = table.insertRow(i + 1);

            row.insertCell(0).innerHTML = reply[i].pname;
            row.insertCell(1).innerHTML = reply[i].name;
            row.insertCell(2).innerHTML = reply[i].date;
            row.insertCell(3).innerHTML = reply[i].manufacture_date;
            row.insertCell(4).innerHTML = reply[i].quantity;
            row.insertCell(5).innerHTML = reply[i].description;
            row.insertCell(6).innerHTML = "<img src='images/icons8-delete-16.png' id='del" + i + "'>";
            row.insertCell(7).innerHTML = `<a onclick='updatereturns(${reply[i].p_id},${reply[i].customer_id},"${reply[i].date}")'><img src='images/icons8-update-48.png' style="width:100%; height:100%;"></a>`;

            const dele = this.shadowRoot.querySelector("#del" + i);
            dele.addEventListener("click", () => {
                const tb = this.shadowRoot.querySelector("#tb");

                ipcRenderer.send("deleteReturn", obj);
                tb.remove();

                this.connectedCallback();
            });
        }
    }

    render() {
        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Iventory/Return Iteams</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Item</th>
                <th>Customer_Name</th>
                <th>Date</th>
                <th>Mfc_Date</th>
                <th>Quantity</th>
                <th>Description</th>
                <th></th>
                
            </tr>

           
        </table>
        <button style="margin-left: 40px;"><</button><button>></button>

        


    </div>
    <br><br>
    </div>
              
    
            `;
    }
}

customElements.define("return-item", returnItem);