export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super("You must be logged in to view this content");
    this.name = "AuthenticationError";
  }
}

export class EmailInUseError extends PublicError {
  constructor() {
    super("Email is already in use");
    this.name = "EmailInUseError";
  }
}

export class UploadImagesError extends PublicError {
  constructor(message = "Failed to upload image") {
    super(message);
    this.name = "UploadImagesError";
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super("Resource not found");
    this.name = "NotFoundError";
  }
}

export class TokenExpiredError extends PublicError {
  constructor() {
    super("Token has expired");
    this.name = "TokenExpiredError";
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("Invalid email or password");
    this.name = "LoginError";
  }
}

export class InsertError extends PublicError {
  constructor() {
    super("Failed to insert");
    this.name = "InsertError";
  }
}