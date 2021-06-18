# Einführung

Dies ist eine interaktive Ergänzung zur Vorlesung "Datenschutz mit Ɛ-Differential Privacy". Aktuell ist dies kein eigenständiges Manuskript und nur in Kombination mit der Präsentation wirklich vollständig, die Inhalte werden jedoch kontinuierlich ausgebaut und verbessert.

<!--translate:ignore-->
<script>
  translations = {{site.translations.intro|tojson}};
  language = '{{lang}}'
</script>
<!--translate:ignore-->

# Unsere Daten

Im folgenden nutzen wir Beispieldaten, die das Einkommen verschiedener Personen beschreiben. Wir untersuchen, wie das Hinzufügen eines einzelnen Datenpunktes dsa Ergebnis statistischer Analysen auf dem Datensatz verändert, und wie dies die Privatsphäre der Person gefährdet, der die zugefügten Daten gehören.

<div id="table" data-render="DataTable([...this.data.slice(0,10),{name: '...', income: '...'}])">
</div>

Im Folgenden repräsentieren wir einzelne Datensätze als einzelne Blöcke.

<div style="display: flex; flex-direction: row;">

<div style="margin-right: 10px;">

  <h2>{{'intro.d.title'|translate}}</h2>

  <div style="margin-left: 0px;" id="cubes-d" data-render="DataCubes({data: dataD, color: 'red'})">
  </div>
</div>

<div>

  <h2>{{'intro.dp.title'|translate}}</h2>

  <div id="cubes-dp" data-render="DataCubes({data: data, color: 'green'})">
  </div>
</div>

</div>

# Datensatz $ D $

Der Datensatz $ D $ enthält alle Punkte aus Datensatz $ D ' $, bis auf einen einzigen der diesem hinzugefügt wird.

# Datensatz $ D' $

Der Datensatz $ D' $ ist bis auf einen einzelnen hinzugefügten Datenpunkt <span data-render="Cube({color: 'red', size: 'xs'})"></span> identisch zum Datensatz $ D $. Diesen hinzugefügten Datenpunkt nennen wir im Folgenden Differenzpunkt.


<!--translate:ignore-->

<script type="module">
  import { renderAll } from '{{"js/render.js"|file}}';
  import { random } from '{{"js/stats.js"|file}}';
  import { DataTable, SuccessRate, Literal, DataCubes, Cube } from '{{"js/sites/intro.js"|file}}';
