# Einführung

<!--translate:ignore-->
<script>
  translations = {{site.translations.intro|tojson}};
  language = '{{lang}}'
</script>
<!--translate:ignore-->

# Unsere Daten

Im folgenden nutzen wir Beispieldaten, die das Einkommen verschiedener Personen beschreiben.

<div id="table" data-render="DataTable([...this.data.slice(0,10),{name: '...', income: '...'}])">
</div>

Generell repräsentieren wir Daten im Folgenden als einzelne Blöcke. Ein roter Block <span data-render="Cube({color: 'red', size: 'xs'})"></span> repräsentiert vertrauliche, personenbezogene Daten. Ein grüner Block <span data-render="Cube({color: 'green', size: 'xs'})"></span> hingegen anonyme oder aggregierte Daten ohne vermeintlichen Personenbezug.


<div id="cubes" data-render="DataCubes(data)">
</div>

<!--translate:ignore-->

<script type="module">
  import { renderAll } from '{{"js/render.js"|file}}';
  import { random } from '{{"js/stats.js"|file}}';
  import { DataTable, DataCubes, Cube, ResultBoxes } from '{{"js/sites/intro.js"|file}}';
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

  window.dp = {
    differencePoint: differencePoint,
    incomeGroup: {
      min: minIncome,
      max: minIncome+10000,
    },
    data: data,
    dataD: data.filter(row => row !== differencePoint)
  }

  renderAll({DataTable, DataCubes, Cube, ResultBoxes, data})

</script>

<!--translate:ignore-->

# Eine erste Statistik

Eine der einfachsten Erkenntnisse, die wir aus unseren Daten gewinnen können ist die Verteilung der Einkommen der Personen im Datensatz. Hierzu bilden wir zunächst Einkommensgruppen. Beispielsweise kann eine Gruppe alle Datensätze enthalten die ein Einkommen zwischen 50-60 T€ aufweisen. Anschließend zählen wir die Anzahl der Datensätze in jeder Gruppe, was der statistischen Häufigkeit dieser Gruppe entspricht.

<!--translate:ignore-->
<div>
  \begin{equation}
  X_g = \sum\limits_{i=1}^N x_i
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
    const { dp } = window;
    const { data, dataD, incomeGroup } = dp;
    // {{'intro.exact.calculate-frequencies'|translate}}
    const frequency = (d) => 
      d.filter(row => row.income >= incomeGroup.min
                   && row.income < incomeGroup.max).length
    // {{'intro.exact.store-value'|translate}}
    dp.exact = {
      count: frequency(data),
      countD: frequency(dataD),
    }
  {% endset -%}

  {{aggregate}}
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
  barChart("result-exact", [values], {xTicks: ticks,blocks: [{x: dp.exact.count, class: 'is-green'}, {x: dp.exact.countD, class: 'is-red'}], height: 50});
</script>
<!--translate:ignore-->

## Angriff auf die anonymisierten Daten

Ein Angreifer, der bis auf einen einzigen Wert $x _ j $ alle Datenwerte $x _ i$ kennt, kann aus dem Ergebnis $ X _ g $ leicht den fehlenden Wert $ x _ j $ berechnen:

<!--translate:ignore-->
<div>
  \begin{equation}
  x_j = X_g - \sum\limits_{i \ne j}^N x_i
  \end{equation}
</div>
<!--translate:ignore-->

# Hinzufügen von Rauschen

Um solche Angriffe zu erschweren, könnten wir dem Ergebniswert $X_g$ einen Zufallswert $n$ hinzufügen: $ X _ g' = X _ g + n $. Dies erschwert dem Angreifer die Schätzung des Ursprungswertes $ x _ j $, denn er/sie kennt den hinzugefügten Zufallswert $ n $ nicht:

<!--translate:ignore-->
<div>
  \begin{equation}
  x_j = X_g' - \sum\limits_{i \ne j}^N x_i - n
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

Entscheidend für den Angreifer ist das Verhältnis der Wahrscheinlichkeiten der beobachteten Werte: Ist ein gegebener Wert in $ D $ und $ D' $ gleich wahrscheinlich, kann der Angreifer im Besten Fall nur raten, wie der Datenpunkt $ x _ j $ zu dem Ergebnis beigetragen hat. Je stärker jedoch das Verhältnis von einer von 1 abweicht, umso mehr Informationen liefert das beobachtete Ergebnis dem Angreifer.

Das heißt entscheidend für die Sicherheit unserer rauschbasierten Anonymisierung ist das minimale (oder maximale) Verhältnis der Wahrscheinlichkeiten für einen gegebenen Ergebniswert für die beiden Differenzdatensätze $ D $ und $ D' $:

