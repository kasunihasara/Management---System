const template = document.createElement('template');
template.innerHTML = `
<style>
.logout{
  border: none;
  background-color: red;
  margin-top: 25px;
  width: 100px;
  height: 40px;
  margin-left: 900px;
  color: white;
}
</style>


<div>

         <button class="logout" onclick="logOut()" style="margin-left:1000px;">LOGOUT</button>
      <div style="margin: 85px;">
      <div style="background-color: rgb(245, 224, 175); width:200px; height: 80px; padding: 15px; margin-left:-100px; margin-top: 180px;"><img src="images/analytics-circle-green-512.webp" style="width: 50px; height:50px; margin-top:18px; "><h5 style=" margin-left:70px; margin-top:-40px;">Analysis</h5></div>
      <div style="background-color: rgb(245, 224, 175); width:200px; height: 80px; padding: 15px; margin-left: 280px; margin-top: -110px;"><img src="images/red_shoppictbasket_1484336512-1.png " alt=" "style="width: 50px; height:50px;margin-top:18px; "><h5 style=" margin-left:70px; margin-top:-40px;">Products</h5></div>
      <div style="background-color: rgb(245, 224, 175); width:200px; height: 80px; padding: 15px; margin-left: 600px; margin-top: -110px;"><img src="images/micro-distribution-inventory-svg-png-icon-free-download-inventory-icon-flat-png-free-transparent-png-clipart-images-download.png " alt=" " style="margin-top:18px; width: 50px; height:50px; "><h5 style=" margin-left:70px; margin-top:-40px;">Inventory</h5></div>
      <div style="background-color: rgb(245, 224, 175); width:200px; height: 80px; padding: 15px; margin-top: 100px; margin-left: -100px;"><img src="images/customers-icon-3.png " style="width: 50px; height:50px; margin-top:18px;"><h5 style=" margin-left:70px; margin-top:-40px;">Sales Rep</h5></div>
      <div style="background-color: rgb(245, 224, 175); width:200px; height: 80px; padding: 15px; margin-left: 280px; margin-top: -110px;"><img src="images/person-icon-red-14.jpg " style="width: 50px; height:50px;margin-top:18px; "><h5 style=" margin-left:70px; margin-top:-40px;">Customer</h5></div>
      <div style="background-color: rgb(245, 224, 175); width:200px; height: 80px; padding: 15px; margin-left: 600px; margin-top: -110px;"><img src="images/icons8-dollar-sign-64.png " style="width: 50px; height:50px; margin-top:18px;"><h5 style=" margin-left:70px; margin-top:-40px;">Payment</h5></div>
  </div>
</div>
  
`;

export class Test extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

}

window.customElements.define('test-zero', Test)