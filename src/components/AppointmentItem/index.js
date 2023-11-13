import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isFavoriteTriggered} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickBtn = () => {
    isFavoriteTriggered(id)
  }

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-element">
      <div className="left-container">
        <p className="title-name">{title}</p>
        <p className="date-name">Date: {formattedDate}</p>
      </div>
      <button
        className="btn"
        type="button"
        data-testid="star"
        onClick={onClickBtn}
      >
        <img src={starImgUrl} alt="star" className="star-image" />
      </button>
    </li>
  )
}

export default AppointmentItem
