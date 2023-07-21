(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{316:function(e,n,r){"use strict";r.r(n),n.default="# Render with SVG or Canvas\n\nMost browser-side chart libraries use SVG or Canvas as the underlying renderer. Generally, both technologies are interchangeable and have a similar effect. However, the difference may be notable in some specific scenarios and cases. As a result, it's always a hard choice to decide which technology to render charts.\n\nCanvas has been used as the renderer of ECharts from the beginning. Since [v4.0](https://echarts.apache.org/en/changelog.html#v4-0-0), ECharts has provided the SVG renderer as an additional option. You can specify the [renderer parameter](${mainSitePath}api.html#echarts.init) as `'canvas'` or `'svg'` when initializing the chart.\n\n> SVG and Canvas have a significant difference in use. The uniform support for both technologies in ECharts is attributed to the abstraction and implementation of the underlying library [ZRender](https://github.com/ecomfe/zrender).\n\n## How to Choose a Renderer\n\nGenerally, Canvas is more suitable for charts with a large number of elements (heat map, large-scale line or scatter plot in geo or parallel coordinates, etc.), and with visual [effect](${mainSitePath}examples/editor.html?c=lines-bmap-effect). However, SVG has an important advantage: It has less memory usage (which is important for mobile devices) and won't be blurry when zooming in.\n\nThe choice of renderer can be based on a combination of hardware and software environment, data volume and functional requirements.\n\n- In scenarios where the hardware and software environment is good and the amount of data is not too large, both renderers will work and there is not much need to agonize over them.\n- In scenarios where the environment is poor and performance issues arise that require optimization, experimentation can be used to determine which renderer to use. For example, there are these experiences.\n  - In situations where many instances of ECharts have to be created and the browser is prone to crashing (probably because the number of Canvas is causing the memory footprint to exceed the phone's capacity), the SVG renderer can be used to make improvements. Roughly speaking, the SVG renderer may work better if the chart is running on a low-end Android, or if we are using specific charts such as the [LiquidFill chart](https://ecomfe.github.io/echarts-liquidfill/example/).\n  - For larger amounts of data (>1k is an experience value), canvas renderer is always recommended.\n\nWe strongly welcome [feedback](https://github.com/apache/echarts/issues/new) from developers on their experiences and scenarios to help us make better optimizations.\n\nNote: Currently, some special effects still relies on Canvas: e.g. [trail effect](${optionPath}series-lines.effect), [heatmap with blending effect](${mainSitePath}examples/editor.html?c=heatmap-bmap), etc.\n\nSince [v5.3.0](${lang}/basics/release-note/5-3-0/#new-svg-renderer), the SVG renderer got refactored using the Virtual DOM, the performance got improved by 2-10 times and it can even be dozens of times in some specific scenarios! Refer to [#836](https://github.com/ecomfe/zrender/pull/836) for more details.\n\n## How to Use the Renderer\n\nIf `echarts` is fully imported in the following way, it already automatically imported and registered the SVG renderer and the Canvas renderer.\n\n```js\nimport * as echarts from 'echarts';\n```\n\nIf you are using [tree-shakable import](${lang}/basics/import), you will need to import the required renderers manually.\n\n```js\nimport * as echarts from 'echarts/core';\n// You can use only the renderers you need\nimport { SVGRenderer, CanvasRenderer } from 'echarts/renderers';\n\necharts.use([SVGRenderer, CanvasRenderer]);\n```\n\nThen you can set the [renderer parameter](${mainSitePath}api.html#echarts.init) when initializing the chart.\n\n```js\n// Use the Canvas renderer (default)\nvar chart = echarts.init(containerDom, null, { renderer: 'canvas' });\n// Equivalent to\nvar chart = echarts.init(containerDom);\n\n// use the SVG renderer\nvar chart = echarts.init(containerDom, null, { renderer: 'svg' });\n```\n"}}]);