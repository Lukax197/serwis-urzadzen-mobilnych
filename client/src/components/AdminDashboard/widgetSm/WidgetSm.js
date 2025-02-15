import './widgetSm.css'
import { MdVisibility } from 'react-icons/md'

const WidgetSm = () => {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className='widgetSmList'>
        <li className='widgetSmListItem'>
          <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className='widgetSmImg' />
          <div className='widgetSmUser'>
            <span className='widgetSmUsername'>Anna Keller</span>
            <span className='widgetSmUserTitle'>Software Engineer</span>
          </div>
          <button className='widgetSmButton'>
              <MdVisibility className='widgetSmIcon' />
              Display
          </button>
        </li>
        <li className='widgetSmListItem'>
          <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className='widgetSmImg' />
          <div className='widgetSmUser'>
            <span className='widgetSmUsername'>Anna Keller</span>
            <span className='widgetSmUserTitle'>Software Engineer</span>
          </div>
          <button className='widgetSmButton'>
              <MdVisibility className='widgetSmIcon' />
              Display
          </button>
        </li>
        <li className='widgetSmListItem'>
          <img src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className='widgetSmImg' />
          <div className='widgetSmUser'>
            <span className='widgetSmUsername'>Anna Keller</span>
            <span className='widgetSmUserTitle'>Software Engineer</span>
          </div>
          <button className='widgetSmButton'>
              <MdVisibility className='widgetSmIcon' />
              Display
          </button>
        </li>
      </ul>
    </div>
  )
}

export default WidgetSm