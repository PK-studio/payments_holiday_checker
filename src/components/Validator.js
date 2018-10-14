export default function validator(data){
  let errors = {};
  let convertedDate = data.date.split("-")
  let day = convertedDate[2]
  let month = convertedDate[1]
  let year = convertedDate[0]

  function hasNoErrors(obj){
    let val = true;
    for (let key in obj){
      if(obj.hasOwnProperty(key)){
        val = false;
      }
    }
    return val;
  }

  if(data.date === ''){
    errors.date = "please provide day on which money has been transferred"
  }else if( 
      (data.year < 1999) ||
      (year==1999 && month==1 && day<4)
    ){
    errors.date = "app provides historical rates for any day since 1999-01-04"
  }

  if(data.gbpAmount === ''){
    errors.gbpAmount = "please provide amount of transferred money"
  }

  if(data.country === '' || data.country === 'select country'){
    errors.country = "please choose country in where transaction has been made"
  }

  return {
    errors,
    isValid: hasNoErrors(errors)
  }
}