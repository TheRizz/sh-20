const ColorMode = {
    'rainbow': 0,
    'random': 1,
    'grayscale': 2,
};
Object.freeze(ColorMode);

const ZIndex = {
    'roulette_viewport': 1,
    'roulette_panel': 10,
    'roulette_core': 5,
};
Object.freeze(ZIndex);

// Pass array of options
    // If options is an array of arrays, grab the first element of each sub array as the display text
    // Otherwise just grab the element as display text


/* panels       coef
    5           0.81
    6           0.863
    7           0.902
    8           0.925
    9           0.94
 */    
class RouletteWheel {
    /**
     * viewport inputs should be in pixels
     */
    constructor(parent_id, options = colorOptions, viewport_w=500, viewport_h=300, num_panels=10, color_mode = 'rainbow') {
        this.bag = new RandomBag(0, options.length-1);

        const parent = document.getElementById(parent_id);
        parent.style.border= '0px solid rgb(21, 20, 20)';
        parent.style.position = 'relative';
        parent.style.width = viewport_w + 'px';
        parent.style.height = viewport_h + 'px';
        parent.style.padding = '0';
        //parent.style.margin = '40px auto';
        parent.style.perspective = '500px';
        parent.style.transformStyle = 'preserve-3d';
        parent.style.overflow= 'hidden';
        parent.style.display = 'flex';
        parent.style.flexDirection = 'row';
        parent.style.alignItems = 'center';
        //parent.style.backgroundColor = 'cyan';
        parent.style.justifyContent = 'center';
        parent.style.zIndex = ZIndex.roulette_viewport;

        switch(color_mode) {
            case 'rainbow': case 'Rainbow': case 'RAINBOW':
                this.color_mode = ColorMode.rainbow;
                break;
            case 'random': case 'rand': case 'Random': case 'Rand': case 'RANDOM': case 'RAND':
                this.color_mode = ColorMode.random;
                break;
            case 'grayscale': case 'Grayscale': case 'GRAYSCALE':
                this.color_mode = ColorMode.grayscale;
                break;
            default:
                this.color_mode = ColorMode.rainbow;
        }
        this.options = options;
        this.is_string = false;
        if (typeof this.options[0] === 'string'){
            this.is_string = true;
        }
        else{
            this.is_string = false;
        }      
        this.num_panels = num_panels;
        this.parent_id = parent_id;
        this.panels = [];

        this.panel_width = viewport_w;
        this.panel_height = 150;
        this.z_displace = (1.11 - 0.3516 * num_panels + 0.104 * Math.pow(num_panels, 2) - 0.0112 * Math.pow(num_panels, 3) + 0.000414 * Math.pow(num_panels, 4)) *
        (this.panel_height / (2 * Math.sin( Math.PI / (num_panels))));
        // this.z_displace = this.panel_height / (2 * Math.sin( Math.PI / num_panels));
        this.selected_index = 0;
        this.curr_angle = 0;
        this.rotation_angle = 360 / this.num_panels;

        const r_core = document.createElement('div');
        parent.appendChild(r_core);
        r_core.style.top = viewport_h/4 + 'px';
        //this.z_displace = 0; // test temp
        r_core.style.transform = 'translateZ(' + this.z_displace * -1.1 + 'px)';
        r_core.style.transformStyle = 'preserve-3d';
        r_core.style.overflow = 'visible';
        r_core.style.height = '100%';
        r_core.style.width = '100%';
        //r_core.style.backgroundColor = 'pink';
        r_core.style.display = 'flex';
        r_core.style.alignItems = 'center';
        r_core.style.justifyContent = 'center';
        r_core.style.flexDirection = 'row';
        r_core.style.zIndex = ZIndex.roulette_core;
        r_core.position = 'absolute';

        for (let i = 0; i < this.num_panels; ++i) {
            let panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.width = (this.panel_width + 'px');
            panel.style.height = (this.panel_height + 'px');
            panel.style.display = 'flex';
            panel.style.color = "white";
            panel.style.border= "3px solid black";
            panel.style.alignItems = 'center';
            panel.style.justifyContent = 'center';
            panel.style.border = '2px solid black';
            panel.style.top = (viewport_h - this.panel_height) / 2 + 'px';
            panel.style.left = '0';
            panel.style.fontSize = "36px";
            panel.style.textShadow = "2px 2px 2px black";
            panel.style.textStroke = '3px black';
            panel.style.zIndex = ZIndex.roulette_panel;
            this.panels.push(panel);
            r_core.appendChild(panel);
        }
        this.indexes = this.bag.draw(this.num_panels);
        this.selected = 0;
        this.displayWheel(0);
    }

    displayWheel(sec) {
        var color = 0;
        let sat = '100%';
        if (this.color_mode == ColorMode.grayscale) { 
                sat = '10%';
        }
        for(let cell = 0; cell < this.panels.length; cell++) {
            if (this.is_string) {
                this.panels[cell].innerText = this.options[this.indexes[cell]];
                if (this.color_mode == ColorMode.random) {
                    this.panels[cell].style.background = 
                        colorOptions[Math.floor(Math.random() * colorOptions.length)][1];
                } else {
                    this.panels[cell].style.background = 'hsla('+color+', '+ sat + ', 50%, 1';
                }
            } else {
                this.panels[cell].innerText = this.options[this.indexes[cell]][0];
                this.panels[cell].style.background = this.options[this.indexes[cell]][1];
            }
            this.panels[cell].style.transition = 'transform ' + sec + 's';
            this.panels[cell].style.transform =
            'rotateX(' + ((this.curr_angle + (cell * this.rotation_angle))) +'deg)' +
            'translateZ(' +Math.floor(this.z_displace)+ 'px)';
            color += 360/(this.panels.length);  
        }
    }

    rotateWheel(rotations = 1) {
        var delay = 10;
        this.indexes = this.bag.draw(this.num_panels);
        this.displayWheel(0);
        this.updateSelected(rotations);
        // 
        for(let i = 0; i < rotations; i++){
            this.curr_angle = (this.curr_angle + this.rotation_angle);// % 360;
            // speed-=0.15;
            if (i == rotations -1)
                delay = 4;
            this.displayWheel(delay);
        }

        this.indexes.splice(this.getSelectedIndex(),1);
        this.bag.refillLeftovers(this.indexes);

        //console.log("sel index", this.getSelectedIndex());
        //console.log("sel", this.getSelected());
    }
    
    updateSelected(rotations){
        this.selected_index = ((this.selected_index + this.num_panels - (rotations% this.num_panels)) % this.num_panels);
        this.selected = this.options[this.indexes[this.selected_index]];
    }

    getSelectedIndex() {
        return this.selected_index;
    }

    getSelected() {
        return this.selected;
    }
}