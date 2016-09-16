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
  constructor(data) {
    super();
    const code = this.constructor.code;
    if (!data) {
      data = 'Something went wrong';
    }
    if (typeof data !== 'object') {
      data = { message: data };
    }
    const serializedData = JSON.stringify(data);
    this.message = `{"code":${code},"data":${serializedData}}`;
  }

  static get code() {
    return 500; // INTERNAL SERVER ERROR
  }

  /**
   * set a custom error template
   * pattern: https://aws.amazon.com/blogs/compute/error-handling-patterns-in-amazon-api-gateway-and-aws-lambda/
   * usage:
   * class CustomBadRequest extends ApiErrors.BadRequest {
   *   static get customTemplate() {
   *     return '$input.path(\'$.errorMessage.customData\')';
   *   }
   * }
   */
  static get customTemplate() {
  }

  /**
   * use this function to get the config object when building the api endpoint
   * @returns {{code: int, pattern: string, template: string}}
   */
  static toConfig() {
    const code = this.code;
    const customTemplate = this.customTemplate;
    return {
      code,
      pattern: `^\\{\\"code\\":${code}.*`,
      template: customTemplate || errorTemplateDynamic
    };
  }
}

class BadRequest extends ApiBuilderError {
  static get code() {
    return 400;
  }
}
class Unauthorized extends ApiBuilderError {
  static get code() {
    return 401;
  }
}
class PaymentRequired extends ApiBuilderError {
  static get code() {
    return 402;
  }
}
class Forbidden extends ApiBuilderError {
  static get code() {
    return 403;
  }
}
class NotFound extends ApiBuilderError {
  static get code() {
    return 404;
  }
}
class MethodNotAllowed extends ApiBuilderError {
  static get code() {
    return 405;
  }
}
class NotAcceptable extends ApiBuilderError {
  static get code() {
    return 406;
  }
}
class ProxyAuthenticationRequired extends ApiBuilderError {
  static get code() {
    return 407;
  }
}
class RequestTimeout extends ApiBuilderError {
  static get code() {
    return 408;
  }
}
class Conflict extends ApiBuilderError {
  static get code() {
    return 409;
  }
}
class Gone extends ApiBuilderError {
  static get code() {
    return 410;
  }
}
class LengthRequired extends ApiBuilderError {
  static get code() {
    return 411;
  }
}
class PreconditionFailed extends ApiBuilderError {
  static get code() {
    return 412;
  }
}
class RequestEntityTooLarge extends ApiBuilderError {
  static get code() {
    return 413;
  }
}
class RequestURITooLarge extends ApiBuilderError {
  static get code() {
    return 414;
  }
}
class UnsupportedMediaType extends ApiBuilderError {
  static get code() {
    return 415;
  }
}
class RequestedRangeNotSatisfiable extends ApiBuilderError {
  static get code() {
    return 416;
  }
}
class ExpectationFailed extends ApiBuilderError {
  static get code() {
    return 417;
  }
}
class UnprocessableEntity extends ApiBuilderError {
  static get code() {
    return 422;
  }
}
class FailedDependency extends ApiBuilderError {
  static get code() {
    return 424;
  }
}
class TooManyRequests extends ApiBuilderError {
  static get code() {
    return 429;
  }
}
class UnavailableForLegalReasons extends ApiBuilderError {
  static get code() {
    return 451;
  }
}
class InternalServerError extends ApiBuilderError {
  static get code() {
    return 500;
  }
}
class NotImplemented extends ApiBuilderError {
  static get code() {
    return 501;
  }
}
class BadGateway extends ApiBuilderError {
  static get code() {
    return 502;
  }
}
class ServiceUnavailable extends ApiBuilderError {
  static get code() {
    return 503;
  }
}
class GatewayTimeOut extends ApiBuilderError {
  static get code() {
    return 504;
  }
}
class HTTPVersionNotSupported extends ApiBuilderError {
  static get code() {
    return 505;
  }
}
class InsufficientStorage extends ApiBuilderError {
  static get code() {
    return 507;
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