const firstNames = ['James', 'Robert', 'John', 'Michael', 'Joseph', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Andreas', 'Christian', 'Thomas', 'Lukas', 'Tristan', 'Isolde', 'Wolfgang', 'Herbert', 'Brunhile']
const lastNames = ['Meier', 'Müller', 'Schmidt', 'Kachelmann','Weintraut', 'Schwarz', 'Manning', 'Johnson', 'Biden', 'Maurer', 'Kemmerling', 'Gott', 'Liefers', 'Duchrow', 'Lohse']
const zipCodes = ['66606', '72070', '80331', '10625', '54315', '12421', '92151']
const randomName = () => `${firstNames[random(firstNames.length)]} ${lastNames[random(lastNames.length)]}`
const randomZipCode = () => zipCodes[random(zipCodes.length)]
const randomAge = () => 24+random(40)
const randomIncome = (age) => 31000+age*500+random(1000)*10-random(1000)*10

  const data = []

  for(let i=0;i<200;i++){
    const age = randomAge()
    data.push({
      income: randomIncome(age),
      name: randomName(),
      age: age,
      zipCode: randomZipCode(),
    })
  }

  const differencePoint = data[random(data.length)]
  const minIncome = Math.floor(differencePoint.income/10000)*10000

  const dataD = data.filter(row => row !== differencePoint)

  window.dp = {
    differencePoint: differencePoint,
    incomeGroup: {
      min: minIncome,
      max: minIncome+10000,
    },
    data: data,
    dataD: dataD,
  }

  renderAll({DataTable, SuccessRate, DataCubes, Literal, n: data.length, Cube, data, dataD})

</script>

<!--translate:ignore-->

# Eine erste Statistik

Eine der einfachsten Erkenntnisse, die wir aus unseren Daten gewinnen können ist die Verteilung der Einkommen der Personen im Datensatz. Hierzu bilden wir zunächst Einkommensgruppen. Beispielsweise kann eine Gruppe alle Datensätze enthalten die ein Einkommen zwischen 50-60 T€ aufweisen. Anschließend zählen wir die Anzahl der Datensätze in jeder Gruppe, was der statistischen Häufigkeit dieser Gruppe entspricht.

<!--translate:ignore-->
<div>
  \begin{equation}
  X = X_t = \sum\limits_{i=1}^N x_i
  \end{equation}
</div>
<!--translate:ignore-->

wobei $ x _ i = 1 $ falls das Einkommen des Datenpunktes $ i $ im Bereich der Einkommen aus Gruppe $ g $ liegt $ [E^g _ \mathrm{min}, E^g _ \mathrm{max}] $, und $ x _ i = 0 $ andernfalls:

<!--translate:ignore-->
<div>
  \begin{equation}
  x_i = \left\{\begin{array}{rcl}
  1 & , & E_i \in [E^g_\mathrm{min},E^g_\mathrm{max}] \\
  0 & , & E_i \notin [E^g_\mathrm{min},E^g_\mathrm{max}] \\
  \end{array}\right.
  \end{equation}
</div>
<!--translate:ignore-->

## Umsetzung in Code

<!--translate:ignore-->
<script type="module">

  {% set aggregate -%}
    // {{'intro.exact.calculate-frequencies'|translate}}
    const frequency = (d) => 
      d.filter(row => row.income >= incomeGroup.min
                   && row.income < incomeGroup.max).length
  {% endset -%}

  const { dp } = window;
  const { data, dataD, incomeGroup } = dp;

  {{aggregate}}

  // {{'intro.exact.store-value'|translate}}
  dp.exact = {
    count: frequency(data),
    countD: frequency(dataD),
  }

</script>
<!--translate:ignore-->

<!--translate:ignore-->
<div class="highlight">
{% filter highlight(language='javascript') %}
{{aggregate}}
{% endfilter %}
</div>
<!--translate:ignore-->

## Ergebnis

<!--translate:ignore-->
<div class="chart box" id="result-exact">
</div>
<script type="module">
  import { barChart } from '{{"js/plotting.js"|file}}';
  const { dp } = window;
  const left = Math.max(0, dp.exact.count - 20)
  const right = Math.max(0, dp.exact.count + 20)
  const values = []
  const ticks = []
  for(let i=left;i<=right;i++){
    values.push(0)
    ticks.push(i)
  }
  barChart("result-exact", [values], {xTicks: ticks,blocks: [{x: dp.exact.count, class: 'is-green'}, {x: dp.exact.countD, class: 'is-red'}], height: 20});
</script>
<!--translate:ignore-->

## Angriff auf die anonymisierten Daten

Ein Angreifer, der bis auf einen einzigen Wert $x _ j $ alle Datenwerte $x _ i$ kennt, kann aus dem Ergebnis $ X _ t $ leicht den fehlenden Wert $ x _ j $ berechnen:

<!--translate:ignore-->
<div>
  \begin{equation}
  x_j = X_t - \sum\limits_{i \ne j}^N x_i
  \end{equation}
</div>
<!--translate:ignore-->

<div data-render="SuccessRate({trials: 100, successes: 100})">
</div>

# Hinzufügen von Rauschen

Um solche Angriffe zu erschweren, könnten wir dem wahren Ergebniswert $X _ t$ einen Zufallswert $n$ hinzufügen: $ X = X _ t + n $. Dies erschwert dem Angreifer die Schätzung des Ursprungswertes $ x _ j $, denn er/sie kennt den hinzugefügten Zufallswert $ n $ nicht:

<!--translate:ignore-->
<div>
  \begin{equation}
  x_j = X - \sum\limits_{i \ne j}^N x_i - n
  \end{equation}
</div>
<!--translate:ignore-->

Allerdings gibt es immer noch Randfälle, bei denen solche verrauschten Daten Ursprungswerte preisgeben können. Hierzu ein Beispiel: Wir fügen dem Ergebnis von oben einen zufälligen Wert im Bereich $[-3, 3]$ hinzu. Wir wiederholen dies und tragen die Häufigkeit der beobachteten Werte auf. Wie vorher markieren grüne Balken das Ergebnis für den Datensatz $D$, und rote Balken das Ergebnis für den Datensatz $D'$.

<!--translate:ignore-->
<div class="chart box" id="result-with-noise">
</div>
<script type="module">
  import { FrequencyTable } from '{{"js/sites/intro.js"|file}}';
  import { render } from '{{"js/render.js"|file}}';
  import { barChart } from '{{"js/plotting.js"|file}}';
  import { random } from '{{"js/stats.js"|file}}';
  const { dp } = window;
  const left = Math.max(0, dp.exact.count - 20)
  const right = Math.max(0, dp.exact.count + 20)
  const values = []
  const valuesD = []
  const ticks = []
  for(let i=left;i<=right;i++){
    values.push(0)
    valuesD.push(0)
    ticks.push(i)
  }
  const N = 3
  setInterval(() => {
    let nv, nvD

    const r = () => {
      return random(7)-3
    }

    for(let i=0;i<10;i++){
      nv = r()+dp.exact.count
      values[nv-left] += 1
      nvD = r()+dp.exact.countD
      valuesD[nvD-left] += 1      
    }
    barChart("result-with-noise", [values, valuesD], {classNames: ['is-green', 'is-red'], xTicks: ticks,blocks: [{x: nv, class: 'is-green'}, {x: nvD, class: 'is-red'}], height: 200});
    render(document.getElementById('frequency-table'), FrequencyTable, {values: ticks, frequencies: values, frequenciesD: valuesD})
  }, 500);
</script>
<!--translate:ignore-->

Fällt Ihnen hier ein Problem auf? Nein? Dann schauen Sie mal auf die Ränder der Häufigkeitsverteilung: Durch Hinzufügen des Differenz-Datensatzes verschiebt sich die Wahrscheinlichkeitsverteilung maximal um den Betrag 1 nach rechts (falls der Datenpunkt Teil der betrachteten Gruppe ist). D.h. beobachtet ein Angreifer den Wert ganz rechts, weiß er/sie sofort, dass der gesuchte Datenpunkt in der Gruppe sein muss, und hat damit das Einkommen der Person aufgedeckt. Warum? Schauen wir uns dazu die Häufigkeiten an:

<div id="frequency-table">
</div>

Entscheidend für den Angreifer ist das Verhältnis der Wahrscheinlichkeiten der beobachteten Werte: Ist ein gegebener Wert in $ D $ und $ D' $ gleich wahrscheinlich, kann der Angreifer im Besten Fall nur raten, wie der Datenpunkt $ x _ j $ zu dem Ergebnis beigetragen hat. Je stärker jedoch das Verhältnis von einer von 1 abweicht, umso mehr Informationen liefert das beobachtete Ergebnis dem Angreifer. In dem obigen Fall beträgt die Wahrscheinlichkeit, dass ein Angreifer unsere Daten aufdeckt bei immerhin 25%!

Das heißt entscheidend für die Sicherheit unserer rauschbasierten Anonymisierung ist das minimale (oder maximale) Verhältnis der Wahrscheinlichkeiten für einen gegebenen Ergebniswert für die beiden Differenzdatensätze $ D $ und $ D' $:

<!--translate:ignore-->
<div>
\begin{equation}
\frac{\mathrm{P}(X = x|D)}{\mathrm{P}(X = x|D')}
\end{equation}
</div>
<!--translate:ignore-->

Um den schlimmstmöglichen Fall zu finden, müssen wir dieses Wahrscheinlichkeitsverhältnis über alle möglichen Ergebnismengen betrachten:

<!--translate:ignore-->
<div>
\begin{equation}
\alpha = \sup\limits_{x} \frac{\mathrm{P}(X = x|D)}{\mathrm{P}(X = x|D')}
\end{equation}
</div>
<!--translate:ignore-->

Je höher der Wert $\alpha$, umso mehr Informationen kann ein Angreifer im schlimmsten Fall aus einem beobachteten Ergebniswert ableiten. In der Praxis schreiben wir zusätzlich $\alpha = \exp{\epsilon}$, da es uns dies ermöglicht, den Privatsphäre-Verlust auch für komplexere Fälle abzuschätzen. Oft wollen wir nämlich nicht nur eine Statistik veröffentlichen, sondern gleiche mehrere. Z.B. könnten wir zu unseren Einkommensdaten einen Mittelwert, die oben betrachteten Häufigkeiten sowie Quantilwerte veröffentlichen. Jeder einzelne Datenpunkt würde dann zu allen dieser Werte beitragen. Dementsprechend müssen wir nicht nur das Wahrscheinlichkeitsverhältnis für einzelne Werte, sondern für alle Werte zusammen betrachten um eine Abschätzung des Privatsphäre-Verlustes zu erhalten. Geht unser Datenpunkt z.B. in zwei unterschiedliche Werte $X$ und $Y$ ein, könnte ein Angreifer wiederum die Wahrscheinlichkeiten für Wertekombinationen $(X, Y)$ betrachten. Falls die Werte $X$ und $Y$ unabhängig sind, gilt für ihre Wahrscheinlichkeiten

<!--translate:ignore-->
<div>
\begin{equation}
\frac{\mathrm{P}(X = x, Y = y|D)}{\mathrm{P}(X = x, Y = y|D')} = \frac{\mathrm{P}(X = x|D)}{\mathrm{P}(X = x|D')}\frac{\mathrm{P}(Y = x|D)}{\mathrm{P}(Y = x|D')} \le \alpha^2 = \exp{2\epsilon}
\end{equation}
</div>
<!--translate:ignore-->

, unter der Annahme, dass die beiden Wahrscheinlichkeitswerte jeweils DP mit Wert $\epsilon$ erfüllen. Für den Fall, dass die Werte $X$ und $Y$ nicht unabhängig sind, bleibt der Wert unter der Grenze (der Beweis hiervon ist allerdings etwas kompliziert). Der oben definierte Privatshpäre-Verlust ist somit additiv, was eine sehr nützliche Eigenschaft ist: Wissen wir, dass wir insgesamt $n$ Ergebnisse veröffentlichen wollen die auf einem Datenwert $x$ basieren, können wir den maximalen Privatsphäre-Verlust einfach als $n\cdot\epsilon$ abschätzen. Wir können somit ein **Privatsphäre-Budget** definieren, anhand dessen wir unsere Veröffentlichung planen können.

## Beispiel: Geometrischer Mechanismus

<!--translate:ignore-->
<script type="module">

  {% set geometricNoise -%}

const geometricNoise = (epsilon, symmetric) => {
  let p = Math.exp(-epsilon)
  let pv = Math.random()
  if (pv > p) {
    if (symmetric) {
      if (Math.random() > 0.5)
        return 0
    } else {
      return 0
    }
  }
  if (p < 1e-6) {
    return 0
  }
  pv = Math.random()
  let pe = 1.0 - p + p*pv
  let k = Math.floor(Math.log(1-pe)/Math.log(p))
  if (symmetric && Math.random() < 0.5) {
    return -k
  }
  return k
}
  {% endset -%}

  {{geometricNoise}}

  const frequencies = {}
  for(let i=0;i<10000;i++){
    let v = geometricNoise(0.5, true);
    if (frequencies[v] === undefined)
      frequencies[v] = 0;
    frequencies[v]++;
  }

  const { dp } = window;

  dp.geometricNoise = geometricNoise;

  const sf = Object.entries(frequencies).sort((a, b) => a[0]-b[0]);

  import { barChart } from '{{"js/plotting.js"|file}}';

  barChart("geometric-noise-example",
      [sf.map(s => s[1])],
      {xTicks: sf.map(s => s[0])});

</script>
<!--translate:ignore-->

<!--translate:ignore-->
<div class="highlight">
{% filter highlight(language='javascript') %}
{{geometricNoise}}
{% endfilter %}
</div>
<!--translate:ignore-->

<div class="chart box" id="geometric-noise-example">
</div>


<!--translate:ignore-->
<script type="module">
  import { FrequencyTable, SuccessRate, Epsilon } from '{{"js/sites/intro.js"|file}}';
  import { render } from '{{"js/render.js"|file}}';
  import { barChart } from '{{"js/plotting.js"|file}}';
  import { random } from '{{"js/stats.js"|file}}';
  const { dp } = window;
  const { geometricNoise } = dp;
  const left = Math.max(0, dp.exact.count - 20)
  const right = Math.max(0, dp.exact.count + 20)
  let values = []
  let valuesD = []
  let ticks = []
  let successes = 0
  let epsilon = 0.2
  let trials = 0

  const reset = () => {

    values = []
    valuesD = []
    ticks = []
    successes = 0
    trials = 0

    for(let i=left;i<=right;i++){
      values.push(0)
      valuesD.push(0)
      ticks.push(i)
    }

    window.tests = {
      epsilon: epsilon,
      values: values,
      valuesD: valuesD,
      ticks: ticks,
    }

  }

  window.epsilonChanged = (e) => {
    epsilon = e.target.value
    reset()
  }

  reset()

  const N = 3
  setInterval(() => {
    let nv, nvD, i, iD
    let n = 0
    while(true){
      nv = geometricNoise(epsilon, true)
      nvD = geometricNoise(epsilon, true)
      i = nv-left+dp.exact.count
      iD = nvD-left+dp.exact.countD 
      if (i < 0 || i >= values.length || iD < 0 || iD >= valuesD.length)
        continue // we do not count unplottable values
      values[i] += 1
      valuesD[iD] += 1
      trials++
      if (nv+dp.exact.count >= nvD + dp.exact.countD){
        // an attacker would estimate "yes" if the x > x', no otherwise
        successes++
      }
      if (n++ > 10)
        break
    }

    barChart("result-with-geometric-noise", [values, valuesD], {classNames: ['is-green', 'is-red'], xTicks: ticks,blocks: [{x: nv+dp.exact.count, class: 'is-green'}, {x: nvD+dp.exact.countD, class: 'is-red'}], height: 200});
    render(document.getElementById('frequency-table-geometric'), FrequencyTable, {values: ticks, frequencies: values, frequenciesD: valuesD, epsilon: epsilon})
    render(document.getElementById('success-rate'), SuccessRate, {trials: trials, successes: successes})
    render(document.getElementById('epsilon'), Epsilon, {epsilon: epsilon})
  }, 1000);
</script>
<!--translate:ignore-->

### Epsilon

Ändern Sie den Wert von $ \epsilon $, um ein Gefühl dafür zu bekommen, wie der Parameter die Genauigkeit der Ergebniswerte und die Erfolgswahrscheinlichkeit eines Angreifers beeinflusst. Generell gilt: Je kleiner $ \epsilon $, um so geringer ist der potentielle Privatsphäre-Verlust für Betroffene, aber umso höher ist die Standardabweichung der resultierenden Daten.

<!--translate:ignore-->
<input type="range" min="0.05" max="10.0" step="0.1" value="0.2" onChange="epsilonChanged(event)" /> <span id="epsilon" />
<div class="chart box" id="result-with-geometric-noise">
</div>

<div id="frequency-table-geometric">
</div>

<div id="success-rate">
</div>
<!--translate:ignore-->


# Sensitivität

In unserem Beispiel oben hat das Hinzufügen eines Datenpunktes zu unserem Datensatz das Ergebnis maximal um einen Betrag von 1 verändert (da wir Häufigkeiten berechnet haben). Was aber, wenn wir eine Funktion berechnen möchten, bei der ein einzelner Datenpunkt einen größeren Effekt auf das Ergebnis hat? Beispielsweise könnten wir am Mittelwert interessiert sein, der sich berechnet als

<!--translate:ignore-->
<div>
  \begin{equation}
  \bar{E} = \frac{1}{N}\sum\limits_{i=1}^N e_i
  \end{equation}
</div>
<!--translate:ignore-->

wobei $e _ i$ das jeweilige Einkommen einer Person ist. Wie stark ein einzelner Datenpunkt für diese Funktion das Ergebnis beeinflussen kann, hängt zum einen von dem möglichen Wertebereich (hier also der möglichen Gehaltsspanne) ab, als auch von der Anzahl der Datenpunkte $N$. Ist $e _ \mathrm{max}$ das maximal zu betrachtende Gehalt beträgt die **Sensitivität** des Mittelwertes $\bar{E}$ daher annäherungsweise

<!--translate:ignore-->
\begin{equation}
\delta f(\bar{E}) \approx \frac{e_\mathrm{max}}{N} - \hdots
\end{equation}
<!--translate:ignore-->

Unser Datensatz hat <span data-render="Literal(n)"></span> Einträge. Legen wir ein maximales Einkommen von 100.000 € zu Grunde, beträgt die Sensitivität damit angenähert $\delta f(\bar{E}) = $ <span data-render="Literal(Math.floor(100000/n))"></span>. Um den Mittelwert mithilfe von Differential Privacy zu schützen bräuchten wir eigentlich einen anderen Mechanismus, da der Wert reel ist und der geometrische Mechanismus nur auf diskrete Daten angewandt werden kann. Wir können jedoch den Mittelwert diskretisieren, um ihn mit dem Mechanismus verarbeiten zu können. Wählen wir das Diskretisierungsintervall identisch zur Sensitivität $\delta f$, brauchen wir unseren Mechanismus oben nicht zu modifizieren. Wollen wir eine größere Genauigkeit, müssen wir den Mechanismus entsprechend anpassen.

<!--translate:ignore-->
<script type="module">

  {% set mean -%}
// {{'intro.exact.calculate-mean'|translate}}
const mean = (d, min, max) => {
  if (d.length === 0)
    throw 'empty list received'
  let m = 0
  d.forEach(row => {
    if (row.income < min || row.income > max)
      throw 'out of bounds value detected'
    m += row.income
  })
  return m/d.length
}
  {% endset -%}

    const { dp } = window;
    const { data, dataD, incomeGroup } = dp;

    {{mean}}

    dp.exact = {
      ...dp.exact,
      mean: mean(data),
      meanD: mean(dataD),
    }
</script>
<!--translate:ignore-->


<!--translate:ignore-->
<div class="highlight">
{% filter highlight(language='javascript') %}
{{mean}}
{% endfilter %}
</div>
<!--translate:ignore-->

# Testen von DP-Mechanismen

<script type="module">

  import { render } from '{{"js/render.js"|file}}';
  import { barChart } from '{{"js/plotting.js"|file}}';

  setInterval(() => {
    const testStatistic = [];
    const { tests } = window;
    console.log(tests)
    const { values, valuesD, ticks } = tests;
    for(let i=0;i<values.length;i++){
      let ratio = values[i]/valuesD[i]
      if (ratio < 1.0)
        ratio = 1.0/ratio
      ratio /= Math.exp(tests.epsilon)
      if (isNaN(ratio) || !isFinite(ratio))
        testStatistic.push(0)
      else
        testStatistic.push(ratio)
    }
    barChart("test-statistic", [testStatistic], {hLines: [{y: 1.0, width: 3, color: '#000', style: 'dotted'}], xTicks: ticks, height: 200});    
  }, 1000)
</script>

<div class="chart box" id="test-statistic">
</div>
