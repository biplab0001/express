const express= require('express')
const router= express.Router()
const members= require('../../member')
const uuid= require('uuid')

router.get('/', (req,res)=>{
    res.json(members)
})
router.get('/:id', (req,res)=>{
    const present= members.some( member => {
        return member.id === parseInt(req.params.id)
    })
    
    console.log(req.params.id)
    console.log(present)
    if(present){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg: 'no member found'})
    }
    
})

router.post("/", (req, res)=>{
    const newMember={
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        state: 'active'
    }
    console.log(newMember.name)
    console.log(newMember.email)
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "provide valid name or email"})
    }
    
    members.push(newMember)
    // res.json(members)
    res.redirect('/')
    
})

//update member

router.put('/:id',(req,res)=>{
    const present= members.some( member => {
        return member.id === parseInt(req.params.id)
    })
    
    if(present){
        const updMember= req.body
        members.forEach(member =>{
            if(member.id=== parseInt(req.params.id)){
                member.name= updMember.name ? updMember.name : member.name
                member.email= updMember.email ? updMember.email : member.email

                res.json({msg : 'member updated', member})
            }
            
        })
        // res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg: 'you have to add the name and email address'})
    }
    
})

//delete member
router.delete('/:id', (req,res)=>{
    const present= members.some(member =>{
        return member.id === parseInt(req.params.id)
    })
    if(present){
        res.json(members.filter(member => member.id !== parseInt(req.params.id)))
    }
    else{
        res.status(400).json({msg: 'no member found'})
    }
})

module.exports= router