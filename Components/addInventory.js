const { ipcRenderer } = require('electron');
export class addInventory extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        let i=0;
        var upreply = ipcRenderer.sendSync('inventory', 'string');
        //var getid = ipcRenderer.sendSync('stock', 'string');
        this.render(upreply,i)
        const msg = this.shadowRoot.querySelector('#invalid');
        const msgg = this.shadowRoot.querySelector('#invalidd');
        const msg1 = this.shadowRoot.querySelector('#invalid1');
        const msgg1 = this.shadowRoot.querySelector('#invalidd1');
        const done = this.shadowRoot.querySelector('#done');
       done.addEventListener('click', () => {
            const date = this.shadowRoot.querySelector('#date');
            const category = this.shadowRoot.querySelector('#category');
            const note = this.shadowRoot.querySelector('#note');
            

            if (date.value==null || date.value==""||category.value==null || category.value=="" ||note.value==null || note.value==""){ 
                
                msg.innerHTML = "Enties can't be blank";
                msgg.innerHTML = "";
           
            }

            else{
                let obj = JSON.parse('{"date":"' + date.value + '", "category":"' + category.value + '", "note":"' + note.value + '"}');
                console.log(obj);
                ipcRenderer.send("addinventory", obj)
                /*getid = ipcRenderer.sendSync('stock', 'string');
                this.render(upreply,i)*/
                msg.innerHTML = "";    
                msgg.innerHTML = " successfully added ";
            }
        })

       this.addIn(upreply,i,msg,msg1);

    }    

        addIn(upreply,i,msg,msg1){
               
      /*const skip = this.shadowRoot.querySelector('#skip');
        skip.addEventListener('click', () => {
            const productamount = ipcRenderer.sendSync('productamount', 'string');
              console.log("skip");
              var upreply = ipcRenderer.sendSync('inventory', 'string');
              this.addIn(upreply,i++);
              this.render(upreply,i++);
            })*/
        const submit = this.shadowRoot.querySelector('#add');
        submit.addEventListener('click', () => {
            i=i+1;
            
            var stock = ipcRenderer.sendSync('stock', 'string');
            const productamount = ipcRenderer.sendSync('productamount', 'string');
            const name = this.shadowRoot.querySelector('#name');
      
            const quantity = this.shadowRoot.querySelector('#quantity');
     

            


            if (quantity.value==null || quantity.value==""){ 
                
                msg1.innerHTML = "Enties can't be blank";
                msgg1.innerHTML="";
                
           
            }

            else{
            let obj = JSON.parse('{"name":"' + name.value + '",  "quantity": "' + quantity.value + '",  "s_id": "' + stock[0].s_id + '", "p_id": "' + upreply[i-1].p_id + '"}');
            ipcRenderer.send("InventoryManagement", obj)
            this.render(upreply,i);
            msg1.innerHTML = " ";
            msgg1.innerHTML="successfully added ";
            }


            
            if(i<productamount.length){
                const done = this.shadowRoot.querySelector('#done');
                done.addEventListener('click', () => {
                    const date = this.shadowRoot.querySelector('#date');
                    const category = this.shadowRoot.querySelector('#category');
                    const note = this.shadowRoot.querySelector('#note');
                    if (date.value==null || date.value==""||category.value==null || category.value=="" ||note.value==null || note.value==""){ 
                
                        msg.innerHTML = "Enties can't be blank";
                        
                   
                    }
        
                    else{
                        let obj = JSON.parse('{"date":"' + date.value + '", "category":"' + category.value + '", "note":"' + note.value + '"}');
                        console.log(obj);
                        ipcRenderer.send("addinventory", obj)
            
                    msg.innerHTML = " successfully added ";
                    }
                     this.connectedCallback();
                  })
                  this.addIn(upreply,i,msg,msg1);
                }
             
            
        })
    }


    

    render(upreply,i) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="Components/styleI.css">
        
        <div style="margin-left:-148px">

        <div class="tbl" style="padding-top:20px;">
        <label for="" style="font-size: 25px;color:grey;">Inventory</label>
        <hr style="width:49%; margin-left:0px;">
        <br>
        <label for="" style="font-size:23px;">Date</label>
        <label for="" style="font-size:23px; margin-left:573px">Category</label>
        <br>
        <input type="date" class="fname" name="date" id="date" style="background-color: rgba(250, 238, 210, 1); width: 555px; height: 36px; border-color:rgba(128, 128, 128, 1);">
        <input type="text" class="fname" name="category" id="category" style="margin-left: 50px;" >
        <br><br><br>
        <input type="text" class="txt1" value="Note" size="88" id="note">
        <br>
        <p style="color: #ff3860; margin-left:20px" id="invalid"></p>
        <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd"></p>
        <button id="done" style="margin-left:545px">ADD</button>
        </div>

    <div class="tbl" style="padding-top:20px;">
        <label for="" style="font-size: 25px;color:grey;">Items</label>
        <hr style="width:49%; margin-left:0px;">
        <br>
        <label for="" style="font-size:23px;">Name</label>
        <label for="" style="font-size:23px; margin-left:563px">Quantity</label>
        <br>
        <input type="text" class="fname" id="name" name="name" value="` + upreply[i].pname + `">
        <input type="text" class="fname" id="quantity" name="quantity" style="margin-left: 50px;>
        
        <br><br>
     
       
        <br>
        
        <input type="text" class="fname" id="nPrice" name="nPrice" style="margin-left: 50px;">
        <p style="color: #ff3860; margin-left:20px" id="invalid1"></p>
        <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd1"></p>
        <br>
        <button id="add" style="margin-left:545px">Done</button>
        



    </div>
    </div>
    

  
    
                `;

    }


}

customElements.define('add-inventory', addInventory)