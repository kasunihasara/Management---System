const { ipcRenderer } = require('electron');
export class viewProduct extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        let reply = ipcRenderer.sendSync('viewProduct', 'a string');

        const na = reply;

        this.render()
        const table = this.shadowRoot.querySelector('#jana');

        for (let i = 0; i < reply.length; i++) {
            const row = table.insertRow(i + 1);

            row.insertCell(0).innerHTML = reply[i].pname;
            row.insertCell(1).innerHTML = reply[i].price;
            row.insertCell(2).innerHTML = reply[i].category;
            row.insertCell(3).innerHTML = "<img src='images/icons8-delete-16.png' id='del" + i + "'>";
            row.insertCell(4).innerHTML = `<a onclick='updateproduct(${reply[i].p_id})'><img src='images/icons8-update-48.png' style="width:12%; height:12%;"></a>`;

            const dele = this.shadowRoot.querySelector('#del' + i);
            dele.addEventListener('click', () => {
                const tb = this.shadowRoot.querySelector('#tb');

                const response= ipcRenderer.sendSync("deleteProduct", reply[i].p_id)
                console.log("records delete status",response);
                if(response){
                    tb.remove();
                    console.log("records deleted");
                }else{ 
                    tb.remove();
                    console.log("can't delete product");
                    alert("can't delete product");
                }

                this.connectedCallback()

            })


        }

}

    render() {

        this.shadowRoot.innerHTML += `
        <link rel="stylesheet" href="Components/table.css">           
    
           
        
     <div id="tb">
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Product/View Product</p>
        <br>  

        <div class="tbl" id="tb">
       

            
            <table id="jana">
            <tr>
                
                <th>Name</th>
                <th style="padding-right:5px">Price</th>
                <th>Cateogory</th>
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

customElements.define('view-product', viewProduct)