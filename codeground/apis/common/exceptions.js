export class DBOperationException extends Error {
    constructor(
        message = 'DBOperationException'
    ) {
        super(message)
        this.message = message;
        this.name = 'DBOperationException'
    }
    getHttpCode() {
        return 500
    }
    getMessage() {
        return this.message;
    }
}

export class ResourceNotFoundException extends Error {
    constructor(
        message='ResourceNotFoundException'
    ){
        super(message)
        this.message = message;
        this.name = 'ResourceNotFoundException'
    }
    getHttpCode() {
        return 400
    }
    getMessage() {
        return this.message;
    }
}