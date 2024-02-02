export function generateRandomOrderNumber(length: number) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  // Generate two random letters
  for (let i = 0; i < 2; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate a random number of the specified length
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // generates a random digit from 0 to 9
  }

  return result;
}
