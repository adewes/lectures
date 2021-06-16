import { t } from '../translate.js';


export const BarChart = ({min, max}) => {
    return ''
}

export const ResultBoxes = ({min, max, values}) => {
    const boxes = []
    const d = 20;
    for(let i=min;i<=max;i++){
        const left = (i-min)*d;
        boxes.push(`<li style="left: ${left}px; width:${d} height:${d}">${i}</li>`)
    }
    return `<ul class="result-boxes">
        ${boxes.join(" ")}
    </ul>`
}


export const DataCubes = data => {
    const cubes = data.map(() => Cube({size: 'sm', color: 'red'}))
    return `
        ${cubes.join(' ')}
    `
}

export const Cube = ({size = 'sm', color = 'red'}) => {
    return `<div class="cube is-${color} is-${size}">
        <div class="face front"></div>
        <div class="face side"></div>
        <div class="face top"></div>
    </div>
    `
}

const DataRow = row => `
    <tr>
        <td>
            ${Cube({size: "sm"})}
        </td>
        <td>
            ${row.name}
        </td>
        <td>
            ${row.income}
        </td>
    </tr>
`
const FrequencyRow = (value, f, fd, epsilon) => {
    let extra = ''
    let extraClass = ''
    let ratio = Math.floor(1000*Math.max(fd/f, f/fd))/1000
    let expe = Math.floor(1000*Math.exp(epsilon))/1000
    if (epsilon !== undefined){
        extra = `(${expe})`
        if (ratio > expe*1.25)
            extraClass = ' class="is-excessive"'
        else
            extraClass = ' class="is-ok"'
    }
    return `
    <tr>
        <td>
            ${value}
        </td>
        <td>
            ${f}
        </td>
        <td>
            ${fd}
        </td>
        <td${extraClass}>
            ${ratio} ${extra}
        </td>
    </tr>
`
}

export const FrequencyTable = ({values, frequencies, frequenciesD, epsilon}) => {
    const rows = []
    let minI
    let maxI
    for(let i=0;i<values.length;i++){
        if (minI === undefined && (frequencies[i] !== 0 || frequenciesD[i] !== 0))
            minI = i
        if (frequencies[i] !== 0 || frequenciesD[i] !== 0)
            maxI = i
    }
    for(let i=minI;i<=maxI;i++){
        rows.push(FrequencyRow(values[i], frequencies[i], frequenciesD[i], epsilon))
    }

    return `
        <table class="frequency-table table is-striped">
            <thead>
                <tr>
                    <th>
                        ${t('result')}
                    </th>
                    <th>
                        ${t('freq')}
                    </th>
                    <th>
                        ${t('freq-d')}
                    </th>
                    <th>
                        ${t(epsilon === undefined ? 'ratio' : 'ratio-with-epsilon')}
                    </th>
                </tr>
            </thead>
            <tbody>
                ${rows.join(' ')}
            </tbody>
        </table>
    `
}

export const DataTable = data => {

    const rows = data.map(row => DataRow(row))

    return `
        <table class="table is-striped">
            <thead>
                <tr>
                    <th style="width: 20px">

                    </th>
                    <th>
                        ${t('name')}
                    </th>
                    <th>
                        ${t('income')}
                    </th>
                </tr>
            </thead>
            <tbody>
                ${rows.join(' ')}
            </tbody>
        </table>
    `
}
