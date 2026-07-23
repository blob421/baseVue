<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';
import ApexCharts from 'apexcharts';

const options: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {show: false},
    
    height: '100%',
    width: '100%',
  },

plotOptions: {bar: {borderRadius: 6}},

 fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      gradientToColors: ['#6EC6FF'], // ending color
      stops: [0, 100]
    }
  },
  
  tooltip: {enabled: false},
  dataLabels: {enabled: false},
 
  
  title: {
    text: 'Title',
    align: 'center', offsetY: -2,
    style: {fontSize: '50px'}
  },
  grid: {show: false},
  states: {hover: {filter: {type: 'none'}}, active: {filter: {type: 'none'}}},
  series: [
    { name: 'Test', data: [1, 2, 3, 4, 5] }
  ],
  xaxis: {
    categories: ['test','test','test','test','test'], 
    labels: {style: {fontSize: '4vw'}, offsetY: 50, show: false}, axisTicks: {show: false},  axisBorder: {show: false}
  },
  yaxis: {labels: {show: false},  axisTicks: {show: false}, axisBorder: {show: false}}
  
};
</script>

<template>
  <div id="chart">
    <VueApexCharts
      type="bar"
      :options="options"
      :series="options.series"
      width="100%"
      height="100%"
      
    />
  </div>
</template>

<style scoped>
#chart {
  background-color: rgb(165, 165, 165); padding: 1%;
  aspect-ratio: 1/1;
  height: 20vh; border-radius: 20px;
}
</style>
