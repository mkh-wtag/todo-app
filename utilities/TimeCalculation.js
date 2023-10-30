const timeCalculation = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const currentDate = new Date();
    const currentMinutes = currentDate.getMinutes();
    const currentHour = currentDate.getHours();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const minutes = currentMinutes.toString().padStart(2, '0');

    
    const hourCalculation = () => {
      let hour;
      let amPm = 'AM';
      if(currentHour > 12) {
        hour = currentHour - 12;
        amPm = 'PM';
      } else {
        hour = currentHour;
      }

      return {hour, amPm};
    }

    const { hour, amPm } = hourCalculation();

    return {months, currentDay, currentMonth, currentYear, minutes, hour, amPm}
}

export default timeCalculation;


