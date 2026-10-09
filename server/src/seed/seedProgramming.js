import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';
import Topic from '../models/Topic.js';
import connectDB from '../config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const newQuestions = [
  {
    "id": "prog-001",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "easy",
    "text": "What is the output? int x = 5; System.out.println(x + 2);",
    "options": ["52", "7", "10", "5"],
    "correctIndex": 1,
    "explanation": "The + operator performs integer addition here: 5 + 2 = 7."
  },
  {
    "id": "prog-002",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "easy",
    "text": "What is the output? int x = 4; x++; System.out.println(x);",
    "options": ["4", "5", "3", "Error"],
    "correctIndex": 1,
    "explanation": "The post-increment operator increases x by 1. Its final value is 5."
  },
  {
    "id": "prog-003",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "easy",
    "text": "What is the output? int a = 10; int b = 3; System.out.println(a % b);",
    "options": ["3", "1", "0", "10"],
    "correctIndex": 1,
    "explanation": "The % operator returns the remainder. 10 divided by 3 leaves remainder 1."
  },
  {
    "id": "prog-004",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "easy",
    "text": "What is the output? int x = 2; System.out.println(x * x + 1);",
    "options": ["5", "9", "6", "4"],
    "correctIndex": 0,
    "explanation": "Multiplication happens before addition: 2 × 2 + 1 = 5."
  },
  {
    "id": "prog-005",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "easy",
    "text": "What is printed? int x = 8; int y = 2; System.out.println(x / y);",
    "options": ["4", "4.0", "6", "16"],
    "correctIndex": 0,
    "explanation": "Both operands are integers, so integer division gives 8 / 2 = 4."
  },
  {
    "id": "prog-006",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "medium",
    "text": "What is the output? int x = 5; System.out.println(x++); System.out.println(x);",
    "options": ["6 then 6", "5 then 5", "5 then 6", "6 then 5"],
    "correctIndex": 2,
    "explanation": "x++ first produces the old value 5, then increments x. The next print displays 6."
  },
  {
    "id": "prog-007",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "medium",
    "text": "What is the output? int x = 5; System.out.println(++x);",
    "options": ["5", "6", "4", "Error"],
    "correctIndex": 1,
    "explanation": "Pre-increment increases x before using its value, so the output is 6."
  },
  {
    "id": "prog-008",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "medium",
    "text": "What is the output? int x = 3; int y = x++ + 2; System.out.println(x + \" \" + y);",
    "options": ["3 5", "4 5", "4 6", "5 4"],
    "correctIndex": 1,
    "explanation": "x++ contributes the old value 3, so y = 3 + 2 = 5. Then x becomes 4."
  },
  {
    "id": "prog-009",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "medium",
    "text": "What is the output? int a = 2; int b = 3; System.out.println(a + b * 2);",
    "options": ["10", "12", "8", "7"],
    "correctIndex": 3,
    "explanation": "Multiplication has higher precedence than addition: 2 + (3 × 2) = 8. The correct option is 8, index 2."
  },
  {
    "id": "prog-010",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "medium",
    "text": "What is the output? int x = 10; x -= 3; x *= 2; System.out.println(x);",
    "options": ["14", "7", "20", "34"],
    "correctIndex": 0,
    "explanation": "First x becomes 10 - 3 = 7. Then x becomes 7 × 2 = 14."
  },
  {
    "id": "prog-011",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "hard",
    "text": "What is the output? int x = 2; int y = x++ + ++x; System.out.println(x + \" \" + y);",
    "options": ["3 5", "4 5", "4 6", "3 4"],
    "correctIndex": 1,
    "explanation": "The left x++ contributes 2 and changes x to 3. The right ++x changes x to 4 and contributes 4. Thus y = 2 + 4 = 6, and x = 4. The correct option is 4 6, index 2."
  },
  {
    "id": "prog-012",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "hard",
    "text": "What is the output? int a = 5; int b = 2; System.out.println(a / b * 2);",
    "options": ["5", "4", "4.5", "2"],
    "correctIndex": 1,
    "explanation": "Integer division is evaluated first: 5 / 2 = 2. Then 2 × 2 = 4."
  },
  {
    "id": "prog-013",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "hard",
    "text": "What is the output? int x = 1; x = x++ + x; System.out.println(x);",
    "options": ["2", "3", "4", "1"],
    "correctIndex": 1,
    "explanation": "The left x++ contributes 1 and increments x to 2. The right x is then 2, so the sum assigned to x is 3."
  },
  {
    "id": "prog-014",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "hard",
    "text": "What is the output? int x = 10; int y = 3; System.out.println(x % y + x / y);",
    "options": ["4", "3", "1", "5"],
    "correctIndex": 0,
    "explanation": "10 % 3 = 1 and integer division 10 / 3 = 3. Their sum is 4."
  },
  {
    "id": "prog-015",
    "topicSlug": "programming-aptitude",
    "subtopic": "Output Prediction & Code Tracing",
    "difficulty": "hard",
    "text": "What is printed? int x = 4; int y = 2; System.out.println(x > y && x % y == 0);",
    "options": ["true", "false", "0", "Error"],
    "correctIndex": 0,
    "explanation": "Both conditions are true: 4 > 2 and 4 % 2 == 0. Therefore, the logical AND returns true."
  },

  {
    "id": "prog-016",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "easy",
    "text": "What is printed? for (int i = 1; i <= 3; i++) System.out.print(i + \" \");",
    "options": ["0 1 2", "1 2 3", "1 2", "2 3 4"],
    "correctIndex": 1,
    "explanation": "The loop runs for i = 1, 2, and 3, printing each value."
  },
  {
    "id": "prog-017",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "easy",
    "text": "What is printed? int x = 7; if (x > 5) System.out.println(\"Yes\"); else System.out.println(\"No\");",
    "options": ["No", "Yes", "7", "Nothing"],
    "correctIndex": 1,
    "explanation": "Since 7 > 5 is true, the if branch prints Yes."
  },
  {
    "id": "prog-018",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "easy",
    "text": "How many times does this loop execute? for (int i = 0; i < 5; i++) {}",
    "options": ["4", "5", "6", "Infinite"],
    "correctIndex": 1,
    "explanation": "The loop executes for i = 0, 1, 2, 3, and 4, making 5 iterations."
  },
  {
    "id": "prog-019",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "easy",
    "text": "What is printed? int i = 1; while (i <= 2) { System.out.print(i); i++; }",
    "options": ["12", "123", "01", "22"],
    "correctIndex": 0,
    "explanation": "The loop prints 1, then 2. After i becomes 3, the condition is false."
  },
  {
    "id": "prog-020",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "easy",
    "text": "What is printed? for (int i = 1; i <= 5; i++) { if (i == 3) break; System.out.print(i); }",
    "options": ["12345", "12", "1245", "3"],
    "correctIndex": 1,
    "explanation": "When i reaches 3, break terminates the loop before 3 is printed. The output is 12."
  },
  {
    "id": "prog-021",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "medium",
    "text": "What is printed? int sum = 0; for (int i = 1; i <= 4; i++) sum += i; System.out.println(sum);",
    "options": ["6", "10", "15", "4"],
    "correctIndex": 1,
    "explanation": "The sum is 1 + 2 + 3 + 4 = 10."
  },
  {
    "id": "prog-022",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "medium",
    "text": "How many times is X printed? for (int i = 1; i <= 3; i++) { for (int j = 1; j <= 2; j++) System.out.print(\"X\"); }",
    "options": ["3", "5", "6", "9"],
    "correctIndex": 2,
    "explanation": "The outer loop runs 3 times and the inner loop prints X twice each time. Total = 3 × 2 = 6."
  },
  {
    "id": "prog-023",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "medium",
    "text": "What is printed? for (int i = 1; i <= 5; i++) { if (i % 2 == 0) continue; System.out.print(i); }",
    "options": ["12345", "24", "135", "15"],
    "correctIndex": 2,
    "explanation": "continue skips printing even values. The odd values printed are 1, 3, and 5."
  },
  {
    "id": "prog-024",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "medium",
    "text": "What is printed? int x = 10; if (x > 5) { if (x < 15) System.out.println(\"A\"); else System.out.println(\"B\"); }",
    "options": ["A", "B", "AB", "Nothing"],
    "correctIndex": 0,
    "explanation": "Both x > 5 and x < 15 are true, so A is printed."
  },
  {
    "id": "prog-025",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "medium",
    "text": "What is printed? int i = 0; do { System.out.print(i); i++; } while (i < 0);",
    "options": ["Nothing", "0", "01", "Infinite loop"],
    "correctIndex": 1,
    "explanation": "A do-while loop executes its body at least once. It prints 0 before checking the false condition."
  },
  {
    "id": "prog-026",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "hard",
    "text": "What is printed? int count = 0; for (int i = 1; i <= 4; i++) { for (int j = 1; j <= i; j++) count++; } System.out.println(count);",
    "options": ["4", "8", "10", "16"],
    "correctIndex": 2,
    "explanation": "The inner loop runs 1 + 2 + 3 + 4 times in total. Therefore, count = 10."
  },
  {
    "id": "prog-027",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "hard",
    "text": "What is printed? for (int i = 1; i <= 5; i++) { if (i == 2 || i == 4) continue; System.out.print(i); }",
    "options": ["12345", "24", "135", "135"],
    "correctIndex": 2,
    "explanation": "The loop skips 2 and 4, printing 1, 3, and 5."
  },
  {
    "id": "prog-028",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "hard",
    "text": "What is printed? int x = 1; for (int i = 1; i <= 3; i++) x *= 2; System.out.println(x);",
    "options": ["3", "6", "8", "16"],
    "correctIndex": 2,
    "explanation": "Starting from 1, the value doubles three times: 1 → 2 → 4 → 8."
  },
  {
    "id": "prog-029",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "hard",
    "text": "How many times does the loop execute? for (int i = 1; i < 20; i *= 2) {}",
    "options": ["4", "5", "6", "20"],
    "correctIndex": 1,
    "explanation": "The values are 1, 2, 4, 8, and 16. The next value is 32, which fails the condition. There are 5 iterations."
  },
  {
    "id": "prog-030",
    "topicSlug": "programming-aptitude",
    "subtopic": "Conditional Statements & Loops",
    "difficulty": "hard",
    "text": "What is printed? int n = 5; while (n > 0) { System.out.print(n); n -= 2; }",
    "options": ["54321", "531", "5310", "521"],
    "correctIndex": 1,
    "explanation": "The values printed are 5, 3, and 1. Then n becomes -1 and the loop stops."
  },

  {
    "id": "prog-031",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "easy",
    "text": "What is printed? int[] a = {2, 4, 6}; System.out.println(a[1]);",
    "options": ["2", "4", "6", "1"],
    "correctIndex": 1,
    "explanation": "Java arrays use zero-based indexing. a[1] is the second element, 4."
  },
  {
    "id": "prog-032",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "easy",
    "text": "What is printed? int[] a = {1, 2, 3, 4}; System.out.println(a.length);",
    "options": ["3", "4", "5", "Error"],
    "correctIndex": 1,
    "explanation": "The array contains four elements, so a.length is 4."
  },
  {
    "id": "prog-033",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "easy",
    "text": "What is printed? String s = \"Java\"; System.out.println(s.length());",
    "options": ["3", "4", "5", "Error"],
    "correctIndex": 1,
    "explanation": "Java has four characters, so s.length() returns 4."
  },
  {
    "id": "prog-034",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "easy",
    "text": "What is printed? int[] a = {3, 5, 7}; System.out.println(a[0] + a[2]);",
    "options": ["8", "10", "12", "15"],
    "correctIndex": 1,
    "explanation": "a[0] is 3 and a[2] is 7. Their sum is 10."
  },
  {
    "id": "prog-035",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "easy",
    "text": "What is printed? String s = \"Code\"; System.out.println(s.charAt(0));",
    "options": ["C", "o", "e", "Code"],
    "correctIndex": 0,
    "explanation": "charAt(0) returns the first character, C."
  },
  {
    "id": "prog-036",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "medium",
    "text": "What is printed? int[] a = {1, 2, 3}; int sum = 0; for (int x : a) sum += x; System.out.println(sum);",
    "options": ["3", "5", "6", "9"],
    "correctIndex": 2,
    "explanation": "The enhanced for loop visits every element. The sum is 1 + 2 + 3 = 6."
  },
  {
    "id": "prog-037",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "medium",
    "text": "What is printed? int[] a = {1, 2, 3, 4}; for (int i = a.length - 1; i >= 0; i--) System.out.print(a[i]);",
    "options": ["1234", "4321", "4312", "0123"],
    "correctIndex": 1,
    "explanation": "The loop starts at the last index and moves backward, printing 4, 3, 2, 1."
  },
  {
    "id": "prog-038",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "medium",
    "text": "What is printed? String s = \"hello\"; System.out.println(s.substring(1, 4));",
    "options": ["hel", "ell", "ello", "ll"],
    "correctIndex": 1,
    "explanation": "substring(1, 4) includes index 1 and excludes index 4, returning ell."
  },
  {
    "id": "prog-039",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "medium",
    "text": "What is printed? int[] a = {2, 4, 6}; a[1] = 10; System.out.println(a[0] + a[1] + a[2]);",
    "options": ["12", "16", "18", "20"],
    "correctIndex": 2,
    "explanation": "The updated array is {2, 10, 6}. Its sum is 18."
  },
  {
    "id": "prog-040",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "medium",
    "text": "What is printed? String a = \"Java\"; String b = \"Java\"; System.out.println(a.equals(b));",
    "options": ["true", "false", "Java", "Error"],
    "correctIndex": 0,
    "explanation": "String.equals compares string contents. Both strings contain Java, so it returns true."
  },
  {
    "id": "prog-041",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "hard",
    "text": "What is printed? int[] a = {1, 2, 3, 4, 5}; for (int i = 0; i < a.length; i += 2) System.out.print(a[i]);",
    "options": ["12345", "135", "24", "15"],
    "correctIndex": 1,
    "explanation": "The visited indices are 0, 2, and 4. The corresponding values are 1, 3, and 5."
  },
  {
    "id": "prog-042",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "hard",
    "text": "What is printed? String s = \"banana\"; System.out.println(s.indexOf('a'));",
    "options": ["0", "1", "2", "3"],
    "correctIndex": 1,
    "explanation": "The first occurrence of a is at index 1."
  },
  {
    "id": "prog-043",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "hard",
    "text": "What is printed? int[] a = {1, 2, 3}; int[] b = a; b[0] = 9; System.out.println(a[0]);",
    "options": ["1", "2", "3", "9"],
    "correctIndex": 3,
    "explanation": "Both variables refer to the same array. Updating b[0] also changes a[0] to 9."
  },
  {
    "id": "prog-044",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "hard",
    "text": "What is printed? String s = \"abc\"; System.out.println(s.substring(0, 2) + s.charAt(2));",
    "options": ["ab", "abc", "bc", "ac"],
    "correctIndex": 1,
    "explanation": "substring(0, 2) returns ab and charAt(2) returns c. Concatenating them produces abc."
  },
  {
    "id": "prog-045",
    "topicSlug": "programming-aptitude",
    "subtopic": "Arrays & Strings",
    "difficulty": "hard",
    "text": "What is printed? int[] a = {2, 4, 6, 8}; for (int i = 1; i < a.length; i++) a[i] += a[i - 1]; System.out.println(a[3]);",
    "options": ["8", "14", "20", "24"],
    "correctIndex": 3,
    "explanation": "The array updates to {2, 6, 12, 20}. Thus a[3] is 20. The correct option is index 2."
  },

  {
    "id": "prog-046",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "easy",
    "text": "What is printed? static int add(int a, int b) { return a + b; } System.out.println(add(2, 3));",
    "options": ["5", "6", "23", "1"],
    "correctIndex": 0,
    "explanation": "The method returns 2 + 3 = 5."
  },
  {
    "id": "prog-047",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "easy",
    "text": "What is printed? static int square(int x) { return x * x; } System.out.println(square(4));",
    "options": ["8", "12", "16", "20"],
    "correctIndex": 2,
    "explanation": "The method returns 4 × 4 = 16."
  },
  {
    "id": "prog-048",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "easy",
    "text": "What is printed? static void greet() { System.out.print(\"Hi\"); } greet();",
    "options": ["Hello", "Hi", "Nothing", "Error"],
    "correctIndex": 1,
    "explanation": "Calling greet executes its print statement, which prints Hi."
  },
  {
    "id": "prog-049",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "easy",
    "text": "What is printed? static int f(int x) { return x + 1; } System.out.println(f(f(2)));",
    "options": ["3", "4", "5", "2"],
    "correctIndex": 1,
    "explanation": "First f(2) returns 3. Then f(3) returns 4."
  },
  {
    "id": "prog-050",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "easy",
    "text": "What is printed? static int value() { return 7; } int x = value(); System.out.println(x);",
    "options": ["0", "7", "value", "Error"],
    "correctIndex": 1,
    "explanation": "The method returns 7, which is stored in x and printed."
  },
  {
    "id": "prog-051",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "medium",
    "text": "What is printed? static int f(int n) { if (n == 0) return 1; return n * f(n - 1); } System.out.println(f(4));",
    "options": ["10", "16", "24", "120"],
    "correctIndex": 2,
    "explanation": "This recursive method calculates factorial: 4 × 3 × 2 × 1 = 24."
  },
  {
    "id": "prog-052",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "medium",
    "text": "What is printed? static void f(int x) { x = 100; } int a = 5; f(a); System.out.println(a);",
    "options": ["100", "5", "0", "Error"],
    "correctIndex": 1,
    "explanation": "Java passes primitive values by value. Changing the method parameter x does not change a."
  },
  {
    "id": "prog-053",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "medium",
    "text": "What is printed? static int f(int n) { if (n <= 1) return n; return f(n - 1) + f(n - 2); } System.out.println(f(5));",
    "options": ["3", "5", "8", "13"],
    "correctIndex": 1,
    "explanation": "This is the Fibonacci sequence with f(0) = 0 and f(1) = 1. The values are 0, 1, 1, 2, 3, 5, so f(5) = 5."
  },
  {
    "id": "prog-054",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "medium",
    "text": "What is printed? static int f(int n) { if (n == 1) return 1; return n + f(n - 1); } System.out.println(f(4));",
    "options": ["4", "6", "10", "24"],
    "correctIndex": 2,
    "explanation": "The recursive sum is 4 + 3 + 2 + 1 = 10."
  },
  {
    "id": "prog-055",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "medium",
    "text": "What is printed? static int f(int x) { return x * 2; } static int g(int x) { return f(x) + 1; } System.out.println(g(3));",
    "options": ["6", "7", "8", "9"],
    "correctIndex": 1,
    "explanation": "f(3) returns 6. Then g(3) returns 6 + 1 = 7."
  },
  {
    "id": "prog-056",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "hard",
    "text": "What is printed? static void f(int n) { if (n == 0) return; System.out.print(n); f(n - 1); } f(3);",
    "options": ["123", "321", "0123", "3210"],
    "correctIndex": 1,
    "explanation": "The method prints n before making the recursive call, so it prints 3, then 2, then 1."
  },
  {
    "id": "prog-057",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "hard",
    "text": "What is printed? static int f(int n) { if (n == 0) return 0; return n + f(n - 1); } System.out.println(f(5));",
    "options": ["5", "10", "15", "120"],
    "correctIndex": 2,
    "explanation": "The function calculates 5 + 4 + 3 + 2 + 1 + 0 = 15."
  },
  {
    "id": "prog-058",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "hard",
    "text": "What is printed? static int f(int n) { if (n <= 1) return 1; return f(n - 1) + f(n - 1); } System.out.println(f(4));",
    "options": ["4", "8", "16", "24"],
    "correctIndex": 2,
    "explanation": "Each call doubles the previous result. f(1) = 1, f(2) = 2, f(3) = 4, and f(4) = 8. The correct option is index 1."
  },
  {
    "id": "prog-059",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "hard",
    "text": "What is printed? static int f(int n) { if (n == 1) return 1; return n * f(n - 1); } System.out.println(f(3) + f(2));",
    "options": ["6", "8", "10", "12"],
    "correctIndex": 1,
    "explanation": "f(3) = 6 and f(2) = 2. Their sum is 8."
  },
  {
    "id": "prog-060",
    "topicSlug": "programming-aptitude",
    "subtopic": "Functions, Recursion & Parameter Passing",
    "difficulty": "hard",
    "text": "What is printed? static int f(int n) { if (n == 0) return 0; return 1 + f(n - 1); } System.out.println(f(6));",
    "options": ["5", "6", "7", "720"],
    "correctIndex": 1,
    "explanation": "Each recursive call adds 1 until n reaches 0. Starting at 6 therefore returns 6."
  },

  {
    "id": "prog-061",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "easy",
    "text": "What is printed? System.out.println(5 + 2 * 3);",
    "options": ["21", "11", "15", "13"],
    "correctIndex": 1,
    "explanation": "Multiplication has higher precedence than addition: 5 + 6 = 11."
  },
  {
    "id": "prog-062",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "easy",
    "text": "What is printed? System.out.println(10 > 5 && 3 < 1);",
    "options": ["true", "false", "1", "Error"],
    "correctIndex": 1,
    "explanation": "The first comparison is true and the second is false. true && false evaluates to false."
  },
  {
    "id": "prog-063",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "easy",
    "text": "What is printed? int x = 7; System.out.println(x % 2 == 1);",
    "options": ["true", "false", "1", "7"],
    "correctIndex": 0,
    "explanation": "7 % 2 is 1, so the comparison 1 == 1 is true."
  },
  {
    "id": "prog-064",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "easy",
    "text": "What is printed? double x = 5 / 2; System.out.println(x);",
    "options": ["2", "2.0", "2.5", "3.0"],
    "correctIndex": 1,
    "explanation": "Both operands in 5 / 2 are integers, so integer division produces 2. Assigning that result to double gives 2.0."
  },
  {
    "id": "prog-065",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "easy",
    "text": "What is printed? System.out.println(5 == 5);",
    "options": ["true", "false", "5", "Error"],
    "correctIndex": 0,
    "explanation": "The equality operator checks whether the values are equal. Since both are 5, the result is true."
  },
  {
    "id": "prog-066",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "medium",
    "text": "What is printed? System.out.println(10 + 20 + \"Java\");",
    "options": ["1020Java", "30Java", "Java30", "Error"],
    "correctIndex": 1,
    "explanation": "Addition is evaluated from left to right. 10 + 20 becomes 30, then string concatenation produces 30Java."
  },
  {
    "id": "prog-067",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "medium",
    "text": "What is printed? System.out.println(\"Java\" + 10 + 20);",
    "options": ["Java30", "30Java", "Java1020", "Error"],
    "correctIndex": 2,
    "explanation": "Evaluation proceeds left to right. Once the expression starts with a string, both numbers are concatenated as text, producing Java1020."
  },
  {
    "id": "prog-068",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "medium",
    "text": "What is printed? int x = 5; System.out.println(x > 3 ? 100 : 200);",
    "options": ["5", "100", "200", "true"],
    "correctIndex": 1,
    "explanation": "The condition x > 3 is true, so the ternary operator selects 100."
  },
  {
    "id": "prog-069",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "medium",
    "text": "What is printed? System.out.println(6 & 3);",
    "options": ["2", "3", "5", "7"],
    "correctIndex": 0,
    "explanation": "In binary, 6 is 110 and 3 is 011. Bitwise AND gives 010, which is 2."
  },
  {
    "id": "prog-070",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "medium",
    "text": "What is printed? System.out.println(1 << 3);",
    "options": ["3", "4", "8", "16"],
    "correctIndex": 2,
    "explanation": "Left-shifting 1 by 3 bit positions gives 1 × 2^3 = 8."
  },
  {
    "id": "prog-071",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "hard",
    "text": "What is printed? int x = 5; System.out.println(x > 3 || x++ > 5); System.out.println(x);",
    "options": ["true then 6", "true then 5", "false then 6", "false then 5"],
    "correctIndex": 1,
    "explanation": "The first condition x > 3 is true, so || short-circuits and does not evaluate x++. The output is true, then 5."
  },
  {
    "id": "prog-072",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "hard",
    "text": "What is printed? System.out.println(8 >> 1);",
    "options": ["2", "4", "8", "16"],
    "correctIndex": 1,
    "explanation": "Right-shifting positive integer 8 by one bit divides it by 2, giving 4."
  },
  {
    "id": "prog-073",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "hard",
    "text": "What is the time complexity of a loop that runs n times and performs constant work during each iteration?",
    "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    "correctIndex": 2,
    "explanation": "The loop performs constant work n times, so its running time grows linearly: O(n)."
  },
  {
    "id": "prog-074",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "hard",
    "text": "What is the time complexity of the following nested loops? for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) { /* constant work */ }",
    "options": ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
    "correctIndex": 3,
    "explanation": "The outer loop runs n times and the inner loop runs n times per outer iteration. Total work is n × n = n²."
  },
  {
    "id": "prog-075",
    "topicSlug": "programming-aptitude",
    "subtopic": "Operators, Data Types & Basic Complexity",
    "difficulty": "hard",
    "text": "What is the time complexity of this loop? int i = 1; while (i < n) { i *= 2; }",
    "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    "correctIndex": 1,
    "explanation": "The value doubles every iteration: 1, 2, 4, 8, and so on. It takes approximately log₂(n) iterations to reach n."
  }
];

