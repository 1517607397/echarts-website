(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{337:function(e,n,t){"use strict";t.r(n),n.default="# Dataset\n\n`dataset` is a component dedicated to manage data. Although you can set the data in `series.data` for every series, we recommend you use the `dataset` to manage the data since ECharts 4 so that the data can be reused by multiple components and convenient for the separation of \"data and configs\". After all, data is the most common part to be changed while other configurations will mostly not change at runtime.\n\n## Define **data** under **series**\n\nIf data is defined under `series`, for example:\n\n```js live\noption = {\n  xAxis: {\n    type: 'category',\n    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']\n  },\n  yAxis: {},\n  series: [\n    {\n      type: 'bar',\n      name: '2015',\n      data: [89.3, 92.1, 94.4, 85.4]\n    },\n    {\n      type: 'bar',\n      name: '2016',\n      data: [95.8, 89.4, 91.2, 76.9]\n    },\n    {\n      type: 'bar',\n      name: '2017',\n      data: [97.7, 83.1, 92.5, 78.1]\n    }\n  ]\n};\n```\n\nDefining `data` under `series` is suitable for customization for some special data structures such as \"tree\", \"graph\" and large data.\nHowever, it is not conducive to the data sharing for multiple series as well as mapping arrangement of chart types and series based on the original data. The other disadvantage is that programmers always need to divide the data in separate series (and categories) first.\n\n## Define **data** in **dataset**\n\nHere are the advantages if you define `data` in `dataset`:\n\n- Follow the ideas of data visualization: (I) Provide the data, (II)Mapping from data to visual to become a chart.\n- Divide data from other configurations. The data often change but others not. It is\n  Easy to manage separately.\n- Data can be reused by several series or component, you don't need to create copies of a large amount of data for every series.\n- Support more common data format, such as a 2D array, array of classes, etc., to avoid users from converting for data format to a certain extent.\n\nHere is a simple `dataset` example:\n\n```js live\noption = {\n  legend: {},\n  tooltip: {},\n  dataset: {\n    // Provide a set of data.\n    source: [\n      ['product', '2015', '2016', '2017'],\n      ['Matcha Latte', 43.3, 85.8, 93.7],\n      ['Milk Tea', 83.1, 73.4, 55.1],\n      ['Cheese Cocoa', 86.4, 65.2, 82.5],\n      ['Walnut Brownie', 72.4, 53.9, 39.1]\n    ]\n  },\n  // Declare an x-axis (category axis).\n  // The category map the first column in the dataset by default.\n  xAxis: { type: 'category' },\n  // Declare a y-axis (value axis).\n  yAxis: {},\n  // Declare several 'bar' series,\n  // every series will auto-map to each column by default.\n  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]\n};\n```\n\nOr try to use the \"array of classes\" format:\n\n```js live\noption = {\n  legend: {},\n  tooltip: {},\n  dataset: {\n    // Define the dimension of array. In cartesian coordinate system,\n    // if the type of x-axis is category, map the first dimension to\n    // x-axis by default, the second dimension to y-axis.\n    // You can also specify 'series.encode' to complete the map\n    // without specify dimensions. Please see below.\n\n    dimensions: ['product', '2015', '2016', '2017'],\n    source: [\n      { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },\n      { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },\n      { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },\n      { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }\n    ]\n  },\n  xAxis: { type: 'category' },\n  yAxis: {},\n  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]\n};\n```\n\n## Map from Data to Chart\n\nThe ideas of data visualization: (I) Provide the data, (II)Mapping from data to visual to become a chart.\n\nIn short, you can set these configs of mapping:\n\n- Specify 'column' or 'row' of `dataset` to map the `series`. You can use [series.seriesLayoutBy](${optionPath}series.seriesLayoutBy) to configure it. The default is to map according to the column.\n- Rule of specifying dimension mapping: how to mapping from dimensions of 'dataset' to `axis`, `tooltip`, `label` and `visualMap`. To configure the mapping, please use [series.encode](${optionPath}series.encode) and [visualMap](${optionPath}visualMap). The previous case did not give the mapping configuration so that ECharts will follow the default: if x-axis is category, mapping to the first row in `dataset.source`; three-column chart mapping with each row in `dataset.source` one by one.\n\nThe details of the configuration are shown below:\n\n## Map Row or Column of **dataset** to **series**\n\nHaving the dataset, you can configure flexibly how the data map to the axis and series.\n\nYou can use `seriesLayoutBy` to change the understanding of row and column of the chart. `seriesLayoutBy` can be:\n\n- `'column'`: Default value. The series are placed above the column of `dataset`.\n- `'row'`: The series are placed above the row of `dataset`.\n\nCheck this case:\n\n```js live\noption = {\n  legend: {},\n  tooltip: {},\n  dataset: {\n    source: [\n      ['product', '2012', '2013', '2014', '2015'],\n      ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],\n      ['Milk Tea', 86.5, 92.1, 85.7, 83.1],\n      ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]\n    ]\n  },\n  xAxis: [\n    { type: 'category', gridIndex: 0 },\n    { type: 'category', gridIndex: 1 }\n  ],\n  yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],\n  grid: [{ bottom: '55%' }, { top: '55%' }],\n  series: [\n    // These series will show in the first coordinate, each series map a row in dataset.\n    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },\n    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },\n    { type: 'bar', seriesLayoutBy: 'row', xAxisIndex: 0, yAxisIndex: 0 },\n    // These series will show in the second coordinate, each series map a column in dataset.\n    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },\n    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },\n    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 },\n    { type: 'bar', seriesLayoutBy: 'column', xAxisIndex: 1, yAxisIndex: 1 }\n  ]\n};\n```\n\nThe effect of configuration is shown in [this case](${exampleEditorPath}dataset-series-layout-by).\n\n## Dimension\n\nMost of the data described in commonly used charts is a \"two-dimensional table\" structure, in the previous case, we use a 2D array to contain a two-dimensional table. Now, when we map a series to a column, that column was called a \"dimension\" and each row was called \"item\", vice versa.\n\nThe dimension can have their name to display in the chart. Dimension name can be defined in the first column (row). In the previous case, `'score'`, `'amount'`, `'product'` are the name of dimensions. The actual data locate from the second row. ECharts will automatically check if the first column (row) contained dimension name in `dataset.source`. You can also use `dataset.sourceHeader: true` to declare that the first column (row) represents the dimension name.\n\nTry to use single `dataset.dimensions` or some `series.dimensions` to define the dimensions, therefore you can specify the name and type together.\n\n```js\nvar option1 = {\n  dataset: {\n    dimensions: [\n      { name: 'score' },\n      // can be abbreviated as 'string', to indicate dimension name 。\n      'amount',\n      // Specify dimensions in 'type'.\n      { name: 'product', type: 'ordinal' }\n    ],\n    source: []\n  }\n  // ...\n};\n\nvar option2 = {\n  dataset: {\n    source: []\n  },\n  series: {\n    type: 'line',\n    // series.dimensions will cover the config in dataset.dimension\n    dimensions: [\n      null, // use null if you do not want dimension name.\n      'amount',\n      { name: 'product', type: 'ordinal' }\n    ]\n  }\n  // ...\n};\n```\n\nIn most cases, you don't need to define the dimension type because the ECharts will automatically judge it. If the judgment is inaccurate, you can define it manually.\n\nDimension type can be the following values:\n\n- `'number'`: Default, normal data.\n- `'ordinal'`: String types data like categories, text can be used on the axis only with the dimension type 'ordinal'. ECharts will try to judge this type automatically but might be inaccurate, so you can specify manually.\n- `'time'`: To represent time data, ECharts can automatically analyze data as timestamp if the dimension type is defined as `'time'`. For instance, ECharts will auto-analyze if the data of this dimension is '2017-05-10'. If the dimension is used as time axis ([axis.type](${optionPath}xAxis.type) = `'time'`), the dimension type will also be `'time'`. See [data](${optionPath}series.data) for more time type support.\n- `'float'`: Use `TypedArray` to optimize the performance in `'float'` dimension.\n- `'int'`: Use `TypedArray` to optimize the performance in `'int'` dimension.\n\n## Map from Data to Charts (series.encode)\n\nAfter understand the concept of dimension, you can use [series.encode](${optionPath}series.encode) to make a mapping:\n\n```js live\nvar option = {\n  dataset: {\n    source: [\n      ['score', 'amount', 'product'],\n      [89.3, 58212, 'Matcha Latte'],\n      [57.1, 78254, 'Milk Tea'],\n      [74.4, 41032, 'Cheese Cocoa'],\n      [50.1, 12755, 'Cheese Brownie'],\n      [89.7, 20145, 'Matcha Cocoa'],\n      [68.1, 79146, 'Tea'],\n      [19.6, 91852, 'Orange Juice'],\n      [10.6, 101852, 'Lemon Juice'],\n      [32.7, 20112, 'Walnut Brownie']\n    ]\n  },\n  xAxis: {},\n  yAxis: { type: 'category' },\n  series: [\n    {\n      type: 'bar',\n      encode: {\n        // Map \"amount\" column to x-axis.\n        x: 'amount',\n        // Map \"product\" row to y-axis.\n        y: 'product'\n      }\n    }\n  ]\n};\n```\n\nThe basic structure of `series.encode` declaration:\n\n- To the left of the colon: Specific name of axis or label.\n- To the right of the colon: Dimension name (string) or number(int, count from 0), to specify one or several dimensions (using array).\n\nGenerally, the following info is not necessary to be defined. Fill in as needed.\n\nAttribute suggested by `series.encode`\n\n```js\n// Supported in every coordinate and series:\nencode: {\n  // Display the value of dimension named \"product\" and \"score\" in tooltip.\n  tooltip: ['product', 'score']\n  // Connect dimension name of \"Dimension 1\" and \"Dimension 3\" as the series name. (Avoid to repeat longer names in series.name)\n  seriesName: [1, 3],\n  // Means to use the value in \"Dimension 2\" as the id. It makes the new and old data correspond by id\n\t// when using setOption to update data, so that it can show animation properly.\n  itemId: 2,\n  // The itemName will show in the legend of Pie Charts.\n  itemName: 3\n}\n\n// Grid/cartesian coordinate unique configs:\nencode: {\n  // Map \"Dimension 1\", \"Dimension 5\" and \"dimension named 'score'\" to x-axis:\n  x: [1, 5, 'score'],\n  // Map \"Dimension 0\" to y-axis:\n  y: 0\n}\n\n// singleAxis unique configs:\nencode: {\n  single: 3\n}\n\n// Polar coordinate unique configs:\nencode: {\n  radius: 3,\n  angle: 2\n}\n\n// Geo-coordinate unique configs:\nencode: {\n  lng: 3,\n  lat: 2\n}\n\n// For some charts without coordinate like pie chart, funnel chart:\nencode: {\n  value: 3\n}\n```\n\nThis is a richer [example](${exampleEditorPath}dataset-encode1) of `series.encode`.\n\n## Default series.encode\n\nIt is worth mentioning that ECharts will use some default mapping rules for some general charts (line, bar, scatter, candlestick, etc.) if `series.encode` is not specified. The default rule is:\n\n- In coordinate system (e.g. Cartesian, Polar):\n  - If there is category axis ([axis.type](${optionPath}xAxis.type) = `'category'`), map the first column(row) to the axis and each subsequent column(row) to each series.\n  - If both axes is not the category, then map every two columns in one series to two axes.\n- Without axis (e.g. Pie Chart):\n  - Use the first column(row) as the name, second column(row) as value. ECharts will not set the name if there is only one column(row).\n\nWhile the default rule cannot fulfill the requirements, you can configure `encode` by yourself, which is not complicate. Here is an [example](${exampleEditorPath}dataset-default).\n\n## Some Normal Settings of series.encode\n\nQ: How to set the 3rd column as x-axis, 5th column as y-axis?\n\nA:\n\n```js\noption = {\n  series: {\n    // dimensionIndex count from 0, so the 3rd line is dimensions[2].\n    encode: { x: 2, y: 4 }\n    // ...\n  }\n};\n```\n\nQ: How to set the 3rd row as x-axis, 5th row as y-axis?\n\nA:\n\n```js\noption = {\n  series: {\n    encode: { x: 2, y: 4 },\n    seriesLayoutBy: 'row'\n    // ...\n  }\n};\n```\n\nQ: How to set the 2nd column as a label?\n\nA:\nWe now support to trace value from specific dimension for [label.formatter](${optionPath}series.label.formatter):\n\n```js\nseries: {\n  label: {\n    // `'{@score}'` means the value in the dimension named \"score\".\n    // `'{@[4]}'` means the value in dimension 4.\n    formatter: 'aaa{@product}bbb{@score}ccc{@[4]}ddd';\n  }\n}\n```\n\nQ: How to show the 2nd and 3rd column in the tooltip?\n\nA:\n\n```js\noption = {\n  series: {\n    encode: {\n      tooltip: [1, 2]\n      // ...\n    }\n    // ...\n  }\n};\n```\n\nQ: How to define the dimension name if is not included in the dataset?\n\nA:\n\n```js\nvar option = {\n  dataset: {\n    dimensions: ['score', 'amount'],\n    source: [\n      [89.3, 3371],\n      [92.1, 8123],\n      [94.4, 1954],\n      [85.4, 829]\n    ]\n  }\n};\n```\n\nQ: How to map the 3rd column to the size of the scatter chart?\n\nA:\n\n```js live\nvar option = {\n  dataset: {\n    source: [\n      [12, 323, 11.2],\n      [23, 167, 8.3],\n      [81, 284, 12],\n      [91, 413, 4.1],\n      [13, 287, 13.5]\n    ]\n  },\n  visualMap: {\n    show: false,\n    dimension: 2, // means the 3rd column\n    min: 2, // lower bound\n    max: 15, // higher bound\n    inRange: {\n      // Size of the bubble.\n      symbolSize: [5, 60]\n    }\n  },\n  xAxis: {},\n  yAxis: {},\n  series: {\n    type: 'scatter'\n  }\n};\n```\n\nQ: I specified a mapping in encode, why it is not worked?\n\nA: Check your spelling, such as misspell the dimension name `'Life Expectancy'` to `'Life Expectency'` in encode.\n\n## Visual Channel Mapping\n\nWe can map visual channel by using [visualMap](${optionPath}visualMap). Check details in the [visualMap](${optionPath}visualMap) document. Here is an [example](${exampleEditorPath}dataset-encode0).\n\n## Formats of Charts\n\nIn most of the normal chart, the data is suitable to be described in the form of a two-dimensional table. That well-known software like 'MS Excel' and 'Numbers' all uses a two-dimensional table. Their data can be exported to JSON format and input to `dataset.source` and avoid some steps of data processing.\n\n> You can switch .csv file to JSON using tools like [dsv](https://github.com/d3/d3-dsv) or [PapaParse](https://github.com/mholt/PapaParse).\n\nAs the example shown behind, in the data transmission of JavaScript, the two-dimensional data can be stored directly by two-dimensional array.\n\nExpect from the two-dimensional array, the dataset also supports using key-value which is also a common way. However, we don't support [seriesLayoutBy](${optionPath}series.seriesLayoutBy) in this format right now.\n\n```js\ndataset: [\n  {\n    // column by column key-value array is a normal format\n    source: [\n      { product: 'Matcha Latte', count: 823, score: 95.8 },\n      { product: 'Milk Tea', count: 235, score: 81.4 },\n      { product: 'Cheese Cocoa', count: 1042, score: 91.2 },\n      { product: 'Walnut Brownie', count: 988, score: 76.9 }\n    ]\n  },\n  {\n    // row by row key-value\n    source: {\n      product: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],\n      count: [823, 235, 1042, 988],\n      score: [95.8, 81.4, 91.2, 76.9]\n    }\n  }\n];\n```\n\n## How to Reference Several Datasets\n\nECharts support to define several datasets at the same moment. Series can assign the one to reference by [series.datasetIndex](${optionPath}series.datasetIndex). For example:\n\n```js\nvar option = {\n  dataset: [\n    {\n      // 1st Dataset\n      source: []\n    },\n    {\n      // 2nd Dataset\n      source: []\n    },\n    {\n      // 3rd Dataset。\n      source: []\n    }\n  ],\n  series: [\n    {\n      // Use 2nd dataset\n      datasetIndex: 1\n    },\n    {\n      // Use 1st dataset\n      datasetIndex: 0\n    }\n  ]\n};\n```\n\n## series.data in ECharts 3\n\nECharts 4 still supports the data declaration way in ECharts 3. If the series has already declared the [series.data](${optionPath}series.data), then use [series.data](${optionPath}series.data) but not `dataset`.\n\n```js\noption = {\n  xAxis: {\n    type: 'category',\n    data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']\n  },\n  yAxis: {},\n  series: [\n    {\n      type: 'bar',\n      name: '2015',\n      data: [89.3, 92.1, 94.4, 85.4]\n    },\n    {\n      type: 'bar',\n      name: '2016',\n      data: [95.8, 89.4, 91.2, 76.9]\n    },\n    {\n      type: 'bar',\n      name: '2017',\n      data: [97.7, 83.1, 92.5, 78.1]\n    }\n  ]\n};\n```\n\nIn fact, [series.data](${optionPath}series.data) is an important setting method which will always exist. Some special non-table format chart like [treemap](${optionPath}series-treemap), [graph](${optionPath}series-graph) and [lines](${optionPath}series-lines) still cannot be edit in dataset, you still need to use [series.data](${optionPath}series.data). In another way, for render huge amount of data (over a million), you need to use [appendData](${mainSitePath}api.html#echartsInstance.appendData) which is not supported by `dataset`.\n\n## Others\n\nThe following charts now support dataset:\n`line`, `bar`, `pie`, `scatter`, `effectScatter`, `parallel`, `candlestick`, `map`, `funnel`, `custom`.\nECharts will support more charts in the future.\n\nIn the end, here is an [example](${exampleEditorPath}dataset-link) of several charts shared one `dataset` with linkage interaction.\n"}}]);