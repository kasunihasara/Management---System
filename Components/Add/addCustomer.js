const { ipcRenderer } = require('electron');
export class addCustomer extends HTMLElement {
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
            const fn = this.shadowRoot.querySelector('#fname');
            const ln = this.shadowRoot.querySelector('#lname');
            const cn = this.shadowRoot.querySelector('#cNo');
            const r = this.shadowRoot.querySelector('#route');

           


            
            if (fn.value==null || fn.value==""||ln.value==null || ln.value=="" ||cn.value==null || cn.value==""||r.value==null || r.value==""){ 
                
                msg.innerHTML = "Enties can't be blank";
                msgg.innerHTML = "  ";
           
            }

            else{
                let obj = JSON.parse('{"fname":"' + fn.value + '", "lname":"' + ln.value + '", "contactNo": "' + cn.value + '", "route": "' + r.value + '"}');
                console.log(obj);
                ipcRenderer.send("addCustomer", obj)
    
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
            
    
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Customer/Add Customer</p>
        <form style="background-color: rgb(255, 255, 255); width: 400px; margin-top: 45px; height: 500px; margin-left: 300px;">
            <img src="images/customers-icon-3.png" width="50px" height="50px" style="margin-left: 170px; margin-top: 20px;">
            <h5 for="name" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);"> Name</h5>
            
            <input type="text" id="fname" name="fname"><br>
           
            <h5 for="price" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Address</h5>
            
            <input type="text" id="lname" name="lname"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Contact No</h5>
            
            <input type="text" id="cNo" name="lname"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Route</h5>
            
            <input type="text" id="route" name="lname"><br>
            <p style="color: #ff3860; margin-left:20px" id="invalid"></p>
            <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd"></p>
        </form>
        
        <button id="save" style="background-color:rgba(0, 200, 81, 1); margin-left: 490px; "><b>Save</b></button>
        <button style="background-color:rgba(255, 68, 68, 1);margin-left: 20px;"><b>Cancel</b></button>`;

    }


}

customElements.define('add-customer', addCustomer)