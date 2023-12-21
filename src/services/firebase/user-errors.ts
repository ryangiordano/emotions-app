export enum UserErrorCodes {
  success = 1,
  noUsers = 2,
}

export const UserErrorCodeText = {
  [UserErrorCodes.success]: "Success",
  [UserErrorCodes.noUsers]: "No users found",
};

export class UserError extends Error {
  constructor(public statusCode: UserErrorCodes) {
    super(UserErrorCodeText[statusCode]);
    // Maintain proper stack trace for where error was thrown
    Object.setPrototypeOf(this, UserError.prototype);
  }
}
