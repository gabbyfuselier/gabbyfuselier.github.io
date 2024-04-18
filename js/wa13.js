//problem 1
let HR1 = [
    {
        "FirstName" : "Sam",
        "Department" : "Tech",
        "Designation" : "Manager",
        "Salary" : 40000,
        "RaiseEligible" : true
    },

    {
        "FirstName" : "Mary",
        "Department" : "Finance",
        "Designation" : "Trainee",
        "Salary" : 18500,
        "RaiseEligible" : true
    },

    {
        "FirstName" : "Bill",
        "Department" : "HR",
        "Designation" : "Executive",
        "Salary" : 21200,
        "RaiseEligible" : false
    }
]

console.log(HR1);

//problem 2
let HR2 = {
    "CompanyName" : "Tech Stars",
    "Website" : "www.techstars.site",
    "Employees" : HR1
}

console.log(HR2);

//problem 3
const Anna = {
    "FirstName" : "Anna",
    "Department" : "Tech",
    "Designation" : "Executive",
    "Salary" : 25600,
    "RaiseEligible" : false
}

HR2.Employees.push(Anna);

console.log(HR2);

//problem 4
function calcSalary(data){
    let totalSalary = 0;
    for (let i = 0; i < data.Employees.length; i++){
        totalSalary += data.Employees[i].Salary;
    }
    console.log(totalSalary)
}

calcSalary(HR2);

//problem 5
function raises(data){
    for (let i = 0; i < data.Employees.length; i++){
        if(data.Employees[i].RaiseEligible){
            data.Employees[i].RaiseEligible = false;
            data.Employees[i].Salary += data.Employees[i].Salary * 0.1;
        }
    }
    
}
raises(HR2);
console.log(HR2);

//problem 6
function workFromHome(data){
    const workingFromHome = ["Anna", "Sam"];

    for(let i = 0; data.Employees.length; i++){
        data.Employees[i].wfh = false;
        for(let j = 0; j< workingFromHome.length; j++){
            if(data.Employees[i].FirstName == workingFromHome[j]){
                data.Employees[i].wfh = true;
            }
        }
    }
}

workFromHome(HR2);
console.log(HR2);