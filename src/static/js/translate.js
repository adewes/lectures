export function format() {
  "use strict";
  var str = this.toString();

  var t = typeof arguments[0];
  var args;
  if (arguments.length == 0) args = {};
  else
    args =
      "string" === t || "number" === t
        ? Array.prototype.slice.apply(arguments)
        : arguments[0];

  var splits = [];

  var s = str;

  while (s.length > 0) {
    var m = s.match(/\{(?!\{)([\w\d]+)\}(?!\})/);
    if (m !== null) {
      var left = s.substr(0, m.index);
      var sep = s.substr(m.index, m[0].length);
      s = s.substr(m.index + m[0].length);
      var n = parseInt(m[1]);
      splits.push(left);
      if (n != n) {
        // not a number
        splits.push(args[m[1]]);
      } else {
        // a numbered argument
        splits.push(args[n]);
      }
    } else {
      splits.push(s);
      s = "";
    }
  }
  return splits;
};

export function t(key){
    const undef = "[no translation available for key " + key + "]"
    const subkeys = key.split('.')
    let tr = window.translations
    for(let i=0;i<subkeys.length;i++){
        let subkey=subkeys[i];
        tr = tr[subkey]
        if (tr === undefined)
            return undef
    }
    var str = tr[window.language]
    if (str === undefined)
        return undef
    var formattedStr = format.apply(str, [].slice.call(arguments).slice(1))
    return formattedStr
}
