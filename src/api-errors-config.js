'use scrict';

const errorTemplateDynamic = '#set ($errorMessageObj = $util.parseJson($input.path(\'$.errorMessage\')).data)' +
  '{' +
  '#foreach($key in $errorMessageObj.keySet())' + // iterate over each error element
  '"$key":"$errorMessageObj.get($key)"' + // key: value
  '#if($foreach.hasNext),#end' + // add a comma if hasNext element
  '#end' +
  '}';

module.exports = {
  BAD_REQUEST: {
    code: 400,
    pattern: '^\\{\\"code\\":400.*',
    template: errorTemplateDynamic
  },
  UNAUTHORIZED: {
    code: 401,
    pattern: '^\\{\\"code\\":401.*',
    template: errorTemplateDynamic
  },
};