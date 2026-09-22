const student = {
    "name": "Youngmin Cho",
    "age": 24,
    "favorite": null
}

console.log(student.name);
console.log(student.age);
console.log(student.favorite);
console.log(student.club); // undefined

student.favorite = [];
student.favorite.push("Java");
console.log(student.favorite.pop());


student.score = {
    midterm: 90,
    final: 85
};

console.log(student.score.midterm);
console.log(student);