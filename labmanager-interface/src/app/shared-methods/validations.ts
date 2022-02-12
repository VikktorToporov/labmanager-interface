  /**
   * Verify email param
   * @param email email to be verified
   * @returns true or false
   */
 export function verifyEmail(email: string): boolean {
    if (isNotNullOrUndefined(email) && isValueLengthBetween(email, 3, 100) && isEmail(email)) {
      return true;
    }

    return false;
  }

  /**
   * Verify pass param
   * @param pass pass to be verified
   * @returns true or false
   */
   export function verifyPass(pass: string): boolean {
    if (isNotNullOrUndefined(pass) && isValueLengthBetween(pass, 3, 100)) {
      return true;
    }

    return false;
  }

  /**
   * Verify username param
   * @param username username to be verified
   * @returns true or false
   */
   export function verifyUsername(username: string): boolean {
    if (isNotNullOrUndefined(username) && isValueLengthBetween(username, 5, 20)) {
      return true;
    }

    return false;
  }

  /**
   * Verify name param
   * @param pass name to be verified
   * @returns true or false
   */
  export function verifyName(name: string): boolean {
    if (isNotNullOrUndefined(name) && isValueLengthBetween(name, 5, 20)) {
      return true;
    }

    return false;
  }

  /**
   * Verify text param
   * @param value The value to check
   * @returns true or false
   */
  export function verifyText(text: string) {
    if (isNotNullOrUndefined(text) && isValueLengthBetween(text, 5, 255)) {
        return true;
      }
  
      return false;
}

  /**
   * Check if a value is null or undefined
   * @param value The value to check
   * @returns true if the value is not null or undefined, otherwise returns false
   */
  export function verifyGeneric(value: string) {
      return isNotNullOrUndefined(value);
  }

  /**
   * Check if a value is null or undefined
   * @param value The value to check
   * @returns true if the value is not null or undefined, otherwise returns false
   */
  function isNotNullOrUndefined(value: any) {
    if (value != null && value != undefined) {
        return true;
    }

    return false;
  }

  /**
   * Check if a value length is between a given interval
   * @param value The value to check
   * @param minLength The minimum length
   * @param maxLength The maximum length
   * @returns true if the value is between minLength and maxLength, otherwise returns false
   */
  function isValueLengthBetween(value: any, minLength: number, maxLength: number) {
    if (value.length && value.length >= minLength && value.length <= maxLength) {
        return true;
    }

    return false;
  }

  /**
   * Check if value is an email
   * @param value The value to check
   * @returns true or false
   */
  function isEmail(value: string) {
    if (value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return true;
    }
    
    return false;
  }