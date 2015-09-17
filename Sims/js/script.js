var width;
var height;
var ctx;
var critters = [];

var alpha = 0.5; // Weight to random choice
var beta = 0.5; // Weight to nearest neighbors
var k = 3; // Nearest neighbors to consider
var maxcnt = 100;
var maxd = 100;

function init() {
    var canvas =document.getElementById('emergentCanvas');
    width = canvas.width;
    height = canvas.height; 
    ctx = canvas.getContext('2d');
    for (i=0; i<50; i++){
        addCritter();
    }
    setInterval(update, 10);
}

function addCritter(){
    var x = Math.random()*width;
    var y = Math.random()*height;
    var rvx = Math.random() - 0.5;
    var rvy = Math.random() - 0.5;
    var nrvx = rvx / Math.sqrt(rvx*rvx + rvy*rvy);
    var nrvy = rvy / Math.sqrt(rvx*rvx + rvy*rvy);
    var c = {'x':x, 'y':y, 'rvx':nrvx, 'rvy':nrvy,'vx':nrvx, 'vy':nrvy, 'cnt':0};
    console.log(c);
    critters.push(c);
}

function update(){
    for (var i in critters){
        c = critters[i];
        var x = c.x;
        var y = c.y;
        var rvx = c.rvx;
        var rvy = c.rvy;
        var cnt = c.cnt;
        // Get random or update
        if (cnt<=0){
            c.cnt = Math.round(Math.random()*maxcnt);
            rvx = Math.random()-0.5;
            rvy = Math.random()-0.5;
            var nrvx = rvx / Math.sqrt(rvx*rvx + rvy*rvy);
            var nrvy = rvy / Math.sqrt(rvx*rvx + rvy*rvy);
            c.rvx = nrvx;
            c.rvy = nrvy;
        }
        // Get k nearest neighbors
        var ks = {};
        for (j in critters){
            if (i==j) continue;
            var cj = critters[j];
            ks[toroidalD(x,y,cj.x,cj.y)] = j;
        }
        var sorted_keys = Object.keys(ks).sort();
        var total_vx = 0;
        var total_vy = 0;
        for (j=0; j<Math.min(k,critters.length); j++){
            var dj = sorted_keys[j];
            var cj = critters[ks[dj]];
            total_vx += cj.vx;
            total_vy += cj.vy;
        }

        var nvx = total_vx/Math.sqrt(total_vx*total_vx + total_vy*total_vy);
        var nvy = total_vy/Math.sqrt(total_vx*total_vx + total_vy*total_vy);

        c.vx = (alpha*rvx)+(beta*nvx);
        c.vy = (alpha*rvy)+(beta*nvy);
        c.x += c.vx;
        c.y += c.vy;

        c.x = (c.x+width) % width;
        c.y = (c.y+height) % height;
        c.cnt--;
    }
    draw();
}

function toroidalD(ax,ay,bx,by){
    var dx = Math.min(Math.abs(bx-ax),Math.abs(bx-(ax+width)));
    var dy = Math.min(Math.abs(by-ay),Math.abs(by-(ay+height)));
    return Math.sqrt(dx*dx + dy*dy);
}

function draw(){
    ctx.clearRect(0, 0, width, height);
    for (var i in critters){
        c = critters[i];
        var x = c.x;
        var y = c.y;
        var vx = c.vx;
        var vy = c.vy;

        ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle="#FF0000";
        ctx.moveTo(x,y);
        ctx.lineTo(x+(10*vx),y+(10*vy));
        ctx.stroke();
        ctx.closePath();
    }
}

$(document).ready(init);
