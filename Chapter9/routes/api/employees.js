// here we have separated our logic into controller file

const express=require('express');
const router=express.Router();
// this is how we will get data from database

const employeesController=require('../../controller/employeesController')

// this is how we will be mdefining methods http req. methods
router.route('/')
            .get(employeesController.getAllEmployees)
            .post(employeesController.createNewEmployee)
            .put(employeesController.updateEmployee)
            .delete(employeesController.deleteEmployee);
router.route("/:id")
              .get(employeesController.getEmployee)

module.exports=router