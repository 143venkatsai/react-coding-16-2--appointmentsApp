import {Component} from 'react'
import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], titleInput: '', dateInput: '', isFilter: false}

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
    console.log('Completed')
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
    console.log('Completed')
  }

  isFavoriteTriggered = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarred = () => {
    const {isFilter} = this.state
    this.setState({isFilter: !isFilter})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilter} = this.state
    if (isFilter) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilter} = this.state
    const filterButton = isFilter ? 'filtered' : ''
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="main-container">
          <div className="appointment-container">
            <div className="left-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <div className="title-input">
                  <label htmlFor="title" className="label-name">
                    TITLE
                  </label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    className="input"
                    placeholder="Title"
                    onChange={this.onChangeTitle}
                    value={titleInput}
                  />
                </div>
                <div className="date-input">
                  <label htmlFor="date" className="label-name">
                    DATE
                  </label>
                  <br />
                  <input
                    type="date"
                    id="date"
                    className="input"
                    onChange={this.onChangeDate}
                    value={dateInput}
                    placeholder="Title"
                  />
                </div>
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <div className="right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="user-container">
            <div className="star-container">
              <h2 className="heading">Appointments</h2>
              <button
                type="button"
                className={`star-button ${filterButton} `}
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  isFavoriteTriggered={this.isFavoriteTriggered}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
