const { ipcRenderer } = require("electron");

export class Progress extends HTMLElement {
    constructor() {
        super();
        var el;
        var options;
        var canvas;
        var span;
        var ctx;
        var radius;
        const shadowRoot = this.attachShadow({
            mode: "open",
        });
    }

    connectedCallback() {

        this.render();

        this.drawNewGraph('graph1');

    }

    render() {
        this.shadowRoot.innerHTML += `
            <style>
                .row{
                    padding-top: 85px;
                    padding-left: 85px;
                    font-family: 'Titillium web';
                    font-weight: 400 ;
                }
                
                .chart {
                    position:relative;
                    width:165px;
                    height:165px;
                    margin: 0 auto;
                    font-family: 'Titillium web';
                    font-weight: 300 ;
                
                }
                canvas {
                    display: block;
                    position:absolute;
                    top:0;
                    left:0;
                }
                span {
                    color:#555;
                    display:block;
                    line-height:165px;
                    text-align:center;
                    width:165px;
                    font-size:40px;
                    font-weight:300;
                    margin-left:5px;
                }

                </style>
                <link rel="stylesheet" href="bootstrap-5.2.0-dist/css/bootstrap.css">
                <link rel="stylesheet" type="" href="bootstrap-5.2.0-dist/css/bootstrap.min.css">
            <div class="container">
            <div class="row">
            
                <div class="chart" id="graph1" data-percent="` + this.getAttribute('val') + `" data-color="#30bae7">
                </div>
                
            </div>

    
            `;
    }


    createCanvasVariable(id) { // get canvas
        this.el = this.shadowRoot.getElementById(id);
        console.log(this.el);
    };

    createAllVariables() {
        this.options = {
            percent: this.el.getAttribute('data-percent') || 25,
            size: this.el.getAttribute('data-size') || 165,
            lineWidth: this.el.getAttribute('data-line') || 15,
            rotate: this.el.getAttribute('data-rotate') || 0,
            color: this.el.getAttribute('data-color')
        };

        this.canvas = document.createElement('canvas');
        this.span = document.createElement('span');
        this.span.textContent = this.options.percent + '%';

        if (typeof(G_vmlCanvasManager) !== 'undefined') {
            G_vmlCanvasManager.initElement(canvas);
        }

        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.height = this.options.size;

        this.el.appendChild(this.span);
        this.el.appendChild(this.canvas);

        this.ctx.translate(this.options.size / 2, this.options.size / 2); // change center
        this.ctx.rotate((-1 / 2 + this.options.rotate / 180) * Math.PI); // rotate -90 deg

        this.radius = (this.options.size - this.options.lineWidth) / 2;
    };


    drawCircle(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2 * percent, false);
        this.ctx.strokeStyle = color;
        this.ctx.lineCap = 'square'; // butt, round or square
        this.ctx.lineWidth = lineWidth;
        this.ctx.stroke();
    };

    drawNewGraph(id) {
        this.el = this.shadowRoot.getElementById(id);
        this.createAllVariables();
        this.drawCircle('#efefef', this.options.lineWidth, 100 / 100);
        this.drawCircle(this.options.color, this.options.lineWidth, this.options.percent / 100);


    };
}

customElements.define("rep-progress", Progress);