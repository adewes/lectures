import { formatNumber } from "./helpers.js";

export function barChart(id, allBars, opts){

    if (opts === undefined)
        opts = {}

    const plot = document.getElementById(id);
    const barMargin = plot.clientWidth > 600 ? 2: 0;
    let bottomMargin = 40;
    const leftMargin = 60;
    const plotHeight = opts.height || 200;
    const n = allBars[0].length;
    const nHorizonalTicks = Math.min(plot.clientWidth/100, n);
    const container = document.createElement("div");
    container.style.height = (plotHeight+bottomMargin)+"px";
    container.style.width = "100%";

    if (plot.hasChildNodes())
        plot.replaceChild(container, plot.childNodes[0])
    else
        plot.appendChild(container);

    const N = allBars.length
    const plotWidth = container.clientWidth-leftMargin-n*barMargin*N;
    const barWidth = Math.max(2, Math.min(50, plotWidth/n))/N;
    const innerWidth = (barWidth+barMargin)*n*N;

    let withBlocks = false;
    if (opts.blocks !== undefined){
        withBlocks = true;
        bottomMargin += barWidth*N+10;
    }

    let max = 0;
    if (opts.relative)
        max = 100;
    else
        for(let j=0;j<allBars.length;j++){
            let bars = allBars[j];
            for(let i=0;i<n;i++){
                if (opts.ref !== undefined && opts.ref[i] > max)
                    max = opts.ref[i];
                if (bars[i] > max)
                    max = bars[i];
            }
        }

    let lastXTick;
    for(let i=0;i<n;i++){
        let x = leftMargin+i*(barWidth+barMargin)*N;
        let width = Math.floor(barWidth+(x-Math.floor(x) > 0.5 && barMargin == 0 ? 1 : 0));
        if (opts.ref !== undefined){
            const refElement = document.createElement("span");
            refElement.style.width = width+"px";
            if (opts.relative)
                refElement.style.height = plotHeight+"px";
            else
                refElement.style.height = Math.floor(opts.ref[i]/max*plotHeight)+"px";
    
            refElement.style.position = "absolute";
            refElement.style.left = x+"px";
            refElement.style.bottom = bottomMargin+"px";
            refElement.style.display = "block";
            refElement.className = "refbar";
            refElement.style.margin = barMargin+"px";
            container.appendChild(refElement);
        }
        if (i % (Math.floor(n/(nHorizonalTicks))) == 0){
            // we add a legend
            const legendElement = document.createElement("span");
            legendElement.style.position = "absolute";
            legendElement.style.display = "block";
            legendElement.style.textAlign = "center";
            legendElement.innerText = opts.xTicks !== undefined ? opts.xTicks[i] : i;
            const left = Math.floor(-(legendElement.clientWidth-barWidth)/2+leftMargin+i*(barWidth+barMargin)*N);
            container.appendChild(legendElement);
            legendElement.style.left = Math.floor(left-legendElement.clientWidth/2)+"px";
            legendElement.style.bottom = ((withBlocks ? 0.7 : 1)*bottomMargin-legendElement.clientHeight)+"px";
            // if there's not enough space for a tick we remove it again...
            if (lastXTick !== undefined && (left-20) <= lastXTick)
                container.removeChild(legendElement);
            lastXTick = left+legendElement.clientWidth;
        }
        let y = 0;
        for(let j=0;j<allBars.length;j++){
            let bars = allBars[j];
            let className;
            if (opts.classNames !== undefined)
                className = opts.classNames[j];
            let h = bars[i];
            let ref = (opts.relative ? opts.ref[i]: max);
            let hh = Math.ceil(h/ref*plotHeight);
            let yy = Math.floor(y/ref*plotHeight);
            if (hh+yy > plotHeight)
                hh -= hh+yy-plotHeight;
            const element = document.createElement("span");
            element.style.marginLeft = -(barWidth+barMargin)+"px";
            element.style.width = width+"px";
            element.style.height = hh+"px";
            element.style.position = "absolute";
            element.style.left = x+barWidth*j+"px";
            element.style.bottom = (bottomMargin+yy)+"px";
            element.style.display = "block";
            element.style.zIndex = 2;
            element.className = "bar";
            if (className !== undefined)
                element.className += " "+className;
            element.style.margin = barMargin+"px";
            container.appendChild(element);
            //y += h;
        }


        if(opts.blocks !== undefined){
            const block = opts.blocks.find(block => opts.xTicks !== undefined ? block.x === opts.xTicks[i] : block.i === i)
            const element = document.createElement("span");
            element.style.marginLeft = -(barWidth+barMargin)+"px";
            element.style.width = width*N+"px";
            element.style.height = Math.floor(width*N*0.5)+"px";
            element.style.position = "absolute";
            element.style.left = x+"px";
            element.style.bottom = Math.floor(bottomMargin-width-4)+"px"
            element.style.display = "block";
            element.style.zIndex = 3;
            if (block !== undefined && block.class !== undefined){
                element.className = `block ${block.class}`
            } else {
                element.className = "block";                
            }
            element.style.margin = barMargin + "px";
            container.appendChild(element);
        }

    }
    const nVerticalTicks = max > 0 ? 5 : 0;
    for(let i=1;i<nVerticalTicks+1;i++){
        const y = i/nVerticalTicks*max;
        const lv = Math.floor(Math.log10(y));
        const v = Math.round(y/Math.pow(10,lv))*Math.pow(10, lv);
        const ly = (bottomMargin+v/max*plotHeight);
        const legendElement = document.createElement("span");
        legendElement.style.position = "absolute";
        legendElement.style.horizontalAnchor = "right";
        legendElement.style.display = "block";
        legendElement.innerText = formatNumber(v);
        container.appendChild(legendElement);

        legendElement.style.left = (leftMargin-legendElement.clientWidth-2)+"px";
        legendElement.style.bottom = ly-legendElement.clientHeight/3+"px";

        const gridElement = document.createElement("span");
        gridElement.style.position = "absolute";
        gridElement.style.display = "inline-block";
        gridElement.style.left = leftMargin+"px";
        gridElement.style.bottom = ly+"px";
        gridElement.style.width = innerWidth+"px";
        gridElement.style.height = "1px";
        gridElement.style.borderTop = "#aaa dashed 1px";
        gridElement.style.zIndex = 1;

        container.appendChild(gridElement);
    }
}