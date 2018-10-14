function status(response){
  if(response.status === 200){
    return Promise.resolve(response)
  }
  else{
    return Promise.reject(new Error("Problem with pulling data: ", response.statusText))
  }
}

function json(response){
  return Promise.resolve(response.json());
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

function getCurrencySymbol(country){
  switch (country){
    case "Poland":
      return "PLN";
    case "Romania":
      return "RON";
    case "Spain":
      return "EUR";
    default:
    break;
  }
}

function getPropsFrom(transfer){
  const props = {}
  let date = transfer.date.split("-")
  props.date = transfer.date
  props.day = date[2]
  props.month = date[1]
  props.year = date[0]
  props.country = getCountryAbbreviation(transfer.country)
  props.gbpAmount = transfer.gbpAmount
  props.currency = getCurrencySymbol(transfer.country)
  return props
}

function checkCalendar(props){
  return fetch(`https://holidayapi.com/v1/holidays` +
    `?key=4aa145d0-337f-4dd1-82b2-db4e22d8478b` +
    `&country=`+props.country+
    `&year=`+props.year+
    `&month=`+props.month+
    `&day=`+props.day)
  .then(status)
  .then(json)
  .then(data => data)
  .catch(error => console.log(error) );
}

function checkCurancyRate(props){
  return fetch(`https://api.exchangeratesapi.io/`+props.date+`?base=GBP`)
  .then(status)
  .then(json)
  .then(data => data)
  .catch(error => console.log(error) );
}

function createInfo(allData){
  let holidayFound = allData.holidays[0]
  const info = {};
  info.date = allData.date;
  info.country = allData.country;

  if(holidayFound){
    info.conflict = "Yes";
    info.holiday = holidayFound.name;
    info.public = holidayFound.public ? " Yes" : " No";
  }
  else{
    info.conflict = "No";
  }

  if(allData.rates[allData.currency]){
    info.rate = allData.rates[allData.currency];
    info.calc = (allData.gbpAmount*info.rate).toFixed(2) +" "+ allData.currency;
  }
  else{
    info.rate = "App doesn't support " + allData.country + " transfers";
    info.calc = "App doesn't support " + allData.country + " transfers";
  }

  return info;
}

export default function getData(transfer){
  let props = getPropsFrom(transfer)

  return new Promise ((resolve, reject) => {
    Promise.all([
      checkCalendar(props),
      checkCurancyRate(props)
    ]).then(reponse => {

      let allData = {
        currency: props.currency, 
        country: props.country,
        gbpAmount: props.gbpAmount
      }

      reponse.forEach(element => {
        for (let property in element){
          allData[property] = element[property];
        }
      });

      resolve(createInfo(allData))
    
    }).catch(err => {
      reject(err)
    })
  })
}
