const { ipcRenderer } = require('electron');
export class updatereturns extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        var upreply = ipcRenderer.sendSync('updatereturns', this.getAttribute("p_id"), this.getAttribute("customer_id"), this.getAttribute("date"));
        console.log(upreply);
        var upcus = ipcRenderer.sendSync('selectcustomer', upreply[0].customer_id);
        var upcus1 = ipcRenderer.sendSync('selectcustomer1',upreply[0].p_id);
        console.log(upreply[0].customer_id);
        this.render(upreply,upcus,upcus1);
        const msgg = this.shadowRoot.querySelector('#invalidd');
        const msg = this.shadowRoot.querySelector('#invalid');
        const submit = this.shadowRoot.querySelector('#save');
        submit.addEventListener('click', () => {
          
            const date = this.shadowRoot.querySelector('#date');
            const mfcDate = this.shadowRoot.querySelector('#mfcDate');
            const quantity = this.shadowRoot.querySelector('#quantity');
            const description = this.shadowRoot.querySelector('#description');

           

            if (date.value==null || date.value==""||mfcDate.value==null || mfcDate.value=="" ||quantity.value==null || quantity.value==""||description.value==null || description.value==""){ 
                
               
                msg.innerHTML = "Enties can't be blank";
                msgg.innerHTML = "  ";   
            }

            else{
                let obj = JSON.parse('{"date": "' + date.value + '","mfcDate": "' + mfcDate.value + '", "quantity": "' + quantity.value + '","description": "' + description.value + '"}');
            obj.p_id = upreply[0].p_id;
            obj.customer_id = upreply[0].customer_id;
            console.log(obj);
            ipcRenderer.send("updatereturniteam", obj);
            document.getElementById("main-body").innerHTML = "<return-item></return-item>";

    
            msgg.innerHTML = " successfully added ";
            msg.innerHTML = " ";
            }

        })

    }

    render(upreply,upcus,upcus1) {
        this.shadowRoot.innerHTML = `
        <style> 
            input[type=text] {
              width: 300px;
              height: 5px;
              padding: 12px 20px;
              margin-top: -12px;
              box-sizing: border-box;
              border: none;
              border-bottom: 2px solid rgba(0, 0, 0, 0.39);
              background-color: rgb(255, 255, 255);
              margin-left: 47px;
              
              
            }
            button{
                width: 80px; 
                height:40px;  
                border:none; 
                margin-top: 20px; 
                cursor: pointer;
                padding: 3px; 

            }
            
            </style>
            
    
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Inventory/Update Return Iteam</p>
        <form style="background-color: rgb(255, 255, 255); width: 400px; margin-top: 45px; height: 550px; margin-left: 300px;">
            <img src="images/icons8-fast-moving-consumer-goods-100.png" width="50px" height="50px" style="margin-left: 170px; margin-top: 20px;">
                       
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Date</h5>
            
            <input type="text" id="date" name="product" value="` + upreply[0].date + `"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Mfc_Date</h5>
            
            <input type="text" id="mfcDate" name="quantity" value="` + upreply[0].manufacture_date + `"><br>

            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Quantity</h5>
            
            <input type="text" id="quantity" name="status" value="` + upreply[0].quantity + `"><br>

            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Description</h5>
            
            <input type="text" id="description" name="status" value="` + upreply[0].description + `"><br>
            <p style="color: #ff3860; margin-left:20px" id="invalid"></p>
            <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd"></p>
        </form>
        
        
        <button id="save" style="background-color:rgba(0, 200, 81, 1); margin-left: 490px; margin-bottom:30px;"><b>Save</b></button>
        <button style="background-color:rgba(255, 68, 68, 1);margin-left: 20px;"><b>Cancel</b></button>`;

    }


}

customElements.define('update-returns', updatereturns)