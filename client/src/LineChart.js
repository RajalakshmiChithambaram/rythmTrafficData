import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const LineChart = (props) => {
  const stockOptions = {
    series: [{
      data: props.data,
      name: 'Movement Count',
      color: '#0d6efd'
    }],
    credits: {
      enabled: false
    }
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={stockOptions}
      />
    </div>
  )
}
export default LineChart

