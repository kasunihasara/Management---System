const { ipcRenderer } = require('electron');
export class updaterep extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {
        var upreply = ipcRenderer.sendSync('updaterep', this.getAttribute("rep_id"));
        this.render(upreply);
        const msg = this.shadowRoot.querySelector('#invalid');
        const msgg = this.shadowRoot.querySelector('#invalidd');
        const submit = this.shadowRoot.querySelector('#save');
        submit.addEventListener('click', () => {
            const repId = this.shadowRoot.querySelector('#Rid');
            const name = this.shadowRoot.querySelector('#name');
            const adress = this.shadowRoot.querySelector('#adress');
            const contact = this.shadowRoot.querySelector('#contact');
           
           

            if (repId.value==null || repId.value==""||name.value==null || name.value=="" ||adress.value==null || adress.value==""||contact.value==null || contact.value==""){ 
                
                
                msg.innerHTML = "Enties can't be blank";
                msgg.innerHTML = "  ";   
           
            }

            else{
                let obj = JSON.parse('{"repId":"' + repId.value + '", "name":"' + name.value + '", "address": "' + adress.value + '", "phone": "' + contact.value + '"}');
                obj.id=upreply[0].rep_id;
                
                ipcRenderer.send("updaterepiteam", obj);
                document.getElementById("main-body").innerHTML = "<view-sales-rep></view-sales-rep>";
    
                msgg.innerHTML = " successfully added ";
                msg.innerHTML = " ";
            }

        })

    }

    render(upreply) {
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
            
    
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Sales Rep/Update Sales Rep</p>
        <form style="background-color: rgb(255, 255, 255); width: 400px; margin-top: 45px; height: 550px; margin-left: 300px;">
            <img src="images/icons8-fast-moving-consumer-goods-100.png" width="50px" height="50px" style="margin-left: 170px; margin-top: 20px;">
            
            <h5 for="price" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Rep Id</h5>
            
            <input type="text" id="Rid" name="Rid" value="`+upreply[0].rep_id+`"><br>
           
            <h5 for="price" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Name</h5>
            
            <input type="text" id="name" name="name" value="`+upreply[0].name+`"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Adress(RS)</h5>
            
            <input type="text" id="adress" name="adress" value="`+upreply[0].address+`"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Contact</h5>
            
            <input type="text" id="contact" name="contact" value="`+upreply[0].phone+`"><br>
            <p style="color: #ff3860; margin-left:20px" id="invalid"></p>
            <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd"></p>
        </form>
        
        <button id="save" style="background-color:rgba(0, 200, 81, 1); margin-left: 490px; margin-bottom:30px;"><b>Save</b></button>
        <button style="background-color:rgba(255, 68, 68, 1);margin-left:20px;"><b>Cancel</b></button>`;

    }


}

customElements.define('update-rep', updaterep)