import React from 'react';

export default class AddCarModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      color: '',
      year: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {

    this.setState({ [event.target.id]: event.target.value });

  }

  handleSubmit(event) {
    event.preventDefault();
    const car = {
      make: this.state.make,
      model: this.state.model,
      color: this.state.color,
      year: parseInt(this.state.year)
    };

    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    };

    fetch('/api/saveCar', init)
      .catch(err => console.error(err));

    this.props.closeModal();
  }

  render() {
    return (
      <div className='modal-background'>
        <div className='modal-window'>
          <i className='fa-regular fa-x modal-exit' onClick={this.props.closeModal} />
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className='column-full'>
                <h1 className="add-car-heading"> Add New Car</h1>
              </div>
            </div>
            <div className='row modal-padding'>
              <div className='column-full'>
                <label htmlFor='make'> Make
                  <input
                  className='input-field'
                  id='make'
                  value={this.state.make}
                  onChange={this.handleInputChange}
                  required
                  />
                </label>
              </div>
            </div>
            <div className='row modal-padding'>
              <div className='column-full'>
                <label htmlFor='model'> Model
                  <input
                    className='input-field'
                    id='model'
                    value={this.state.model}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div className='row modal-padding'>
              <div className='column-full'>
                <label htmlFor='color'> Color
                  <input
                    className='input-field'
                    id='color'
                    value={this.state.color}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div className='row modal-padding'>
              <div className='column-full'>
                <label htmlFor='year'> Year
                  <input
                    className='input-field'
                    id='year'
                    value={this.state.year}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
              </div>
            </div>
            <div className='row modal-padding'>
              <div className='column-full text-align-end'>
                <button className='save-button'>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
