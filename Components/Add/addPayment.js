const { ipcRenderer } = require('electron');
export class addPayment extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        this.render()
        const msg = this.shadowRoot.querySelector('#invalid');
        const msgg = this.shadowRoot.querySelector('#invalidd');
        const submit = this.shadowRoot.querySelector('#save');
        submit.addEventListener('click', () => {
            const Ino = this.shadowRoot.querySelector('#Ino');
            const amount = this.shadowRoot.querySelector('#amount');
            const chequeNo = this.shadowRoot.querySelector('#CNo');
            const status = this.shadowRoot.querySelector('#status');
            const customer = this.shadowRoot.querySelector('#customer');

       

            if (Ino.value==null || Ino.value==""||amount.value==null || amount.value=="" ||chequeNo.value==null || chequeNo.value==""||status.value==null || status.value=="" || customer.value==null || customer.value==""){ 
                
                msg.innerHTML = "Enties can't be blank";
                msgg.innerHTML = "  ";
                
           
            }

            else{
                let obj = JSON.parse('{"Ino":"' + Ino.value + '", "amount":"' + amount.value + '", "chequeNo": "' + chequeNo.value + '", "status": "' + status.value + '", "customer": "' + customer.value + '"}');
                console.log(obj);
                ipcRenderer.send("addPayment", obj)
    
                msgg.innerHTML = " successfully added ";
                msg.innerHTML = " ";
            }

        })

    }

    render() {
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
            
    
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Add Payment</p>
        <form style="background-color: rgb(255, 255, 255); width: 400px; margin-top: 45px; height: 600px; margin-left: 300px;">
            <img src="images/icons8-fast-moving-consumer-goods-100.png" width="50px" height="50px" style="margin-left: 170px; margin-top: 20px;">
            
            
           
            <h5 for="price" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Invoic No</h5>
            
            <input type="text" id="Ino" name="Ino"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Amount(RS)</h5>
            
            <input type="text" id="amount" name="amount"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Cheque No</h5>
            
            <input type="text" id="CNo" name="CNo"><br>

            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Status</h5>
            
            <input type="text" id="status" name="status"><br>

            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Customer</h5>
            
            <input type="text" id="customer" name="customer"><br>
            <p style="color: #ff3860; margin-left:20px" id="invalid"></p>
            <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd"></p>
        </form>
        
        <button id="save" style="background-color:rgba(0, 200, 81, 1); margin-left: 490px; margin-bottom:30px;"><b>Save</b></button>
        <button style="background-color:rgba(255, 68, 68, 1);margin-left: 20px;"><b>Cancel</b></button>`;

    }


}

customElements.define('add-payment', addPayment)