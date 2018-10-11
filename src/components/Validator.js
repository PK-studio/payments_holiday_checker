export default function validator(data){
  let errors = {};

  function isEmpty(obj){
    let val = true;
    for (let key in obj){
      if(obj.hasOwnProperty(key)){
        val = false
      }
    }
    return val;
  }

  if(data.date === ''){
    errors.date = "please provide day on which money has been transferred"
  }

  if(data.gbp === ''){
    errors.gbp = "please provide amount of transferred money"
  }

  if(data.country === '' || data.country === 'select country'){
    errors.country = "please choose country in where transaction has been made"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}