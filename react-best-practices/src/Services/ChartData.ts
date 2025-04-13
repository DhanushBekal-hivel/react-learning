import { ChartType } from '../Types/Chart';
import Highcharts from 'highcharts';

// Define a return type that includes both chart options and table data
interface ChartDataReturn {
  chartOptions: Highcharts.Options;
  tableData: {
    data: any[];
    columns: {
      key: string;
      label: string;
    }[];
  };
}

// Example data for different chart types
export const getChartData = (chartType: ChartType): ChartDataReturn => {
  switch(chartType) {
    case 'line':
      return {
        chartOptions: {
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
        },
        tableData: {
          columns: [
            { key: 'month', label: 'Month' },
            { key: 'sales2023', label: 'Sales 2023' },
            { key: 'sales2022', label: 'Sales 2022' }
          ],
          data: [
            { month: 'Jan', sales2023: 29.9, sales2022: 25.3 },
            { month: 'Feb', sales2023: 71.5, sales2022: 65.9 },
            { month: 'Mar', sales2023: 106.4, sales2022: 98.2 },
            { month: 'Apr', sales2023: 129.2, sales2022: 120.5 },
            { month: 'May', sales2023: 144.0, sales2022: 132.8 },
            { month: 'Jun', sales2023: 176.0, sales2022: 150.2 },
            { month: 'Jul', sales2023: 135.6, sales2022: 125.6 },
            { month: 'Aug', sales2023: 148.5, sales2022: 140.1 },
            { month: 'Sep', sales2023: 216.4, sales2022: 180.9 },
            { month: 'Oct', sales2023: 194.1, sales2022: 182.7 },
            { month: 'Nov', sales2023: 95.6, sales2022: 85.2 },
            { month: 'Dec', sales2023: 54.4, sales2022: 42.8 }
          ]
        }
      };
    
    case 'column':
      return {
        chartOptions: {
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
        },
        tableData: {
          columns: [
            { key: 'quarter', label: 'Quarter' },
            { key: 'revenue', label: 'Revenue' },
            { key: 'expenses', label: 'Expenses' },
            { key: 'profit', label: 'Profit' }
          ],
          data: [
            { quarter: 'Q1', revenue: 49.9, expenses: 35.6, profit: 14.3 },
            { quarter: 'Q2', revenue: 71.5, expenses: 48.5, profit: 23.0 },
            { quarter: 'Q3', revenue: 106.4, expenses: 55.4, profit: 51.0 },
            { quarter: 'Q4', revenue: 129.2, expenses: 67.1, profit: 62.1 }
          ]
        }
      };
      
    case 'pie':
      return {
        chartOptions: {
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
        },
        tableData: {
          columns: [
            { key: 'product', label: 'Product' },
            { key: 'marketShare', label: 'Market Share (%)' }
          ],
          data: [
            { product: 'Product A', marketShare: 45.0 },
            { product: 'Product B', marketShare: 26.8 },
            { product: 'Product C', marketShare: 12.8 },
            { product: 'Product D', marketShare: 8.5 },
            { product: 'Product E', marketShare: 6.9 }
          ]
        }
      };
      
    case 'area':
      return {
        chartOptions: {
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
        },
        tableData: {
          columns: [
            { key: 'month', label: 'Month' },
            { key: 'website', label: 'Website' },
            { key: 'socialMedia', label: 'Social Media' },
            { key: 'directSales', label: 'Direct Sales' }
          ],
          data: [
            { month: 'Jan', website: 31, socialMedia: 18, directSales: 15 },
            { month: 'Feb', website: 35, socialMedia: 21, directSales: 14 },
            { month: 'Mar', website: 42, socialMedia: 25, directSales: 19 },
            { month: 'Apr', website: 51, socialMedia: 27, directSales: 22 },
            { month: 'May', website: 49, socialMedia: 29, directSales: 25 },
            { month: 'Jun', website: 62, socialMedia: 33, directSales: 28 },
            { month: 'Jul', website: 69, socialMedia: 42, directSales: 32 },
            { month: 'Aug', website: 91, socialMedia: 44, directSales: 34 },
            { month: 'Sep', website: 101, socialMedia: 48, directSales: 35 },
            { month: 'Oct', website: 112, socialMedia: 50, directSales: 41 },
            { month: 'Nov', website: 95, socialMedia: 47, directSales: 38 },
            { month: 'Dec', website: 85, socialMedia: 39, directSales: 30 }
          ]
        }
      };
      
    default:
      return {
        chartOptions: {
          title: { text: 'No Data Available' },
          series: [{ type: 'line', data: [] }]
        },
        tableData: {
          columns: [],
          data: []
        }
      };
  }
};