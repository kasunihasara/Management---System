const { ipcRenderer } = require('electron');
export class updateproduct extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open'
        })

    }

    connectedCallback() {

        
        var upreply = ipcRenderer.sendSync('updateproduct', this.getAttribute("p_id"));
        this.render(upreply);
        const msg = this.shadowRoot.querySelector('#invalid');
        const msgg = this.shadowRoot.querySelector('#invalidd');
        console.log(upreply[0].pname);
        const submit = this.shadowRoot.querySelector('#save');
        submit.addEventListener('click', () => {
            const name = this.shadowRoot.querySelector('#name');
            const price = this.shadowRoot.querySelector('#price');
            const category = this.shadowRoot.querySelector('#category');

  
               

                if (name.value==null || name.value==""||price.value==null || price.value=="" ||category.value==null || category.value==""){ 
                
                   
                    msg.innerHTML = "Enties can't be blank";
                    msgg.innerHTML = "  ";   
                    
               
                }
    
                else{
                let obj = JSON.parse('{"name":"' + name.value + '", "price":"' + price.value + '", "category": "' + category.value + '"}');
                obj.id = upreply[0].p_id;
                console.log(obj.id);
                ipcRenderer.send("updateproductiteam", obj);
                document.getElementById("main-body").innerHTML = "<view-product></view-product>";
        
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
            
    
        <p style="margin-left: -110px; margin-top:10px"><a onClick="first()" style="cursor: pointer;">Home</a>/Product/Update Product</p>
        <form style="background-color: rgb(255, 255, 255); width: 400px; margin-top: 45px; height: 450px; margin-left: 300px;">
            <img src="images/icons8-fast-moving-consumer-goods-100.png" width="50px" height="50px" style="margin-left: 170px; margin-top: 20px;">
            
            
           
            <h5 for="price" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Name</h5>
            
            <input type="text" id="name" name="name"; value="` + upreply[0].pname + `"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Price(RS)</h5>
            
            <input type="text" id="price" name="price"; value="` + upreply[0].price + `"><br>
            
            <h5 for="category" style="margin-top: 20px; margin-left: 47px; color: rgba(0, 0, 0, 0.39);">Category</h5>
            
            <input type="text" id="category" name="category"; value="` + upreply[0].category + `"><br>
            <p style="color: #ff3860; margin-left:20px" id="invalid"></p>
            <p style="color: rgba(0, 200, 81, 1); margin-left:20px" id="invalidd"></p>
        </form>
        
        <button id="save" style="background-color:rgba(0, 200, 81, 1); margin-left: 490px ; margin-bottom:30px;"><b>Save</b></button>
        <button style="background-color:rgba(255, 68, 68, 1);margin-left:20px;"><b>Cancel</b></button>`;

    }


}

customElements.define('update-product', updateproduct)