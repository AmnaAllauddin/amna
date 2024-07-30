// Question 1
let s = prompt("enter a string:")
console.log("the lenght of string is:" + s.length)
// Question 2
let i = parseInt(prompt("enter an index:"))
console.log("the character at index is:" + s.charAt(i))
// Question 3
let index = parseInt(prompt("enter an index:"))
console.log("the substring is:" + s.substring(i, index))
// Question 4
let senTence = prompt("enter a sentence:")
let splitwords = senTence.split(" ")
console.log("the split method is:" + splitwords)
console.log("the count method is:" + splitwords.length)
// Question 5
console.log("the search word from sentence:" + senTence.search("amna"))
console.log("the replace method is:" + senTence.replace("amna", "allauddin"))
// Question 6
console.log("the indexof method is:" + senTence.indexOf('l'))
// Question 7
let str = "amna";
let reverse = "";
for (let i = str.length - 1; i >= 0; i--) {
    reverse = reverse + str[i];
}
console.log(reverse);
//Question 8
function isPalindrome(str) {
let cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
return cleanedStr === cleanedStr.split('').reverse().join('');
}
let testString = "A man, a plan, a canal, Panama!";
console.log(`Is the string '${testString}' a palindrome? ${isPalindrome(testString)}`);



