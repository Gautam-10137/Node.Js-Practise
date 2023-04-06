// this is how we can use api

const express=require('express');
const router=express.Router();
// this is how we will get data from database
const data={}
data.employees=require('../../data/employees.json')

// this is how we will be mdefining methods http req. methods
router.route('/')
            .get((req,res)=>{
                 res.json(data.employees);
            })
            .post((req,res)=>{
                res.json(
                    {
                        "firstName":req.body.firstName,
                        "lastName":req.body.lastName
                    }
                )
            })
            .put((req,res)=>{
                res.json({
                    "firstName":req.body.firstName,
                    "lastName":req.body.lastName
                })
            })
            .delete((req,res)=>{
                res.json({
                    "id":req.body.id
                })
            });
router.route("/:id")
              .get((req,res)=>{
                    res.json({
                    "id":req.params.id
                    })
              })

module.exports=router