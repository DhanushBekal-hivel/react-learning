import { ChartType } from '../Types/Chart';
import Highcharts from 'highcharts';

// Example data for different chart types
export const getChartData = (chartType: ChartType): Highcharts.Options => {
  switch(chartType) {
    case 'line':
      return {
        chart: {
          type: 'line'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          type: 'line',
          name: 'Sales 2023',
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }, {
          type: 'line',
          name: 'Sales 2022',
          data: [25.3, 65.9, 98.2, 120.5, 132.8, 150.2, 125.6, 140.1, 180.9, 182.7, 85.2, 42.8]
        }]
      };
    
    case 'column':
      return {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        series: [{
          type: 'column',
          name: 'Revenue',
          data: [49.9, 71.5, 106.4, 129.2]
        }, {
          type: 'column',
          name: 'Expenses',
          data: [35.6, 48.5, 55.4, 67.1]
        }, {
          type: 'column',
          name: 'Profit',
          data: [14.3, 23.0, 51.0, 62.1]
        }]
      };
      
    case 'pie':
      return {
        chart: {
          type: 'pie'
        },
        title: {
          text: ''
        },
        series: [{
          type: 'pie',
          name: 'Market Share',
          data: [
            { name: 'Product A', y: 45.0 },
            { name: 'Product B', y: 26.8 },
            { name: 'Product C', y: 12.8 },
            { name: 'Product D', y: 8.5 },
            { name: 'Product E', y: 6.9 }
          ]
        }]
      };
      
    case 'area':
      return {
        chart: {
          type: 'area'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        plotOptions: {
          area: {
            stacking: 'normal'
          }
        },
        series: [{
          type: 'area',
          name: 'Website',
          data: [31, 35, 42, 51, 49, 62, 69, 91, 101, 112, 95, 85]
        }, {
          type: 'area',
          name: 'Social Media',
          data: [18, 21, 25, 27, 29, 33, 42, 44, 48, 50, 47, 39]
        }, {
          type: 'area',
          name: 'Direct Sales',
          data: [15, 14, 19, 22, 25, 28, 32, 34, 35, 41, 38, 30]
        }]
      };
      
    default:
      return {
        title: { text: 'No Data Available' },
        series: [{ type: 'line', data: [] }]
      };
  }
};