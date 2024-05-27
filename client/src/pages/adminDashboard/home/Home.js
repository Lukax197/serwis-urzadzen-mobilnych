import './home.css'
import FeaturedInfo from '../../../components/AdminDashboard/featuredInfo/FeaturedInfo'
import Chart from '../../../components/AdminDashboard/chart/Chart'
import WidgetSm from '../../../components/AdminDashboard/widgetSm/WidgetSm'
import WidgetLg from '../../../components/AdminDashboard/widgetLg/WidgetLg'

const Home = () => {
  return (
    <div className='home'>
        <FeaturedInfo />
        {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User" /> */}
        <div className='homeWidgets'>
          {/* <WidgetSm />
          <WidgetLg /> */}
        </div>
    </div>
  )
}

export default Home