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
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	UNAUTHORIZED: {
		code: 401,
		pattern: '^\\{\\"code\\":401.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	PAYMENT_REQUIRED: {
		code: 402,
		pattern: '^\\{\\"code\\":402.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	FORBIDDEN: {
		code: 403,
		pattern: '^\\{\\"code\\":403.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	NOT_FOUND: {
		code: 404,
		pattern: '^\\{\\"code\\":404.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	METHOD_NOT_ALLOWED: {
		code: 405,
		pattern: '^\\{\\"code\\":405.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	NOT_ACCEPTABLE: {
		code: 406,
		pattern: '^\\{\\"code\\":406.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	PROXY_AUTHENTICATION_REQUIRED: {
		code: 407,
		pattern: '^\\{\\"code\\":407.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	REQUEST_TIMEOUT: {
		code: 408,
		pattern: '^\\{\\"code\\":408.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	CONFLICT: {
		code: 409,
		pattern: '^\\{\\"code\\":409.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	GONE: {
		code: 410,
		pattern: '^\\{\\"code\\":410.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	LENGTH_REQUIRED: {
		code: 411,
		pattern: '^\\{\\"code\\":411.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	PRECONDITION_FAILED: {
		code: 412,
		pattern: '^\\{\\"code\\":412.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	REQUEST_ENTITY_TOO_LARGE: {
		code: 413,
		pattern: '^\\{\\"code\\":413.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	REQUEST_URI_TOO_LONG: {
		code: 414,
		pattern: '^\\{\\"code\\":414.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	UNSUPPORTED_MEDIA_TYPE: {
		code: 415,
		pattern: '^\\{\\"code\\":415.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	REQUESTED_RANGE_NOT_SATISFIABLE: {
		code: 416,
		pattern: '^\\{\\"code\\":416.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	EXPECTATION_FAILED: {
		code: 417,
		pattern: '^\\{\\"code\\":417.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	UNPROCESSABLE_ENTITY: {
		code: 422,
		pattern: '^\\{\\"code\\":422.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	FAILED_DEPENDENCY: {
		code: 424,
		pattern: '^\\{\\"code\\":424.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	TOO_MANY_REQUESTS: {
		code: 429,
		pattern: '^\\{\\"code\\":429.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	UNAVAILABLE_FOR_LEGAL_REASONS: {
		code: 451,
		pattern: '^\\{\\"code\\":451.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	INTERNAL_SERVER_ERROR: {
		code: 500,
		pattern: '^\\{\\"code\\":500.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	NOT_IMPLEMENTED: {
		code: 501,
		pattern: '^\\{\\"code\\":501.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	BAD_GATEWAY: {
		code: 502,
		pattern: '^\\{\\"code\\":502.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	SERVICE_UNAVAILABLE: {
		code: 503,
		pattern: '^\\{\\"code\\":503.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	GATEWAY_TIMEOUT: {
		code: 504,
		pattern: '^\\{\\"code\\":504.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	HTTP_VERSION_NOT_SUPPORTED: {
		code: 505,
		pattern: '^\\{\\"code\\":505.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
	INSUFFICIENT_STORAGE: {
		code: 507,
		pattern: '^\\{\\"code\\":507.*',
		template: errorTemplateDynamic,
		contentType: 'application/json',
	},
};