const seedProgramming = async () => {
  await connectDB();
  console.log('Seeding Programming Aptitude questions...');

  let addedSubtopics = new Set();
  let questionsInserted = 0;
  let questionsSkipped = 0;

  for (const qData of newQuestions) {
    // Find or Create Topic
    let topic = await Topic.findOne({ slug: qData.topicSlug });
    if (!topic) {
      console.log(`Topic not found for slug: ${qData.topicSlug}, creating...`);
      topic = new Topic({
        name: qData.topicSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        slug: qData.topicSlug,
        category: 'logical',
        subtopics: [qData.subtopic]
      });
      await topic.save();
      addedSubtopics.add(qData.subtopic);
    } else {
      if (!topic.subtopics.includes(qData.subtopic)) {
        topic.subtopics.push(qData.subtopic);
        await topic.save();
        addedSubtopics.add(qData.subtopic);
      }
    }

    // Validate
    if (qData.options.length !== 4 || 
        qData.correctIndex < 0 || qData.correctIndex > 3 ||
        !qData.explanation || 
        !['easy', 'medium', 'hard'].includes(qData.difficulty)) {
      console.error(`Validation failed for: ${qData.text}`);
      continue;
    }

    // Prevent duplicate
    const existingQ = await Question.findOne({ text: qData.text });
    if (existingQ) {
      questionsSkipped++;
      continue;
    }

    // Create new question
    const newQ = new Question({
      topicId: topic._id,
      subtopic: qData.subtopic,
      text: qData.text,
      options: qData.options,
      correctIndex: qData.correctIndex,
      explanation: qData.explanation,
      difficulty: qData.difficulty,
      source: 'manual',
      status: 'approved'
    });
    await newQ.save();
    questionsInserted++;
  }

  console.log(`Seeding complete! Inserted ${questionsInserted} questions, skipped ${questionsSkipped} duplicates.`);
  if (addedSubtopics.size > 0) {
    console.log(`Added Programming Aptitude subtopics: ${Array.from(addedSubtopics).join(', ')}`);
  }
  process.exit();
};

seedProgramming();
