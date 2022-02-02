const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const isToday = (date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const prettyDate = (unPrettyDate, displayTimeForToday = true) => {
  const date = new Date(unPrettyDate);

  if (displayTimeForToday && isToday(date)) {
    const d = date.toLocaleTimeString();
    return d.substring(0, d.length - 6) + d.substring(d.length - 3);
  }

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default prettyDate;
