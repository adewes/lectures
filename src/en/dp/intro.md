# Introduction

<script>
  translations = {{site.translations.intro|tojson}};
  language = '{{lang}}'
</script>


# Our data

In the following, we use sample data describing the income of different individuals.

<div id="table" data-render="DataTable([...this.data.slice(0,10),{name: '...', income: '...'}])">
</div>

In the following, we represent individual records as individual blocks.

<div style="display: flex; flex-direction: row;">

<div style="margin-right: 10px;">

  <h2>{{'intro.d.title'|translate}}</h2>

  <div style="margin-left: 10px;" id="cubes-d" data-render="DataCubes({data,
color: 'red'})">
  </div>
</div>

<div>

  <h2>{{'intro.dp.title'|translate}}</h2>

  <div id="cubes-dp" data-render="DataCubes({data: dataD,
color: 'green'})">
  </div>
</div>

</div>



# Data set $ D' $

The data set $ D' $ is identical to the data set $ D $ except for a single remote data point <span data-render="Cube({color: 'red', size: 'xs'})"></span>. In the following, we call this remote data point the difference point.



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



# A first statistic

One of the simplest insights we can gain from our data is the distribution of the incomes of the individuals in the dataset. To do this, we first form income groups. For example, a group may contain all records that have an income between 50-60k€. We then count the number of records in each group, which corresponds to the statistical frequency of that group.

<div>
  \begin{equation}
  X_g = \sum\limits_{i=1}^N x_i
  \end{equation}
</div>


Where $ x _ i = 1 $ if the income of the data point $ i $ is in the range of income from group $ g $ $ [E^g _ \mathrm{min}, E^g _ \mathrm{max}] $ , and $ x _ i = 0 $ otherwise:

