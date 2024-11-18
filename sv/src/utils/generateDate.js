import moment from "moment";
const addZero = (i) => {
  if (i < 10) {i = "0" + i}
  return i;
}
const formatDate = (timeObj) => {
  let day = timeObj.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeObj.getDay() + 1}`;
  let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`;
  let time = `${addZero(timeObj.getHours())}:${addZero(timeObj.getMinutes() + 1)}`;
  return `${day}, ${time} ${date}`;
};

const generateDate = () => {
  let gapExpire = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let expireDay = moment(today).add(gapExpire, "d").toDate();
  return {
    today: formatDate(today),
    expireDay: formatDate(expireDay),
  };
};
export default generateDate;
