
import '../css/page5.css';
import printMe from './print.js';
if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      printMe();
    })
  }
const F2 = require('@antv/f2');
const data = [
      {
        date: "2017-06-05",
        value: 20,
        type: '最高温度'
      }, {
        date: "2017-06-06",
        value: 21,
        type: '最高温度'
      }, {
        date: "2017-06-07",
        value: 18,
        type: '最高温度'
      }, {
        date: "2017-06-08",
        value: 20,
        type: '最高温度'
      }, {
        date: "2017-06-09",
        value: 16,
        type: '最高温度'
      },{
        date: "2017-06-05",
        value: 10,
        type: '最低温度'
      }, {
        date: "2017-06-06",
        value: 8,
        type: '最低温度'
      }, {
        date: "2017-06-07",
        value: 12,
        type: '最低温度'
      }, {
        date: "2017-06-08",
        value: 14,
        type: '最低温度'
      }, {
        date: "2017-06-09",
        value: 9,
        type: '最低温度'
      }
  ];
// Step 1: 创建 Chart 对象
const chart = new F2.Chart({
    id: 'myChart',
    pixelRatio: window.devicePixelRatio // 指定分辨率
  });
  
  // Step 2: 载入数据源
  chart.source(data, {
    value: {
      tickCount: 5,
      min: 0
    },
    date: {
      type: 'timeCat',
      range: [0, 1],
      tickCount: 1
    }
  });
  
  chart.tooltip({
    custom: true,
    showXTip: true,
    showYTip: true,
    snap: true,
    crosshairsType: 'xy',
    crosshairsStyle: {
      lineDash: [2]
    }
  });

  // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
  chart.axis('date', {
    label: null,
    grid: null,
    line: null
  });
  chart.axis('value', {
    label: null,
    grid: null,
  });
  //#ff6347
  //#00c0d1
  chart.line().position('date*value').color('type').shape('type', function(type){
    if (type === '最高温度') {
      return 'line';
    }
    if (type === '最低温低') {
      return 'dash';
    }
  });

  chart.point().position('date*value').style({
    stroke: '#fff',
    lineWidth: 1
  });
  
  chart.legend(false);

  data.map(function(obj) {
    chart.guide().text({
      position: [obj.date, obj.value],
      content: obj.value,
      style: {
        textAlign: 'center',
        textBaseline: 'bottom'
      },
      offsetY: -4
    });
  });

  // Step 4: 渲染图表
  chart.render();