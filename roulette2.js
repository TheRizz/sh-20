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
    constructor(parent_id, options = colorOptions, viewport_w=500, viewport_h=300, num_panels=10) {
        this.bag = new RandomBag(0, options.length-1);

        const parent = document.getElementById(parent_id);
        parent.style.border= '0px solid rgb(21, 20, 20)';
        parent.style.position = 'relative';
        parent.style.width = viewport_w + 'px';
        parent.style.height = viewport_h + 'px';
        parent.style.margin = '40px auto';
        parent.style.perspective = '500px';
        parent.style.transformStyle = 'preserve-3d';
        parent.style.overflow= 'hidden';
        parent.style.display = 'flex';
        /*parent.style.flexDirection = 'row';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';*/

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
        r_core.style.transform = 'translateZ(' + this.z_displace * -1.1 + 'px)';
        r_core.style.transformStyle = 'preserve-3d';
        r_core.style.overflow = 'visible';
        r_core.style.height = '1px';
        r_core.style.width = '1px';

        for (let i = 0; i < this.num_panels; ++i) {
            let panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.width = (this.panel_width + 'px');
            panel.style.height = (this.panel_height + 'px');
            panel.style.display = 'flex';
            panel.style.alignItems = 'center';
            panel.style.justifyContent = 'center';
            panel.style.border = '2px solid black';
            //panel.style.transformStyle = 'preserve-3d';
            // temp
            panel.innerText = "TESTING" + i;
            panel.style.background = Math.random() < 0.5?"blue": "red";
            this.panels.push(panel);
            r_core.appendChild(panel);
        }



            //var cells = document.querySelectorAll('.carousel__cell:nth-child(n)');
            //var cells = document.getElementsByClassName('carousel__cell');
        this.indexes = this.bag.draw(this.num_panels);
        this.selected = 0;
        this.displayWheel(0);
        // let child1 = document.createElement('div');
        
        // child1.innerText = "TEESTING";
        // //console.log("constructor")
        // child1.style.background = "black";
        // //child1.setAttribute('style', 'background-color: black');
        // document.getElementById(parent_id).appendChild(child1);
        //document.
    }

    displayWheel(sec) {
        var color = 0;
        for(let cell = 0; cell < this.panels.length; cell++) {
            if (this.is_string) {
                this.panels[cell].innerText = this.options[this.indexes[cell]];
                this.panels[cell].style.background = 'hsla('+color+', 100%, 50%, 1';
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

    rotateWheel(delay, rotations = 1) {
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

        console.log(this.bag.size());
        console.log("sel index", this.getSelectedIndex());
        console.log("sel", this.getSelected());
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