function indexFn() {
  require(['jquery', 'echarts'], function($, echarts) {
    console.log(echarts)
      $(function() {
          buildData();
      });

      function buildData() {
          //定义数据结构
          var datas = {
              'colors': ['#006699', '#4cabce', '#e5323e'],
              'xAxis': ['河南', '江苏', '山西', '山东', '安徽', '黑龙江', '广西', '上海'],
            //   'legend':['好','中','差'],
            'legend':['停车服务','车辆服务','新媒体类'],
              'list': [
                  {
                      'title': '呦车呦位代理商停车场数据',
                      'series': [[80, 74, 65, 40, 49, 38, 93, 89],[97, 93, 78, 30, 75, 55, 85, 90],[58, 68, 54, 73, 62, 92, 30, 84]],
                      'elid': 'chartMain'
                  }
                ]
          };
          for (var i = 0; i < datas['list'].length; i++) {
              canvasEcharts(datas, i);
          }
      }

      function canvasEcharts(json, index) {
          var obj = json['list'][index];
          var myChats = echarts.init(document.getElementById(obj['elid']));
          var option = {
              title: {
                  text: obj['title'],
                  // subtext: index==0?'数据来自投票结果而时时变化':''  //只有第一个要副标题
                  //主标题文本超链接
                  //link: 'http://www.xxxxxxxxxx',
                  subtext: '使用率（百分比）数据参考'
              },
              color: ['#006699', '#4cabce', '#e5323e'],
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'shadow'
                  }
              },
              toolbox: {
                  //显示策略，可选为：true（显示） | false（隐藏），默认值为true
                  show: true,
                  //垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                  y: 'center',
                  feature: {
                      //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'
                      saveAsImage: { show: true }
                  }
              },
              legend: {
                  left: "70%",
                  data: ['停车服务', '车辆服务', '新媒体类']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true,
              },
              xAxis: [{
                  min: 0,
                  //坐标轴类型，横轴默认为类目型'category'
                  type: 'category',
                  data: json['xAxis']
              }],
              yAxis: [{
                  min: 0,
                  max: 100,
                  //坐标轴类型，纵轴默认为数值型'value'
                  type: 'value'
              }],
              series: (function(){
                  var arr=[];
                  for (var i = 0; i < obj['series'].length; i++) {
                      var thisobj={
                          name: json['legend'][i],
                          type: 'bar',
                          barWidth: '15%',
                      };
                      thisobj.data=obj['series'][i];
                      arr.push(thisobj)
                  }
                  return arr
              })()
          };
          //为echarts对象加载数据
          myChats.setOption(option, true);
      }

  });
}

require(['./lib/config'], indexFn);