<!--translate:ignore-->
<div>
\begin{equation}
\frac{\mathrm{P}(X_g = x|D)}{\mathrm{P}(X_g = x|D')}
\end{equation}
</div>
<!--translate:ignore-->

Um den schlimmstmöglichen Fall zu finden, müssen wir dieses Wahrscheinlichkeitsverhältnis über alle möglichen Ergebnismengen betrachten:

<!--translate:ignore-->
<div>
\begin{equation}
\alpha = \sup\limits_{x} \frac{\mathrm{P}(X_g = x|D)}{\mathrm{P}(X_g = x|D')}
\end{equation}
</div>
<!--translate:ignore-->

Je höher der Wert $\alpha$, umso mehr Informationen kann ein Angreifer im schlimmsten Fall aus einem beobachteten Ergebniswert ableiten. In der Praxis schreiben wir zusätzlich $\alpha = \exp{\epsilon}$, da es uns dies ermöglicht, den Privatsphäre-Verlust auch für komplexere Fälle abzuschätzen. Oft wollen wir nämlich nicht nur eine Statistik veröffentlichen, sondern gleiche mehrere. Z.B. könnten wir zu unseren Einkommensdaten einen Mittelwert, die oben betrachteten Häufigkeiten sowie Quantilwerte veröffentlichen. Jeder einzelne Datenpunkt würde dann zu allen dieser Werte beitragen. Dementsprechend müssen wir nicht nur das Wahrscheinlichkeitsverhältnis für einzelne Werte, sondern für alle Werte zusammen betrachten um eine Abschätzung des Privatsphäre-Verlustes zu erhalten. Geht unser Datenpunkt z.B. in zwei unterschiedliche Werte $X _ g $ und $Y _ g$ ein, könnte ein Angreifer wiederum die Wahrscheinlichkeiten für Wertekombinationen $(X _ g, Y _ g)$ betrachten. Falls die Werte $X _ g$ und $ Y _ g$ unabhängig sind, gilt für ihre Wahrscheinlichkeiten

<!--translate:ignore-->
<div>
\begin{equation}
\frac{\mathrm{P}(X_g = x, Y_g = y|D)}{\mathrm{P}(X_g = x, Y_g = y|D')} = \frac{\mathrm{P}(X_g = x|D)}{\mathrm{P}(X_g = x|D')}\frac{\mathrm{P}(Y_g = x|D)}{\mathrm{P}(Y_g = x|D')} \le \alpha^2 = \exp{2\epsilon}
\end{equation}
</div>
<!--translate:ignore-->

, unter der Annahme, dass die beiden Wahrscheinlichkeitswerte jeweils DP mit Wert $\epsilon$ erfüllen. Für den Fall, dass die Werte $X _ g $ und $ Y _ g $ nicht unabhängig sind, bleibt der Wert unter der Grenze (der Beweis hiervon ist allerdings etwas kompliziert). Der oben definierte Privatshpäre-Verlust ist somit additiv, was eine sehr nützliche Eigenschaft ist: Wissen wir, dass wir insgesamt $n$ Ergebnisse veröffentlichen wollen die auf einem Datenwert $x$ basieren, können wir den maximalen Privatsphäre-Verlust einfach als $n\cdot\epsilon$ abschätzen. Wir können somit ein **Privatsphäre-Budget** definieren, anhand dessen wir unsere Veröffentlichung planen können.

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

  {% endset -%}

  {{geometricNoise}}
</script>
<!--translate:ignore-->

<!--translate:ignore-->
<div class="highlight">
{% filter highlight(language='javascript') %}
{{geometricNoise}}
{% endfilter %}
</div>
<!--translate:ignore-->

<div class="chart sick box" id="geometric-noise-example">
</div>


<!--translate:ignore-->
<div class="chart box" id="result-with-geometric-noise">
</div>
<script type="module">
  import { FrequencyTable } from '{{"js/sites/intro.js"|file}}';
  import { render } from '{{"js/render.js"|file}}';
  import { barChart } from '{{"js/plotting.js"|file}}';
  import { random } from '{{"js/stats.js"|file}}';
  const { dp } = window;
  const { geometricNoise } = dp;
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
  const epsilon = 1.0
  setInterval(() => {
    let nv, nvD
    for(let i=0;i<100;i++){
      nv = geometricNoise(epsilon, true)+dp.exact.count
      values[nv-left] += 1
      nvD = geometricNoise(epsilon, true)+dp.exact.countD
      valuesD[nvD-left] += 1      
    }
    barChart("result-with-geometric-noise", [values, valuesD], {classNames: ['is-green', 'is-red'], xTicks: ticks,blocks: [{x: nv, class: 'is-green'}, {x: nvD, class: 'is-red'}], height: 200});
    render(document.getElementById('frequency-table-geometric'), FrequencyTable, {values: ticks, frequencies: values, frequenciesD: valuesD, epsilon: epsilon})
  }, 1000);
</script>
<!--translate:ignore-->

<div id="frequency-table-geometric">
</div>

# Sensitivität

