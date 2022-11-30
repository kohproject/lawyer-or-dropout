const express = require('express');
const cors = require('cors');
const axios = require('axios');

const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;


const staticContent =  [{
            "title": "the rules",
          "content": "<header><p class='txt__head'>The rules are simple... <br/>Select the number of entries you wish to consider. Click on the button at the bottom of the page that you believe match the profile. At the end of the game, you will see the results of your selections.</p></header><div class='box__static-page'></header></><hr /><div class='example'><div class='flex'><section> <div class='block__header'><h3>Who is a Lawyer </h3> <p> Anyone who obtained a law degree (JD,LLM,BL,LLB), or legally sat for and passed the bar exam, or obtained a license to practice law is deemed a lawyer by the standards of this game. </p></div> <h4>examples: </h4> <article class='act-true'><p> <strong>Antonio Villaraigosa </strong> The former mayor of Los Angeles earned a JD degree from The Peoples College of Law, a non-ABA approved Law School. He sat for the California Bar Exam 4 times, but never passed. </p> <p> By the standards of this game, he is designated as a lawyer. </p> <em></em></article> <article class='act-false'><p> <strong>Frank Abagnale </strong> The convicted felon and subject of the movie, 'Catch Me if You Can' illegally sat for The Lousiana Bar Exam and passed on his third try. He briefly practiced law without a valid license. </p> <p> By the standards of this game, he is not considered a lawyer. </p> <em></em></article></section> <section> <div class='block__header'><h3>Who is a Dropout </h3> <p> Anyone who droped out of a university program before obtaining a bachelors degree or anyone who never obtained a bachelors degree through earned credit is deemed a dropout by the standards of this game. </p></div> <h4>examples: </h4> <article class='act-true'><p> <strong> Stephen Wolfram </strong> The British-American computer scientist and physicist left Oxford University before completing a bachelors degree. He entered a graduate program at CalTech University and earned his PhD in particle physics at age 20. </p> <p> By the standards of this game, he is considered a dropout. </p> <em></em></article> <article class='act-false'><p> <strong>Steven Spielberg </strong> The world famous filmmaker dropped out of Long Beach State University to pursue his film career. He returned to Long Beach State University more than 20 years later to complete his bachelors degree. </p> <p> By the standards of this game, he is not considered a dropout. </p> <em></em></article></section></div></div></div>"
        },
        {
            "title": "about",
          "content": "<hr /><div class='flex'><section class='sect__about'><em data-type='about'></em><h3>Just for Fun</h3> <p>My name is Sonny and I created this website for fun.</p><p> Most people I admire in this world have either dropped out of college or studied law at one point in their lives. I have always been amazed at the number of people that were able to achieve great success without a college degree. I have also heard so many stories of lawyers that leave a successful career after years of law school to pursue a true passion. I started making a list of people that fit into either category and I was surprise to see the variety of people that fit into each group. </p><p> This website is not intended to insult or degrade any individual. All information gathered on the profiles was obtained from public record. </p><p>I have not been paid to create or maintain this website.</p></section> <section class='sect__contact'><em data-type='contact'></em><h3><span>Say</span> Hello</h3> <div class='contact__wrapper' id='contactWrapper'><div id='response' class='contact-response'> <div> <h3>Thank You.</h3> <p>Your message has been sent...</p></div></div><form id='form_contact'> <ul> <li class='li__req'> <label class='before-required-star' for='name'>Name<span class='sp__error-mess'></span></label> <input type='text' class='inp__txt inp-req' id='name' name='name' required=''> </li><li class='li__req'> <label class='before-required-star' for='email'>Email<span class='sp__error-mess'></span></label> <input type='text' class='inp__txt inp-req' id='email' name='email' required=''> </li><li class='li__req'> <label class='before-required-star' for='subject'>Subject<span class='sp__error-mess'></span></label> <input type='text' class='inp__txt inp-req' id='subject' name='subject' required=''> </li><li class='li__req'> <label class='before-required-star' for='message'>Message<span class='sp__error-mess'></span></label> <textarea name='message' class='textarea__mess inp-req' id='message' cols='30' rows='10' required=''></textarea> </li><li><button id='btn_click' onclick='javascript:document.getElementById(\"btn_submit\").click()'>Submit</button></li></ul></form></div></section></div>"
        }];

    let smtpTrans = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: mailapi.env.user,
          pass: mailapi.env.pass
        }
    });
   
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());
app.get('/', (req,res) =>{
    res.send('hello');
});

app.post('/emailMess',(req,res) =>{
    let bodyparams = req.body;
    const mailData = {
          from: 'info@lawdrop.com',  // sender address
          to: 'info@lawdrop.com',   // list of receivers
          subject: bodyparams.subject,
          text: "from:"+bodyparams.name+":fromemail:"+bodyparams.email+":mess:"+bodyparams.message
        };
        smtpTrans.sendMail(mailData, function (err, info) {
            if(err)
            console.log(err)
            else
            console.log(info);
        });

    res.json({'resp':'success'});
});

app.get('/api/static/:id',(req,res) =>{
    var jsonContent =null;

    if(req.params.id ==='rules'){
        jsonContent = staticContent[0].content;
    }
    if(req.params.id ==='about' || req.params.id==='contact'){
        jsonContent =staticContent[1].content;
    }
    res.json({'message':jsonContent});
});

app.get('/api/profiles', (req,res) =>{

    axios.get('http://www.sonnykoh.com/lawyerdropout/api/profiles.json').then(resp => {
        res.json(resp.data);
    });

});


app.get('/api/profiles/:id', (req, res) =>{
    res.send(req.params.id);
})

app.listen(port, ()=>{
    console.log(`server running on port: ${port}`);
})
