const { ipcRenderer } = require('electron');
export class updatepayment extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        var upreply = ipcRenderer.sendSync('updatepayment', this.getAttribute("payment_id"));
        
        
        this.render(upreply);
        const msg = this.shadowRoot.querySelector('#invalid');
        const msgg = this.shadowRoot.querySelector('#invalidd');
        const submit = this.shadowRoot.querySelector('#save');
        submit.addEventListener('click', () => {
          
            const invoice = this.shadowRoot.querySelector('#date');
            const amount = this.shadowRoot.querySelector('#mfcDate');
            const cheque = this.shadowRoot.querySelector('#quantity');
            const status = this.shadowRoot.querySelector('#description');

           

            if (invoice.value==null || invoice.value==""||amount.value==null || amount.value=="" ||cheque.value==null || cheque.value==""||status.value==null || status.value==""){ 
                
               
                msg.innerHTML = "Enties can't be blank";
                msgg.innerHTML = "  ";   
                
           
            }

            else{
                let obj = JSON.parse('{"invoice": "' + invoice.value + '","amount": "' + amount.value + '", "cheque": "' + cheque.value + '","status": "' + status.value + '"}');
                obj.payment_id = upreply[0].payment_id;
                
                console.log(obj);
                ipcRenderer.send("updatepayment1", obj);
                document.getElementById("main-body").innerHTML = "<view-payment></view-payment>";

    
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
            
    
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Payment/Update Paayment</p>
        <form style="background-color: rgb(255, 255, 255); width: 400px; margin-top: 45px; height: 550px; margin-left: 300px;">
            <img src="images/icons8-fast-moving-consumer-goods-100.png" width="50px" height="50px" style="margin-left: 170px; margin-top: 20px;">
                       
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Invoice No</h5>
            
            <input type="text" id="date" name="product" value="` + upreply[0].invoice_no + `"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Amount (Rs)</h5>
            
            <input type="text" id="mfcDate" name="quantity" value="` + upreply[0].amout + `"><br>

            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Cheque No</h5>
            
            <input type="text" id="quantity" name="status" value="` + upreply[0].cheque_no + `"><br>

            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Status</h5>
            
            <input type="text" id="description" name="status" value="` + upreply[0].status + `"><br>
            <p style="color: #ff3860; margin-left:20px" id="invalid"></p>
            <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd"></p>
        </form>
        
        
        <button id="save" style="background-color:rgba(0, 200, 81, 1); margin-left: 490px; margin-bottom:30px;"><b>Save</b></button>
        <button style="background-color:rgba(255, 68, 68, 1);margin-left: 20px;"><b>Cancel</b></button>`;

    }


}

customElements.define('update-payment', updatepayment)