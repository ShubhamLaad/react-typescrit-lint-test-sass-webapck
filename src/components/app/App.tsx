import * as React from 'react';
import DatePicker from 'react-datepicker';
import { Flights, IFlight } from '../flights/Flights';
import { MultiSelect } from '../multiselect/MultiSelect';
import DESTINATIONS from '../../json/destintions';
import FLIGHTS from '../../json/flights';
import './App.sass';

interface IState {
  selectedDate: Date,
  flights: IFlight[],
  selectedCityNames: string[],
};

class App extends React.Component<{}, IState> {
  public static getStartOfDayDate(date: number) {
    return new Date(date).setHours(0, 0, 0, 0);
  }

  constructor(props: any) {
    super(props);
    this.state = {
      flights: [],
      selectedCityNames: [],
      selectedDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
  }

  public componentDidMount() {
    this.filterFlights();
  }

  public render() {
    return (
      <div className="container">
        <div className="datePicker">
          <DatePicker
            placeholderText="Select Date"
            selected={this.state.selectedDate}
            onChange={this.handleChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <MultiSelect
          placeholder="Select Multiple Cities"
          options={DESTINATIONS.map(destintion => destintion.cityName)}
          selectedOptions={this.state.selectedCityNames}
          onChange={this.handleMultiSelectChange}
        />
        <h4 className="text-center">Top trips for you</h4>
        <Flights flights={this.state.flights} />
      </div>
    );
  }

  private filterCity(city: string) {
    const { selectedCityNames } = this.state;
    if (selectedCityNames.length) {
      return selectedCityNames.includes(city);
    }
    return true;
  }

  private filterFlights() {
    const { selectedDate } = this.state;

    if (selectedDate) {
      const flights = FLIGHTS.filter(flight => {
        return App.getStartOfDayDate(selectedDate.getTime()) === App.getStartOfDayDate(flight.flightDate)
          && this.filterCity(flight.destination.cityName.toLowerCase())
      })
      flights.sort((first, next) => {
        return first.amount - next.amount;
      })
      this.setState({
        flights
      })
    }
  }

  private handleChange(selectedDate: Date) {
    this.setState({
      selectedDate
    }, this.filterFlights);
  }

  private handleMultiSelectChange(selectedCityNames: string[]) {
    this.setState({ selectedCityNames }, this.filterFlights)
  }
}

export default App;
