// Pass array of options
    // If options is an array of arrays, grab the first element of each sub array as the display text
    // Otherwise just grab the element as display text



class RouletteWheel {
    /**
     * viewport inputs should be in pixels
     */
    constructor(parent_id, options, viewport_w=400, viewport_h=350, num_panels=5) {
        this.num_panels = num_panels;
        this.parent_id = parent_id;
        this.panels = [];
        this.options = options;
        this.panel_width = viewport_w;
        this.panel_height = 150;
        this.z_displace = this.panel_height / (2 * Math.sin(Math.PI / num_panels))
        this.selected_index = 0;
        this.curr_angle = 0;
        this.rotation_angle = 360 / this.num_panels;

        const parent = document.getElementById(parent_id);
        parent.style.transform = 'translateZ(-200px)';
        parent.style.transformStyle = 'preserve-3d';

        for (let i = 0; i < this.num_panels; ++i) {
            let panel = document.createElement('div');
            panel.style.position = 'absolute';
            panel.style.width = (this.panel_width + 'px');
            panel.style.height = (this.panel_height + 'px');
            panel.style.display = 'flex';
            panel.style.alignItems = 'center';
            panel.style.justifyContent = 'center';
            panel.style.border = '2px solid black';
            panel.style.transformStyle = 'preserve-3d';
            // temp
            panel.innerText = "TESTING" + i;
            //console.log("constructor")
            panel.style.background = Math.random() < 0.5?"blue": "red";
            // Set transforms, displacement, etc for the panel
            this.panels.push(panel);
            parent.appendChild(panel);
        }



            //var cells = document.querySelectorAll('.carousel__cell:nth-child(n)');
            //var cells = document.getElementsByClassName('carousel__cell');
        this.displayWheel(0);
        // let child1 = document.createElement('div');
        
        // child1.innerText = "TEESTING";
        // //console.log("constructor")
        // child1.style.background = "black";
        // //child1.setAttribute('style', 'background-color: black');
        // document.getElementById(parent_id).appendChild(child1);
        //document.
        console.log(this.panels);
    }

    displayWheel(sec) {
        var color = 0;
        console.log("displaying wheel")
        for(let cell = 0; cell < this.panels.length; cell++) {
            this.panels[cell].style.background = 'hsla('+color+', 100%, 50%, 1';
            this.panels[cell].style.transition = 'transform ' + sec + 's';
            this.panels[cell].style.transform =
            'rotateX(' + ((this.curr_angle + (cell * this.rotation_angle))) +'deg)' +
            'translateZ(' +Math.floor(this.z_displace)+ 'px)';
            color += 360/(this.panels.length);
        }
    }

    rotateWheel(delay, rotations = 1) {
        for(let i = 0; i < rotations; i++){
            this.curr_angle = (this.curr_angle + this.rotation_angle);// % 360;
            // speed-=0.15;
            if (i == rotations -1)
                delay = 4;
            this.displayWheel(delay);
        }
    }
}