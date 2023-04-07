const data={             // Itjust give feel of react
    employees:require('../model/employees.json'),
    setEmployees: function(data){
        this.employees=data;
    }
}

const getAllEmployees=(req,res)=>{
    res.json(data.employees);
};
const createNewEmployee=(req,res)=>{
    const newEmployee={
        id:data.employees?.length?data.employees[data.employees.length-1].id+1:1,
         //if data me employee hai? (if yes,then check if lngth,if yes then last wle ki id+1, otherwise 1) 
         firstName: req.body.firstName,
         lastName: req.body.lastName
    }
    if(!newEmployee.firstName || !newEmployee.lastName){
        return res.status(400).json({'message':"FirstName & lastName is required"})
    }
    //   means data.employees me newEmployee add kr do
    data.setEmployees([...data.employees,newEmployee]);
    res.status(201).json(data.employees);   // 201 means new record is created
}
const deleteEmployee=(req,res)=>{
    const employee=data.employee.find(emp=>emp.id==parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee ID ${req.body.id}  not found`})
    }
    const filteredArray=data.employee.filter(emp=>emp.id!=parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
}
const updateEmployee= (req,res)=>{
    const employee=data.employees.find(emp=>emp.id==parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee ID ${req.body.id}  not found`})
    }
    if(req.body.firstName) employee.firstName=req.body.firstName;
    if(req.body.lastName) employee.lastName=req.body.lastName;   
    // before inserting updated data ,firstly remove the older data of that employee
    const filteredArray=data.employee.filter(emp=>emp.id!=parseInt(req.body.id));
    const unsortedArray=[...filteredArray,employee];
    data.setEmployees(unsortedArray.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0)) ;
    res.json(data.employees);
}
const getEmployee=(req,res)=>{
    const employee=data.employee.find(emp=>emp.id==parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message':`Employee ID ${req.body.id}  not found`})
    }
    res.json(employee);
}

module.exports={getAllEmployees,createNewEmployee,deleteEmployee,getEmployee,updateEmployee};

