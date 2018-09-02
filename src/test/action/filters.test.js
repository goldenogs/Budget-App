import { setStartDate, setEndDate } from '../../actions/filters';
import moment from 'moment';

test('should generate set start date object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

