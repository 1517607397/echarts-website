window.__EC_DOC_api_echartsInstance = {"group":{"desc":"<p>Group name to be used in chart <a href=\"#echarts.connect\">connection</a>.</p>\n"},"setOption":{"desc":"<pre><code class=\"lang-ts\">(option: Object, notMerge?: boolean, lazyUpdate?: boolean)\nor\n(option: Object, opts?: {\n    notMerge?: boolean;\n    replaceMerge?: string | string[];\n    lazyUpdate?: boolean;\n})\n</code></pre>\n<p>Configuration item, data, universal interface, all parameters and data can all be modified through <code class=\"codespan\">setOption</code>. ECharts will merge new parameters and data, and then refresh chart. If <a href=\"option.html#animation\" target=\"_blank\">animation</a> is enabled, ECharts will find the difference between two groups of data and present data changes through proper animation.</p>\n<p><strong>For example: </strong></p>\n<iframe data-src=\"https://echarts.apache.org/examples/en/view.html?c=dynamic-data&reset=1&edit=1\" width=\"500\" height=\"400\" ></iframe>\n\n\n<p><strong>Attention: </strong> Setting configuration item using <code class=\"codespan\">addData</code> and <code class=\"codespan\">setSeries</code> of ECharts 2.x are no longer supported. <code class=\"codespan\">setOption</code> is used for all these cases in ECharts 3. Please refer to the above example.</p>\n<p><strong>Parameters</strong></p>\n<p>Usage:</p>\n<pre><code class=\"lang-ts\">chart.setOption(option, notMerge, lazyUpdate);\n</code></pre>\n<p>or</p>\n<pre><code class=\"lang-ts\">chart.setOption(option, {\n    notMerge: ...,\n    lazyUpdate: ...,\n    silent: ...\n});\n</code></pre>\n<p>or</p>\n<pre><code class=\"lang-ts\">chart.setOption(option, {\n    replaceMerge: [&#39;xAxis&#39;, &#39;yAxis&#39;, &#39;series&#39;]\n});\n</code></pre>\n<ul>\n<li><p><code class=\"codespan\">option</code>: <code class=\"codespan\">ECOption</code></p>\n<p>  Configuration item and data. Please refer to <a href=\"option.html\" target=\"_blank\">configuration item manual</a> for more information.</p>\n</li>\n<li><p>opts</p>\n<ul>\n<li><p><code class=\"codespan\">notMerge</code> Optional. Whether not to merge with previous <code class=\"codespan\">option</code>. <code class=\"codespan\">false</code> by default, means merge, see more details in <strong>Component Merging Modes</strong>. If <code class=\"codespan\">true</code>, all of the current components will be removed and new components will be created according to the new <code class=\"codespan\">option</code>.</p>\n</li>\n<li><p><code class=\"codespan\">replaceMerge</code> Optional. Users can specify &quot;component main types&quot; here, which are the properties under the root of the option tree in <a href=\"option.html\" target=\"_blank\">configuration item manual</a> (e.g., <code class=\"codespan\">xAxis</code>, <code class=\"codespan\">series</code>). The specified types of component will be merged in the mode &quot;replaceMerge&quot;. If users intending to remove some part of components, <code class=\"codespan\">replaceMerge</code> can be used. See more details in <strong>Component Merging Modes</strong>.</p>\n</li>\n<li><p><code class=\"codespan\">lazyUpdate</code> Opional. Whether not to update chart immediately. <code class=\"codespan\">false</code> by default, stating update chart synchronously. If <code class=\"codespan\">true</code>, the chart will be updated in the next animation frame.</p>\n</li>\n<li><p><code class=\"codespan\">silent</code> Optional. Whether not to prevent triggering events when calling <code class=\"codespan\">setOption</code>. <code class=\"codespan\">false</code> by default, stating trigger events.</p>\n</li>\n</ul>\n</li>\n</ul>\n<h4>Component Merging Modes</h4>\n\n<p>Within a specific type of components (more accurately, &quot;component main type&quot;. e.g., <code class=\"codespan\">xAxis</code>, <code class=\"codespan\">series</code>):</p>\n<ul>\n<li>If <code class=\"codespan\">opts.notMerge</code> is set as <code class=\"codespan\">true</code>, the old components will be totally removed and the new component will be created by the incoming <code class=\"codespan\">option</code>.</li>\n<li>If <code class=\"codespan\">opts.notMerge</code> is set as <code class=\"codespan\">false</code> or not specified:<ul>\n<li>If this component main type is included in <code class=\"codespan\">opts.replaceMerge</code>, these components will be merged in mode <code class=\"codespan\">Replace Merge</code>.</li>\n<li>Otherwise, these components will be merged in mode <code class=\"codespan\">Normal Merge</code>.</li>\n</ul>\n</li>\n</ul>\n<p>What is <code class=\"codespan\">Normal Merge</code> and <code class=\"codespan\">Replace Merge</code>?</p>\n<h5>Normal Merge</h5>\n\n<p>Within a specific component main type (e.g., <code class=\"codespan\">xAxis</code>, <code class=\"codespan\">series</code>), each single &quot;component description&quot; (i.e., like <code class=\"codespan\">{type: &#39;xAxis&#39;, id: &#39;xx&#39;, name: &#39;kk&#39;, ...}</code>) in the incoming <code class=\"codespan\">option</code> will be mapped and merged into the existing components one by one if possible. Otherwise create new component on the tail of the list. The detailed rule is as follows:</p>\n<ul>\n<li>For each single &quot;component description&quot; that has <code class=\"codespan\">id</code> or <code class=\"codespan\">name</code> specified in <code class=\"codespan\">option</code>, firstly find and merge to existing components that has the same <code class=\"codespan\">id</code> or <code class=\"codespan\">name</code> if possible.</li>\n<li>Then for each remaining single &quot;component description&quot;, find and merge to remaining existing components if possible.</li>\n<li>Create new components for the remaining &quot;component descriptions&quot; at the tail.</li>\n</ul>\n<p>Features:</p>\n<ul>\n<li>No existing component will be removed. Only add and update are supported in this mode.</li>\n<li>The index of component(componentIndex) will never be changed.</li>\n<li>If no <code class=\"codespan\">id</code> and <code class=\"codespan\">name</code> specified in <code class=\"codespan\">option</code> (this is a common case), components can be simply merged intuitively according to where they appear in <code class=\"codespan\">option</code>.</li>\n</ul>\n<p>Example:</p>\n<pre><code class=\"lang-ts\">// Existing components:\n{\n    xAxis: [\n        { id: &#39;m&#39;, interval: 5 },\n        { id: &#39;n&#39;, name: &#39;nnn&#39;, interval: 6 }\n        { id: &#39;q&#39;, interval: 7 }\n    ]\n}\n// Incoming option:\nchart.setOption({\n    xAxis: [\n        // No id given. Will be merged to the first unmatched existing component `id: &#39;q&#39;`\n        { interval: 77 },\n        // No id given. Will create new component\n        { interval: 88 },\n        // No id given but name given. Will be merged to `name: &#39;nnn&#39;`\n        { name: &#39;nnn&#39;, interval: 66 },\n        // id given. Will be merged to `id: &#39;m&#39;`.\n        { id: &#39;m&#39;, interval: 55 }\n    ]\n});\n// Result components:\n{\n    xAxis: [\n        { id: &#39;m&#39;, interval: 55 },\n        { id: &#39;n&#39;, name: &#39;nnn&#39;, interval: 66 },\n        { id: &#39;q&#39;, interval: 77 },\n        { interval: 88 }\n    ]\n}\n</code></pre>\n<h5><code class=\"codespan\">Replace Merge</code></h5>\n\n<p>Within a specific component main type (e.g., <code class=\"codespan\">xAxis</code>, <code class=\"codespan\">series</code>), only the existing components that has its <code class=\"codespan\">id</code> declared in the incoming <code class=\"codespan\">option</code> will be kept, other existing components will be removed or replaced with new created component. the detailed rule is as follows:</p>\n<ul>\n<li>Firstly Find and merge to existing components that has the same <code class=\"codespan\">id</code> in <code class=\"codespan\">option</code> if possible.</li>\n<li>Remove the remaining unmatched existing components. (In fact, set to <code class=\"codespan\">null</code> in the component list to make sure there is no change of the indices of the components that not be removed).</li>\n<li>Create new components for the remaining &quot;component descriptions&quot;, and put them on the places that have been free or appended to the tail.</li>\n</ul>\n<p>Features:</p>\n<ul>\n<li>Enable to remove some of the components, which is not supported in <code class=\"codespan\">Normal Merge</code>.</li>\n<li>The indices of the existing components will never be modified. This is to ensure that the existing references by index still works (e.g., <code class=\"codespan\">xAxisIndex: 2</code>).</li>\n<li>After replace merged, there might be some &quot;hole&quot;, that is, there is no component at some index (because the original component is removed). But this is expectable and controllable by users.</li>\n</ul>\n<p>Example:</p>\n<pre><code class=\"lang-ts\">// Existing components:\n{\n    xAxis: [\n        { id: &#39;m&#39;, interval: 5, min: 1000 },\n        { id: &#39;n&#39;, name: &#39;nnn&#39;, interval: 6, min: 1000 }\n        { id: &#39;q&#39;, interval: 7, min: 1000 }\n    ]\n}\n// Incoming option:\nchart.setOption({\n    xAxis: [\n        { interval: 111 },\n        // id given. Will be merged to the existing `id: &#39;q&#39;`.\n        { id: &#39;q&#39;, interval: 77 },\n        // id given, but can not find in the existing components.\n        { id: &#39;t&#39;, interval: 222 },\n        { interval: 333 }\n    ]\n}, { replaceMerge: &#39;xAxis&#39; });\n// Result components:\n{\n    xAxis: [\n        // The original component { id: &#39;m&#39; } has been removed\n        // and replaced to this new component. So `min: 1000` is discarded.\n        { interval: 111 },\n        // The original component { id: &#39;n&#39; } has been removed\n        // and replaced to this new component. So `min: 1000` is discarded.\n        { id: &#39;t&#39;, interval: 222 },\n        // The original component has been merged with this new component.\n        // So `min: 1000` is kept.\n        { id: &#39;q&#39;, interval: 77, min: 1000 },\n        { interval: 333 }\n    ]\n}\n</code></pre>\n<h5>Remove Component</h5>\n\n<p>There are two ways to remove components:</p>\n<ul>\n<li>Totally removal: use <code class=\"codespan\">notMerge: true</code>, all of the components will be removed.</li>\n<li>Partially removal: use <code class=\"codespan\">replaceMerge: [...]</code>, the specified types of components will be removed if no id matched. This mode is useful to keep the state (e.g., highlight / animation / selected area) of the other components while make removal.</li>\n</ul>\n"},"getWidth":{"desc":"<pre><code class=\"lang-ts\">() =&gt; number\n</code></pre>\n<p>Gets width of ECharts instance container.</p>\n"},"getHeight":{"desc":"<pre><code class=\"lang-ts\">() =&gt; number\n</code></pre>\n<p>Gets height of ECharts instance container.</p>\n"},"getDom":{"desc":"<pre><code class=\"lang-ts\">() =&gt; HTMLCanvasElement|HTMLDivElement\n</code></pre>\n<p>Gets DOM element of ECharts instance container.</p>\n"},"getOption":{"desc":"<pre><code class=\"lang-ts\">() =&gt; Object\n</code></pre>\n<p>Gets <code class=\"codespan\">option</code> object maintained in current instance, which contains configuration item and data merged from previous <code class=\"codespan\">setOption</code> operations by users, along with user interaction states. For example, switching of legend, zooming area of data zoom, and so on. Therefore, a new instance that is exactly the same can be recovered from this option.</p>\n<p><strong>Attention: </strong>Attribute values in each component of the returned option are all in the form of an array, no matter it&#39;s single object or array of object when passed by <code class=\"codespan\">setOption</code>.\nFor example:</p>\n<pre><code class=\"lang-ts\">{\n    title: [{...}],\n    legend: [{...}],\n    grid: [{...}]\n}\n</code></pre>\n<p>Besides, the following style is <strong>not recommended</strong>:</p>\n<pre><code class=\"lang-ts\">var option = myChart.getOption();\noption.visualMap[0].inRange.color = ...;\nmyChart.setOption(option);\n</code></pre>\n<p>This is because <code class=\"codespan\">getOption</code> contains merged values which could be default values, and may overlaps future values. So, we <strong>recommend</strong> the following style when update part of configuration.</p>\n<pre><code class=\"lang-ts\">myChart.setOption({\n    visualMap: {\n        inRange: {\n            color: ...\n        }\n    }\n})\n</code></pre>\n"},"resize":{"desc":"<pre><code class=\"lang-ts\">(opts?: {\n    width?: number|string,\n    height?: number|string,\n    silent?: boolean,\n    animation?: {\n        duration?: number\n        easing?: string\n    }\n}) =&gt; ECharts\n</code></pre>\n<p>Resizes chart, which should be called manually when container size changes.</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><p><code class=\"codespan\">opts</code></p>\n<p>  Optional. Which may contain:</p>\n<ul>\n<li><p><code class=\"codespan\">width</code> Specify width explicitly, in pixel. If setting to <code class=\"codespan\">null</code>/<code class=\"codespan\">undefined</code>/<code class=\"codespan\">&#39;auto&#39;</code>, width of <code class=\"codespan\">dom</code> (instance container) will be used.</p>\n</li>\n<li><p><code class=\"codespan\">height</code> Specify height explicitly, in pixel. If setting to <code class=\"codespan\">null</code>/<code class=\"codespan\">undefined</code>/<code class=\"codespan\">&#39;auto&#39;</code>, height of <code class=\"codespan\">dom</code> (instance container) will be used.</p>\n</li>\n<li><p><code class=\"codespan\">silent</code> Specify whether or not to prevent triggering events.</p>\n</li>\n<li><p><code class=\"codespan\">animation</code> Whether to apply transition animation when resize, including <code class=\"codespan\">duration</code> and <code class=\"codespan\">easing</code>, the default <code class=\"codespan\">duration</code> is 0, that is, no transition animation is applied.</p>\n</li>\n</ul>\n</li>\n</ul>\n<p><strong>Tip:</strong></p>\n<p>Sometimes charts may be placed in multiple tabs. Those in hidden labels may fail to initialize due to the ignorance of container width and height. So <code class=\"codespan\">resize</code> should be called manually to get the correct width and height when switching to the corresponding tabs, or specify width/height in <code class=\"codespan\">opts</code> explicitly.</p>\n"},"renderToSVGString":{"desc":"<blockquote>\n<p>Since <code class=\"codespan\">5.3.0</code></p>\n</blockquote>\n<pre><code class=\"lang-ts\">(opts?: {\n    useViewBox?: boolean\n}) =&gt; string\n</code></pre>\n<p>Render to a SVG string. Available when setting <code class=\"codespan\">renderer: &#39;svg&#39;</code> to use SVG rendering mode.</p>\n<p>Must use this method to render if server-side rendering is enabled with the <code class=\"codespan\">ssr</code> parameter in <code class=\"codespan\">echarts.init</code></p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><p><code class=\"codespan\">opts</code></p>\n<ul>\n<li><code class=\"codespan\">useViewBox</code> Whether to add <a href=\"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox\" target=\"_blank\">viewBox</a> in the generated SVG string</li>\n</ul>\n</li>\n</ul>\n"},"dispatchAction":{"desc":"<pre><code class=\"lang-ts\">(payload: Object)\n</code></pre>\n<p>Triggers chart action, like chart switch <code class=\"codespan\">legendToggleSelect</code>,zoom data area <code class=\"codespan\">dataZoom</code>, show tooltip <code class=\"codespan\">showTip</code> and so on. See <a href=\"#action\">action</a> and <a href=\"#events\">events</a> for more information.</p>\n<p><code class=\"codespan\">payload</code> parameter can trigger multiple actions through <code class=\"codespan\">batch</code> attribute.</p>\n<p><strong>Attention: </strong>In ECharts 2.x, triggering chart actions has a long operation path like <code class=\"codespan\">myChart.component.tooltip.showTip</code>, which may also involve with internal component organization. So, <code class=\"codespan\">dispatchAction</code> is used in this case in ECharts 3.</p>\n<p><strong>For example</strong></p>\n<pre><code class=\"lang-ts\">myChart.dispatchAction({\n    type: &#39;dataZoom&#39;,\n    start: 20,\n    end: 30\n});\n// Multiply actions can be dispatched through batch parameter\nmyChart.dispatchAction({\n    type: &#39;dataZoom&#39;,\n    batch: [{\n        // first dataZoom component\n        start: 20,\n        end: 30\n    }, {\n        // second dataZoom component\n        dataZoomIndex: 1,\n        start: 10,\n        end: 20\n    }]\n})\n</code></pre>\n"},"on":{"desc":"<pre><code class=\"lang-ts\">(\n    eventName: string,\n    handler: Function,\n    context?: Object\n)\n(\n    eventName: string,\n    query: string|Object,\n    handler: Function,\n    context?: Object\n)\n</code></pre>\n<p>Binds event-handling function.</p>\n<p>There are two kinds of events in ECharts, one of which is mouse events, which will be triggered when the mouse clicks certain element in the chart, the other kind will be triggered after <a href=\"#echartsInstance.dispatchAction\">dispatchAction</a> is called. Every action has a corresponding event. Please refer to <a href=\"#action\">action</a> and <a href=\"#events\">events</a> for more information.</p>\n<p>If event is triggered externally by <a href=\"#echartsInstance.dispatchAction\">dispatchAction</a>, and there is batch attribute in action to trigger batch action, then the corresponding response event parameters be in batch.</p>\n<p><strong>Parameters</strong></p>\n<ul>\n<li><p><code class=\"codespan\">eventName</code></p>\n<p>  Event names are all in lower-cases, for example, <code class=\"codespan\">&#39;click&#39;</code>, <code class=\"codespan\">&#39;mousemove&#39;</code>, <code class=\"codespan\">&#39;legendselected&#39;</code></p>\n<p>  <strong>Attention: </strong> ECharts 2.x uses attributes like <code class=\"codespan\">CLICK</code> in <code class=\"codespan\">config</code> object as event name. In ECharts 3, lower-case strings are used as event name to align with DOM events.</p>\n</li>\n<li><p><code class=\"codespan\">query</code></p>\n<p>  Condition for filtering, optional. <code class=\"codespan\">query</code> enables only call handlers on graphic elements of specified components. Can be <code class=\"codespan\">string</code> or <code class=\"codespan\">Object</code>.</p>\n<p>  If <code class=\"codespan\">string</code>, the formatter can be &#39;mainType&#39; or &#39;mainType.subType&#39;. For example:</p>\n<pre><code class=\"lang-ts\">  chart.on(&#39;click&#39;, &#39;series&#39;, function () {...});\n  chart.on(&#39;click&#39;, &#39;series.line&#39;, function () {...});\n  chart.on(&#39;click&#39;, &#39;xAxis.category&#39;, function () {...});\n</code></pre>\n<p>  If <code class=\"codespan\">Object</code>, one or more properties below can be included, and any of them is optional.</p>\n<pre><code class=\"lang-ts\">  {\n      &lt;mainType&gt;Index: number // component index\n      &lt;mainType&gt;Name: string // component name\n      &lt;mainType&gt;Id: string // component id\n      dataIndex: number // data item index\n      name: string // data item name\n      dataType: string // data item type, e.g.,\n                       // &#39;node&#39; and &#39;edge&#39; in graph.\n      element: string // element name in custom series\n  }\n</code></pre>\n<p>  For example:</p>\n<pre><code class=\"lang-ts\">  chart.setOption({\n      // ...\n      series: [{\n          name: &#39;uuu&#39;\n          // ...\n      }]\n  });\n  chart.on(&#39;mouseover&#39;, {seriesName: &#39;uuu&#39;}, function () {\n      // When the graphic elements in the series with name &#39;uuu&#39; mouse overed, this method is called.\n  });\n</code></pre>\n<p>  For example:</p>\n<pre><code class=\"lang-ts\">  chart.setOption({\n      // ...\n      series: [{\n          // ...\n      }, {\n          // ...\n          data: [\n              {name: &#39;xx&#39;, value: 121},\n              {name: &#39;yy&#39;, value: 33}\n          ]\n      }]\n  });\n  chart.on(&#39;mouseover&#39;, {seriesIndex: 1, name: &#39;xx&#39;}, function () {\n      // When the graphic elements of the data item with name &#39;xx&#39; in the series with index 1 mouse overed, this method is called.\n  });\n</code></pre>\n<p>  For example:</p>\n<pre><code class=\"lang-ts\">  chart.setOption({\n      // ...\n      series: [{\n          type: &#39;graph&#39;,\n          nodes: [{name: &#39;a&#39;, value: 10}, {name: &#39;b&#39;, value: 20}],\n          edges: [{source: 0, target: 1}]\n      }]\n  });\n  chart.on(&#39;click&#39;, {dataType: &#39;node&#39;}, function () {\n      // When the nodes of the graph clicked, this method is called.\n  });\n  chart.on(&#39;click&#39;, {dataType: &#39;edge&#39;}, function () {\n      // When the edges of the graph clicked, this method is called.\n  });\n</code></pre>\n<p>  For example:</p>\n<pre><code class=\"lang-ts\">  chart.setOption({\n      // ...\n      series: {\n          // ...\n          type: &#39;custom&#39;,\n          renderItem: function (params, api) {\n              return {\n                  type: &#39;group&#39;,\n                  children: [{\n                      type: &#39;circle&#39;,\n                      name: &#39;my_el&#39;,\n                      // ...\n                  }, {\n                      // ...\n                  }]\n              }\n          },\n          data: [[12, 33]]\n      }\n  })\n  chart.on(&#39;click&#39;, {targetName: &#39;my_el&#39;}, function () {\n      // When the element with name &#39;my_el&#39; clicked, this method is called.\n  });\n</code></pre>\n</li>\n<li><p><code class=\"codespan\">handler</code></p>\n<p>  Event-handling function, whose format is as following:</p>\n<pre><code class=\"lang-ts\">(event: Object)\n</code></pre>\n</li>\n<li><p><code class=\"codespan\">context</code></p>\n<p>  Optional; context of callback function, what <code class=\"codespan\">this</code> refers to.</p>\n</li>\n</ul>\n"},"off":{"desc":"<pre><code class=\"lang-ts\">(eventName: string, handler?: Function)\n</code></pre>\n<p>Unbind event-handler function.</p>\n<p><strong>parameter: </strong></p>\n<ul>\n<li><p><code class=\"codespan\">eventName</code></p>\n<p>  Event name.</p>\n</li>\n<li><p><code class=\"codespan\">handler</code></p>\n<p>  Optional. The function to be unbound could be passed. Otherwise, all event functions of this type will be unbound.</p>\n</li>\n</ul>\n"},"convertToPixel":{"desc":"<pre><code class=\"lang-ts\">(\n    // finder is used to indicate in which coordinate system conversion is performed.\n    // Generally, index or id or name can be used to specify coordinate system.\n    finder: {\n        seriesIndex?: number,\n        seriesId?: string,\n        seriesName?: string,\n        geoIndex?: number,\n        geoId?: string,\n        geoName?: string,\n        xAxisIndex?: number,\n        xAxisId?: string,\n        xAxisName?: string,\n        yAxisIndex?: number,\n        yAxisId?: string,\n        yAxisName?: string,\n        gridIndex?: number,\n        gridId?: string,\n        gridName?: string\n    },\n    // The value to be converted.\n    value: Array|string\n    // Conversion result, in pixel coordinate system, where the origin ([0, 0])\n    // is on the left-top of the main dom of echarts instance.\n) =&gt; Array|string\n</code></pre>\n<p>Convert a point from logical coordinate (e.g., in geo, cartesian, graph, ...) to pixel coordinate.</p>\n<p>For example:</p>\n<p>In <a href=\"option.html#geo\" target=\"_blank\">geo</a> coordinate system, convert a point from latlong to pixel coordinate:</p>\n<pre><code class=\"lang-ts\">// [128.3324, 89.5344] represents [longitude, latitude].\n// Perform conversion in the first geo coordinate system:\nchart.convertToPixel(&#39;geo&#39;, [128.3324, 89.5344]); // The parameter &#39;geo&#39; means {geoIndex: 0}.\n// Perform conversion in the second geo coordinate system:\nchart.convertToPixel({geoIndex: 1}, [128.3324, 89.5344]);\n// Perform conversion in the geo coordinate system with id &#39;bb&#39;:\nchart.convertToPixel({geoId: &#39;bb&#39;}, [128.3324, 89.5344]);\n</code></pre>\n<p>In cartesian (see <a href=\"option.html#grid\" target=\"_blank\">grid</a>), convert a point to pixel coordinate:</p>\n<pre><code class=\"lang-ts\">// [300, 900] means [value on xAxis, value on yAxis].\n// Notice, there might be more than one xAxis or yAxis in a grid, and each a pair of\n// xAxis-yAxis constitudes a cartesian.\n// Perform conversion in the cartesian consist of the third xAxis and the yAxis with id &#39;y1&#39;.\nchart.convertToPixel({xAxisIndex: 2, yAxisId: &#39;y1&#39;}, [300, 900]);\n// Perform conversion in the first cartesian of the grid with id &#39;g1&#39;.\nchart.convertToPixel({gridId: &#39;g1&#39;}, [300, 900]);\n</code></pre>\n<p>Convert a axis value to pixel value:</p>\n<pre><code class=\"lang-ts\">// In the xAxis with id &#39;x0&#39;, convert value 3000 to the horizontal pixel coordinate:\nchart.convertToPixel({xAxisId: &#39;x0&#39;}, 3000); // A number will be returned.\n// In the second yAxis, convert value 600 to the vertical pixel coordinate:\nchart.convertToPixel({yAxisIndex: 1}, 600); // A number will be returned.\n</code></pre>\n<p>In <a href=\"option.html#series-graph\" target=\"_blank\">graph</a>, convert a point to pixel coordinate:</p>\n<pre><code class=\"lang-ts\">// Since every graph series maintains a coordinate system for itself, we\n// specify the graph series in finder.\nchart.convertToPixel({seriesIndex: 0}, [2000, 3500]);\nchart.convertToPixel({seriesId: &#39;k2&#39;}, [100, 500]);\n</code></pre>\n<p>In a cooridinate system (cartesian, geo, graph, ...) that contains the given series, convert a point to pixel coordinate:</p>\n<pre><code class=\"lang-ts\">// Perform convert in the coordinate system that contains the first series.\nchart.convertToPixel({seriesIndex: 0}, [128.3324, 89.5344]);\n// Perform convert in the coordinate system that contains the series with id &#39;k2&#39;.\nchart.convertToPixel({seriesId: &#39;k2&#39;}, [128.3324, 89.5344]);\n</code></pre>\n"},"convertFromPixel":{"desc":"<pre><code class=\"lang-ts\">(\n    // finder is used to indicate in which coordinate system conversion is performed.\n    // Generally, index or id or name can be used to specify coordinate system.\n    finder: {\n        seriesIndex?: number,\n        seriesId?: string,\n        seriesName?: string,\n        geoIndex?: number,\n        geoId?: string,\n        geoName?: string,\n        xAxisIndex?: number,\n        xAxisId?: string,\n        xAxisName?: string,\n        yAxisIndex?: number,\n        yAxisId?: string,\n        yAxisName?: string,\n        gridIndex?: number,\n        gridId?: string,\n        gridName?: string\n    },\n    // The value to be converted, in pixel coordinate system, where the origin ([0, 0])\n    // is on the left-top of the main dom of echarts instance.\n    value: Array|string\n    // Conversion result\n) =&gt; Array|string\n</code></pre>\n<p>Convert a point from pixel coordinate to logical coordinate (e.g., in geo, cartesian, graph, ...). This method is the inverse operation of <a href=\"#echartsInstance.convertToPixel\">convertToPixel</a>, where the examples can be referred.</p>\n"},"containPixel":{"desc":"<pre><code class=\"lang-ts\">(\n    // finder is used to specify coordinate systems or series on which the judgement performed.\n    // Generally, index or id or name can be used to specify coordinate system.\n    finder: {\n        seriesIndex?: number,\n        seriesId?: string,\n        seriesName?: string,\n        geoIndex?: number,\n        geoId?: string,\n        geoName?: string,\n        xAxisIndex?: number,\n        xAxisId?: string,\n        xAxisName?: string,\n        yAxisIndex?: number,\n        yAxisId?: string,\n        yAxisName?: string,\n        gridIndex?: number,\n        gridId?: string,\n        gridName?: string\n    },\n    // The value to be judged, in pixel coordinate system, where the origin ([0, 0])\n    // is on the left-top of the main dom of echarts instance.\n    value: Array\n) =&gt; boolean\n</code></pre>\n<p>Determine whether the given point is in the given coordinate systems or series.</p>\n<p>These coordinate systems or series are supported currently: <a href=\"option.html#grid\" target=\"_blank\">grid</a>, <a href=\"option.html#polar\" target=\"_blank\">polar</a>, <a href=\"option.html#geo\" target=\"_blank\">geo</a>, <a href=\"option.html#series-map\" target=\"_blank\">series-map</a>, <a href=\"option.html#series-graph\" target=\"_blank\">series-graph</a>, <a href=\"option.html#series-pie\" target=\"_blank\">series-pie</a>.</p>\n<p>For example:</p>\n<pre><code class=\"lang-ts\">// Determine whether point [23, 44] is in the geo whose geoIndex 0.\nchart.containPixel(&#39;geo&#39;, [23, 44]); // Parameter &#39;geo&#39; means {geoIndex: 0}\n// Determine whether point [23, 44] is in the grid whose gridId is &#39;z&#39;.\nchart.containPixel({gridId: &#39;z&#39;}, [23, 44]);\n// Determine whether point [23, 44] is in series whose index are 1, 4 or 5.\nchart.containPixel({seriesIndex: [1, 4, 5]}, [23, 44]);\n// Determine whether point [23, 44] is in series whose index are 1, 4 or 5,\n// or is in grid whose name is &#39;a&#39;.\nchart.containPixel({seriesIndex: [1, 4, 5], gridName: &#39;a&#39;}, [23, 44]);\n</code></pre>\n"},"showLoading":{"desc":"<pre><code class=\"lang-ts\">(type?: string, opts?: Object)\n</code></pre>\n<p>Shows loading animation. You can call this interface manually before data is loaded, and call <a href=\"#echartsInstance.hideLoading\">hideLoading</a> to hide loading animation after data is loaded.</p>\n<p><strong>parameter: </strong></p>\n<ul>\n<li><p><code class=\"codespan\">type</code></p>\n<p>  Optional; type of loading animation; only <code class=\"codespan\">&#39;default&#39;</code> is supported by far.</p>\n</li>\n<li><p><code class=\"codespan\">opts</code></p>\n<p>  Optional; configuration item of loading animation, which is related to <code class=\"codespan\">type</code>. Following shows the available configuration items and their default values:</p>\n<pre><code class=\"lang-ts\">default: {\n  text: &#39;loading&#39;,\n  color: &#39;#c23531&#39;,\n  textColor: &#39;#000&#39;,\n  maskColor: &#39;rgba(255, 255, 255, 0.8)&#39;,\n  zlevel: 0,\n\n  // Font size. Available since `v4.8.0`.\n  fontSize: 12,\n  // Show an animated &quot;spinner&quot; or not. Available since `v4.8.0`.\n  showSpinner: true,\n  // Radius of the &quot;spinner&quot;. Available since `v4.8.0`.\n  spinnerRadius: 10,\n  // Line width of the &quot;spinner&quot;. Available since `v4.8.0`.\n  lineWidth: 5,\n  // Font thick weight. Available since `v5.0.1`.\n  fontWeight: &#39;normal&#39;,\n  // Font style. Available since `v5.0.1`.\n  fontStyle: &#39;normal&#39;,\n  // Font family. Available since `v5.0.1`.\n  fontFamily: &#39;sans-serif&#39;\n}\n</code></pre>\n</li>\n</ul>\n"},"hideLoading":{"desc":"<p>Hides animation loading effect.</p>\n"},"getDataURL":{"desc":"<pre><code class=\"lang-ts\">(opts: {\n    // Exporting format, can be png, jpg, svg.\n    // NOTE: png, jpg is only available for canvas renderer. svg is only available for svg renderer.\n    type?: string,\n    // Resolution ratio of exporting image, 1 by default.\n    pixelRatio?: number,\n    // Background color of exporting image, use backgroundColor in option by default.\n    backgroundColor?: string,\n    // Excluded components list. e.g. [&#39;toolbox&#39;]\n    excludeComponents?: Array.&lt;string&gt;\n}) =&gt; string\n</code></pre>\n<p>Exports chart image; returns a base64 URL; can be set to <code class=\"codespan\">src</code> of <code class=\"codespan\">Image</code>.</p>\n<p><strong>For example: </strong></p>\n<pre><code class=\"lang-ts\">var img = new Image();\nimg.src = myChart.getDataURL({\n    pixelRatio: 2,\n    backgroundColor: &#39;#fff&#39;\n});\n</code></pre>\n"},"getConnectedDataURL":{"desc":"<pre><code class=\"lang-ts\">(opts: {\n    // Exporting format, can be either png, or jpeg\n    type?: string,\n    // Resolution ratio of exporting image, 1 by default.\n    pixelRatio?: number,\n    // Background color of exporting image, use backgroundColor in option by default.\n    backgroundColor?: string,\n    // Excluded components list. e.g. [&#39;toolbox&#39;]\n    excludeComponents?: Array.&lt;string&gt;\n}) =&gt; string\n</code></pre>\n<p>Exports connected chart image; returns a base64 url; can be set to <code class=\"codespan\">src</code> of <code class=\"codespan\">Image</code>. Position of charts in exported image are related to that of the container.</p>\n"},"appendData":{"desc":"<pre><code class=\"lang-ts\">(opts: {\n    // Specify which series the data will be appended to.\n    seriesIndex?: number,\n    // The data to be appended.\n    data?: Array|TypedArray\n}) =&gt; string\n</code></pre>\n<p>The method is used in rendering millions of data (e.g. rendering geo data). In these scenarios, the entire size of data is probably up to 10 or 100 MB, even using binary format. So chunked load data and rendering is required. When using <code class=\"codespan\">appendData</code>, the graphic elements that have been rendered will not be cleared, but keep rendering new graphic elements.</p>\n<p>Notice:</p>\n<ul>\n<li>Currently, when a series is using <code class=\"codespan\">dataset</code>, it is not supported to use <code class=\"codespan\">appendData</code>.</li>\n<li>Currently, not all types of series support incremental rendering when using <code class=\"codespan\">appendData</code>. Only these types of series support it: scatter and lines of pure echarts, and scatterGL, linesGL and polygons3D of echarts-gl.</li>\n</ul>\n"},"clear":{"desc":"<p>Clears current instance; removes all components and series in current instance.</p>\n"},"isDisposed":{"desc":"<pre><code class=\"lang-ts\">() =&gt; boolean\n</code></pre>\n<p>Returns whether current instance has been disposed.</p>\n"},"dispose":{"desc":"<p>Disposes instance. Once disposed, the instance can not be used again.</p>\n"}}