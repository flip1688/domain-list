import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function DateTimePickerViews() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateTimePicker', 'DateTimePicker', 'DateTimePicker']}
      >
        <DemoItem
          label={'Date/Time'}
        >
          <DateTimePicker
            views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}