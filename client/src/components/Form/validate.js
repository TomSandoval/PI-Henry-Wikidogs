const regexURL =
  /((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi;
const regexLifeSpan = /^\d+ - \d+ years$/;
const regexNum = /^\d+$/;

export function validate(form) {
  let errors = {};

  if (!form.name) {
    errors.name = "Enter a name";
  } else {
    if (form.name.length < 3) {
      errors.name = "The name must be between 2 and 18 characters long.";
    }
    if(form.name.length > 18){
      errors.name = "The name must be between 2 and 18 characters long.";
    }
  }
  if (!form.minWeight) {
    errors.minWeight = "Enter a min weight";
  } else {
    if (!regexNum.test(form.minWeight)) {
      errors.minWeight = "Only numbers";
    }
  }

  if (!form.maxWeight) {
    errors.maxWeight = "Enter a max weight";
  } else {
    if (!regexNum.test(form.maxWeight)) {
      errors.maxWeight = "Only numbers";
    }
  }

  if (!form.minHeight) {
    errors.minHeight = "Enter a min height";
  } else {
    if (!regexNum.test(form.minHeight)) {
      errors.minHeight = "Only numbers";
    }
  }

  if (!form.maxHeight) {
    errors.maxHeight = "Enter a max height";
  } else {
    if (!regexNum.test(form.maxHeight)) {
      errors.maxHeight = "Only numbers";
    }
  }

  if (!regexLifeSpan.test(form.life_span)) {
    errors.life_span =
      "The life span format must be as follows: 'number - number years'.";
  }

  return errors;
}


export function validateImage(value){

  const errors = {}

  if(!regexURL.test(value)) errors.image = "The image must be entered as a URL."
  
  return errors
}
