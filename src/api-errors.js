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

/**
 * ApiBuilderError
 * to configure API Gateway error responses and http status codes
 * @param code int
 * @param data object|string|empty the response object you want to send back to the client
 *             { message: 'User not found', ... } or you can just pass a string, it will be
 *             converted to { message: [data string] }
 *             if you leave it empty it returns: { message: 'Something went wrong' }
 */
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

  /**
   * set a custom error template
   * pattern: https://aws.amazon.com/blogs/compute/error-handling-patterns-in-amazon-api-gateway-and-aws-lambda/
   * @param customTemplate
   */
  setCustomTemplate(customTemplate) {
    this.customTemplate = customTemplate;
  }

  /**
   * use this function to get the config object when building the api endpoint
   * @returns {{code: int, pattern: string, template: string}}
   */
  toConfig() {
    return {
      code: this.code,
      pattern: `^\\{\\"code\\":${this.code}.*`,
      template: this.customTemplate || errorTemplateDynamic,
    };
  }
}

class BadRequest extends ApiBuilderError {
  constructor(data) {
    super(400, data);
  }
}
class Unauthorized extends ApiBuilderError {
  constructor(data) {
    super(401, data);
  }
}
class PaymentRequired extends ApiBuilderError {
  constructor(data) {
    super(402, data);
  }
}
class Forbidden extends ApiBuilderError {
  constructor(data) {
    super(403, data);
  }
}
class NotFound extends ApiBuilderError {
  constructor(data) {
    super(404, data);
  }
}
class MethodNotAllowed extends ApiBuilderError {
  constructor(data) {
    super(405, data);
  }
}
class NotAcceptable extends ApiBuilderError {
  constructor(data) {
    super(406, data);
  }
}
class ProxyAuthenticationRequired extends ApiBuilderError {
  constructor(data) {
    super(407, data);
  }
}
class RequestTimeout extends ApiBuilderError {
  constructor(data) {
    super(408, data);
  }
}
class Conflict extends ApiBuilderError {
  constructor(data) {
    super(409, data);
  }
}
class Gone extends ApiBuilderError {
  constructor(data) {
    super(410, data);
  }
}
class LengthRequired extends ApiBuilderError {
  constructor(data) {
    super(411, data);
  }
}
class PreconditionFailed extends ApiBuilderError {
  constructor(data) {
    super(412, data);
  }
}
class RequestEntityTooLarge extends ApiBuilderError {
  constructor(data) {
    super(413, data);
  }
}
class RequestURITooLarge extends ApiBuilderError {
  constructor(data) {
    super(414, data);
  }
}
class UnsupportedMediaType extends ApiBuilderError {
  constructor(data) {
    super(415, data);
  }
}
class RequestedRangeNotSatisfiable extends ApiBuilderError {
  constructor(data) {
    super(416, data);
  }
}
class ExpectationFailed extends ApiBuilderError {
  constructor(data) {
    super(417, data);
  }
}
class UnprocessableEntity extends ApiBuilderError {
  constructor(data) {
    super(422, data);
  }
}
class FailedDependency extends ApiBuilderError {
  constructor(data) {
    super(424, data);
  }
}
class TooManyRequests extends ApiBuilderError {
  constructor(data) {
    super(429, data);
  }
}
class UnavailableForLegalReasons extends ApiBuilderError {
  constructor(data) {
    super(451, data);
  }
}
class InternalServerError extends ApiBuilderError {
  constructor(data) {
    super(500, data);
  }
}
class NotImplemented extends ApiBuilderError {
  constructor(data) {
    super(501, data);
  }
}
class BadGateway extends ApiBuilderError {
  constructor(data) {
    super(502, data);
  }
}
class ServiceUnavailable extends ApiBuilderError {
  constructor(data) {
    super(503, data);
  }
}
class GatewayTimeOut extends ApiBuilderError {
  constructor(data) {
    super(504, data);
  }
}
class HTTPVersionNotSupported extends ApiBuilderError {
  constructor(data) {
    super(505, data);
  }
}
class InsufficientStorage extends ApiBuilderError {
  constructor(data) {
    super(507, data);
  }
}

/**
 * export every Error
 * @type {{BadRequest: BadRequest, Unauthorized: Unauthorized, PaymentRequired: PaymentRequired, Forbidden: Forbidden,
  NotFound: NotFound, MethodNotAllowed: MethodNotAllowed, NotAcceptable: NotAcceptable, ProxyAuthenticationRequired:
  ProxyAuthenticationRequired, RequestTimeout: RequestTimeout, Conflict: Conflict, Gone: Gone,
  LengthRequired: LengthRequired, PreconditionFailed: PreconditionFailed, RequestEntityTooLarge: RequestEntityTooLarge,
  RequestURITooLarge: RequestURITooLarge, UnsupportedMediaType: UnsupportedMediaType,
  RequestedRangeNotSatisfiable: RequestedRangeNotSatisfiable, ExpectationFailed: ExpectationFailed,
  UnprocessableEntity: UnprocessableEntity, FailedDependency: FailedDependency, TooManyRequests: TooManyRequests,
  UnavailableForLegalReasons: UnavailableForLegalReasons, InternalServerError: InternalServerError,
  NotImplemented: NotImplemented, BadGateway: BadGateway, ServiceUnavailable: ServiceUnavailable,
  GatewayTimeOut: GatewayTimeOut, HTTPVersionNotSupported: HTTPVersionNotSupported,
  InsufficientStorage: InsufficientStorage}}
 */
module.exports = {
  BadRequest,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  ProxyAuthenticationRequired,
  RequestTimeout,
  Conflict,
  Gone,
  LengthRequired,
  PreconditionFailed,
  RequestEntityTooLarge,
  RequestURITooLarge,
  UnsupportedMediaType,
  RequestedRangeNotSatisfiable,
  ExpectationFailed,
  UnprocessableEntity,
  FailedDependency,
  TooManyRequests,
  UnavailableForLegalReasons,
  InternalServerError,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeOut,
  HTTPVersionNotSupported,
  InsufficientStorage,
};
