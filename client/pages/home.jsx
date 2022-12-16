import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: null
    };
    this.getCars = this.getCars.bind(this);
  }

  getCars() {
    fetch('api/getCars')
      .then(res => res.json())
      .then(cars => {
        this.setState({ cars });
      });
  }

  componentDidMount() {
    this.getCars();
  }

  render() {
    if (!this.state.cars) return null;

    const tableBody = this.state.cars.map(car => {
      return (
        <tr key={car.carId} className='table-row'>
          <td className='table-data'> {car.make}</td>
          <td className='table-data'> {car.model}</td>
          <td className='table-data'> {car.year}</td>
          <td className='table-data'> {car.color}</td>
        </tr>
      );
    });

    return (
      <>
        <h1 className='title'>Car Catalog</h1>
        <div className='line'/>
        <table className = 'table'>
          <thead>
            <tr className='table-header'>
              <th className='header-styling'>Make</th>
              <th className='header-styling'>Model</th>
              <th className='header-styling'>Year</th>
              <th className='header-styling'>Color</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {tableBody}
          </tbody>
        </table>
      </>
    );
  }
}
