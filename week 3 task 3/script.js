
let person = {
    name: "Ali",
    age: 30,
    job: "Developer",
    greet: function() {
        console.log("Hello, " + this.name);
    }
};

// Accessing object properties
console.log(person.name);
console.log(person.age);   

person.greet();  


person.country = "USA";
console.log(person.country);  

person.age = 31;
console.log(person.age); 


delete person.job;
console.log(person.job);  



let map = new Map();

// Adding entries to the Map
map.set("name", "Alice");
map.set("age", 25);
map.set("job", "Engineer");


console.log(map.get("name"));  
console.log(map.get("age"));  


console.log(map.has("job")); 


map.forEach((value, key) => {
    console.log(key + ": " + value);
});


map.delete("job");
console.log(map.has("job"));  

map.clear();
console.log(map.size);  




let obj = {
    name: "Asad",
    age: 27
};
console.log(obj.name);  


let map2 = new Map();
map2.set(1, "one");
map2.set(2, "two");
console.log(map2.get(1)); 


