function status(response){
  if(response.status === 200){
    return Promise.resolve(response)
  }
  else{
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response){
  return response.json();
}

function getCountryAbbreviation(country){
  switch (country){
    case "Poland":
      return "PL";
    case "Romania":
      return "RO";
    case "Spain":
      return "ES";
    default:
    break;
  }
}

function getPropsFrom(info){
  const props = {}
  let date = info.date.split("-")
  props.day = date[2]
  props.month = date[1]
  props.year = date[0]
  props.country = getCountryAbbreviation(info.country)
  return props
}

export default function getCalendar(info){
  let holiday = "";
  let props = getPropsFrom(info);
  fetch(`https://holidayapi.com/v1/holidays` +
    `?key=4aa145d0-337f-4dd1-82b2-db4e22d8478b` +
    `&public=true`+
    `&country=`+props.country+
    `&year=`+props.year+
    `&month=`+props.month+
    `&day=`+props.day)
  .then(status)
  .then(json)
  .then(data => {
    console.log(data.holidays[0])
    holiday = data.holidays[0]
  })
  .catch(error => console.log(error));
  return holiday
}
