// Get homePage

exports.homePage = async(req,res)=>{
        const locals={
            title:  'Node Notes',
            description : "NodeJs Notes App"
    
        } 
       
        res.render('index',{
            locals,
            layout : '../views/layouts/front-page'
        });
    }

// Get about

exports.about = async(req,res)=>{
        const locals={
            title:  'Node Notes',
            description : "NodeJs Notes App"
    
        } 
       
        res.render('about',locals);
    }

// features

exports.feature = async(req,res)=>{
        const locals={
            title:  'Node Notes',
            description : "NodeJs Notes App"
    
        } 
       
        res.render('feature',locals);
    }

 //faq 

exports.faq = async(req,res)=>{
        const locals={
            title:  'Node Notes',
            description : "NodeJs Notes App"
    
        } 
       
        res.render('faq',locals);
    }