// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export function formatNumber(x) {
    const o = Math.floor(Math.log10(x))
    if (o >= 6) {
        return (Math.round(x/Math.pow(10, 6)*10)/10.0)+"M";
    } else if (o >= 3) {
        return (Math.round(x/Math.pow(10, 3)*10)/10.0)+"k";
    }
    return x;
}