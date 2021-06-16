export function render(target, component, props){
    target.innerHTML = component(props)
}

function evalWithContext(string){
    const initializers = []
    for(const k of Object.keys(this)){
        initializers.push(`var ${k} = this.${k};`)
    }
    return eval(initializers.join("\n")+string)
}

export function renderAll(context){
    const elements = document.querySelectorAll('[data-render]')
    for(const element of elements){
        const result = evalWithContext.call(context, element.dataset.render)
        element.innerHTML = result
    }
}