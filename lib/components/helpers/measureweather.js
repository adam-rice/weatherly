function measureWeather(temp) {
  let average = (temp.high+temp.low)/2
  if (average > 75) {
    return 'hot';
  }
  if (average <= 75 && average >= 51) {
    return 'warm';
  }
  if (average <= 50 && average >= 26) {
    return 'cool';
  }
  if (average <= 25) {
    return 'cold';
  }
}

export default measureWeather;
