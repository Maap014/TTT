export const formatTime = (value) => {
  if (value > 59) {
    let minutesValue = Math.floor(value / 60);
    let secondsValue = value % 60;
    return `
    ${minutesValue < 10 ? "0" + minutesValue : minutesValue}m
    :
    ${secondsValue < 10 ? "0" + secondsValue : secondsValue} 
    `;
  } else return `${value}s`;
};
