const template = document.createElement('template');
template.innerHTML = `
      <style>
    
    </style>

    <div class="test-container">
    <h1>test 1</h1>
    </div>
  
`;

export class Test1 extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }

}

window.customElements.define('test-one', Test1)