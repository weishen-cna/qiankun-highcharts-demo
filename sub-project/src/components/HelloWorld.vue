<template>
  <div>
    <div id="top-campaigns-chart1"></div>
    <div id="top-campaigns-chart2"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import Exporting from "highcharts/modules/exporting";
import { jsonData } from "./data";

Exporting(Highcharts);
HighchartsMore(Highcharts);

export default {
  name: "main",
  data() {
    return {
      hchart1: null,
      hchart2: null
    };
  },
  mounted() {
    this.drawChart("top-campaigns-chart1", this.hchart1);
    this.drawChart("top-campaigns-chart2", this.hchart2);
  },
  methods: {
    drawChart(id, hchart) {
      if (hchart) hchart.destroy();
      hchart = Highcharts.chart(id, {
        title: { text: null }, // 不显示标题
        chart: {
          type: "packedbubble",
        },
        navigation: {
          buttonOptions: {
            enabled: false,
          },
        },
        credits: {
          enabled: false,
        },
        legend: {
          symbolWidth: 8,
          symbolHeight: 8,
        },
        plotOptions: {
          packedbubble: {
            minSize: "10",
            maxSize: "40",
            zMin: 0,
            zMax: 100,
            layoutAlgorithm: {
              gravitationalConstant: 0.05,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true,
              // enableSimulation : false
            },
            dataLabels: {
              enabled: true,
              style: {
                color: "black",
                textOutline: "none",
                fontWeight: "normal",
              },
            },
          },
        },
        series: jsonData,
      });
    },
  },
};
</script>

<style scoped>
</style>