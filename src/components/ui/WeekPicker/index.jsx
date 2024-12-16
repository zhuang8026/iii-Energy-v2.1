import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

/**
 * npm install react-calendar
 *
 */
function MyApp() {
    const [value, setValue] = useState(new Date());

    const handleChange = nextValue => {
        setValue(nextValue);
    };

    return (
        <div>
            <Calendar onChange={handleChange} value={value} />
        </div>
    );
}

export default MyApp;
