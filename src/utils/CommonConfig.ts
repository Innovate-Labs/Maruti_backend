
export const StatusCode = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    REQUEST_CANNOT_COMPLETE: 501
}

export const CONTENT_TYPE = {
    JSON: 'application/json',
    MULTIPART: 'multipart/form-data'
}

export const ERRORS = {
    CONTENT_TYPE_MULTIPART: 'Invalid Content Type. Content-Type: multipart/form-data required.',
    CONTENT_TYPE_JSON: 'Invalid Content Type. Content-Type: application/json required.', 
    HEADER_NOT_FOUND: 'Header not present in the request.',
}

