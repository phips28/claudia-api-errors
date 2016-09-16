'use strict';

const HTTPStatus = require('http-status');

const errorTemplatePlain = '$input.path(\'$.errorMessage\')';
const errorTemplateDynamic = '#set ($errorMessageObj = $util.parseJson($input.path(\'$.errorMessage\')).data)' +
  '{' +
  '#foreach($key in $errorMessageObj.keySet())' + // iterate over each error element
  '"$key":"$errorMessageObj.get($key)"' + // key: value
  '#if($foreach.hasNext),#end' + // add a comma if hasNext element
  '#end' +
  '}';

class ApiBuilderError extends Error {
  constructor(code, data) {
    if (!data) {
      data = 'Something went wrong';
    }
    if (typeof data !== 'object') {
      data = { message: data };
    }
    const serializedData = JSON.stringify(data);
    super(`{"code":${code},"data":${serializedData}}`);
    this.code = code;
  }

  setCustomTemplate(customTemplate) {
    this.customTemplate = customTemplate;
  }

  toConfig() {
    return {
      code: this.code,
      pattern: `^\\{\\"code\\":${this.code}.*`,
      template: this.customTemplate || errorTemplateDynamic,
    };
  }
}

class NotFoundError extends ApiBuilderError {
  constructor(data) {
    super(HTTPStatus.NOT_FOUND, data);
  }
}

class BadRequestError extends ApiBuilderError {
  constructor(data) {
    super(HTTPStatus.BAD_REQUEST, data);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  // etc.
};

// module.exports.notFoundError = function notFoundError(data) {
//   return new NotFoundError(data);
// };
//
// module.exports.badRequestError = function badRequestError(data) {
//   return new BadRequestError(data);
// };