<div>
  \begin{equation}
  x_i = \left\{\begin{array}{rcl}
  1 & , & E_i \in [E^g_\mathrm{min},E^g_\mathrm{max}] \\
  0 & , & E_i \notin [E^g_\mathrm{min},E^g_\mathrm{max}] \\
  \end{array}\right.
  \end{equation}
</div>


## Conversion to code

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


<div class="highlight">
{% filter highlight(language='javascript') %}
{{aggregate}}
{% endfilter %}
</div>


## Result

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


## Attack on the anonymized data

An attacker who knows all data values $x _ i$ except for a single value $x _ j $ can easily calculate the missing value $ x _ j $ from the result $ X _ g $:

<div>
  \begin{equation}
  x_j = X_g - \sum\limits_{i \ne j}^N x_i
  \end{equation}
</div>


<div data-render="SuccessRate({trials: 100, successes: 100})">
</div>

# Adding noise

To make such attacks more difficult, we could add a random value $n$ to the result value $X_g$: $ X _ g' = X _ g + n $. This makes it difficult for the attacker to estimate the original value $ x _ j $, because he/she does not know the added random value $ n $:

<div>
  \begin{equation}
  x_j = X_g' - \sum\limits_{i \ne j}^N x_i - n
  \end{equation}
</div>


However, there are still edge cases where such noisy data can reveal origin values. Here is an example: We add a random value in the range $[-3, 3]$ to the result from above. We repeat this and plot the frequency of the observed values. As before, green bars mark the result for the data set $D$, and red bars mark the result for the data set $D'$.

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


Do you notice a problem here? No? Then take a look at the edges of the frequency distribution: By adding the difference data set, the probability distribution shifts to the right by a maximum amount of 1 (if the data point is part of the group under consideration). I.e., if an attacker observes the value on the far right, he/she immediately knows that the data point they are looking for must be in the group, and has thus uncovered the person's income. Why? Let's look at the frequencies for this:

<div id="frequency-table">
</div>

Crucial for the attacker is the ratio of the probabilities of the observed values: If a given value in $ D $ and $ D' $ is equally likely, the attacker can at best only guess how the data point $ x _ j $ contributed to the result. However, the more the ratio of one differs from 1, the more information the observed result provides to the attacker. In the above case, the probability that an attacker will uncover our data is still 25%!

That is, crucial to the security of our noise-based anonymization is the minimum (or maximum) ratio of the probabilities for a given outcome value for the two difference datasets $ D $ and $ D' $:

<div>
\begin{equation}
\frac{\mathrm{P}(X_g = x|D)}{\mathrm{P}(X_g = x|D')}
\end{equation}
</div>


To find the worst possible case, we need to consider this likelihood ratio over all possible outcome sets:

<div>
\begin{equation}
\alpha = \sup\limits_{x} \frac{\mathrm{P}(X_g = x|D)}{\mathrm{P}(X_g = x|D')}
\end{equation}
</div>


The higher the value $\alpha$, the more information an attacker can derive from an observed result value in the worst case. In practice, we additionally write $\alpha = \exp{\epsilon}$, as this allows us to estimate the privacy loss even for more complex cases. Indeed, we often do not want to publish only one statistic, but equal several. For example, we might publish a mean, the frequencies considered above, and quantile values for our income data. Each individual data point would then contribute to all of these values. Accordingly, we need to consider not only the likelihood ratio for individual values, but for all values together to obtain an estimate of the privacy loss. For example, if our data point goes into two different values $X _ g $ and $Y _ g$, an attacker could again look at the probabilities for combinations of values $(X _ g, Y _ g)$. If the values $X _ g$ and $ Y _ g$ are independent, then their probabilities are

<div>
\begin{equation}
\frac{\mathrm{P}(X_g = x, Y_g = y|D)}{\mathrm{P}(X_g = x, Y_g = y|D')} = \frac{\mathrm{P}(X_g = x|D)}{\mathrm{P}(X_g = x|D')}\frac{\mathrm{P}(Y_g = x|D)}{\mathrm{P}(Y_g = x|D')} \le \alpha^2 = \exp{2\epsilon}
\end{equation}
</div>


assuming that the two probability values satisfy DP with value $\epsilon$ respectively. In the case that the values $X _ g $ and $ Y _ g $ are not independent, the value remains below the bound (the proof of this is a bit complicated, though). The privacy loss defined above is thus additive, which is a very useful property: if we know that we want to publish a total of $n$ results based on a data value $x$, we can easily estimate the maximum privacy loss as $n\cdot\epsilon$. We can thus define a **privacy budget** against which we can plan our publication.

## Example: Geometric mechanism

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


<div class="highlight">
{% filter highlight(language='javascript') %}
{{geometricNoise}}
{% endfilter %}
</div>


<div class="chart box" id="geometric-noise-example">
</div>


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


### Epsilon

Change the value of $ \epsilon $ to get a sense of how the parameter affects the accuracy of the result values and the likelihood of success for an attacker. In general, the smaller $ \epsilon $, the lower the potential privacy loss for victims, but the higher the standard deviation of the resulting data.

<input type="range" min="0.05" max="10.0" step="0.1" value="0.2" onChange="epsilonChanged(event)" /> <span id="epsilon" />
<div class="chart box" id="result-with-geometric-noise">
</div>

<div id="frequency-table-geometric">
</div>

<div id="success-rate">
</div>



# Sensitivity

In our example above, adding a data point to our data set changed the result by at most an amount of 1 (since we were calculating frequencies). But what if we want to calculate a function where a single data point has a larger effect on the result? For example, we might be interested in the mean, which is calculated as

<div>
  \begin{equation}
  \bar{E} = \frac{1}{N}\sum\limits_{i=1}^N e_i
  \end{equation}
</div>


where $e _ i$ is the respective income of a person. The extent to which a single data point for this function can influence the result depends on the one hand on the possible range of values (in this case the possible salary range), and on the other hand on the number of data points $N$. If $e _ \mathrm{max}$ is the maximum salary to be considered, the **sensitivity of** the mean value $\bar{E}$ is therefore

\begin{equation}
\mathcal{S}(\bar{E}) = \frac{e_\mathrm{max}}{N}
\end{equation}


Our dataset has <span data-render="Literal(n)"></span> entries. If we assume a maximum income of 100,000 €, the sensitivity is $\mathcal{S}(\bar{E}) = $ <span data-render="Literal(Math.floor(100000/n))"></span>. To protect the mean using differential privacy, we would actually need a different mechanism, since the value is reel and the geometric mechanism can only be applied to discrete data. However, we can discretize the mean to be able to process it using the mechanism. If we choose the discretization interval identical to the sensitivity $\mathcal{S}$, we do not need to modify our mechanism above. If we want greater accuracy, we need to modify the mechanism accordingly.

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



<div class="highlight">
{% filter highlight(language='javascript') %}
{{mean}}
{% endfilter %}
</div>


# Further topics

## Testing DP mechanisms

<script type="module">

  import { render } from '{{"js/render.js"|file}}';
  import { barChart } from '{{"js/plotting.js"|file}}';

  setInterval(() =&gt; {
    const testStatistic = [];
    const { tests } = window;
    console.log(tests)
    const { values, valuesD, ticks } = tests;
    for(let i=0;i&lt;values.length;i++){
      let ratio = valuesi/valuesDi
      if (ratio &lt; 1.0)
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

## Attacking DP mechanisms

## 
