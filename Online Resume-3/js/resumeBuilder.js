//#####Bio-description#####
var bio = 
{
    "name": "Manu Anmol Singh",
    "role": "Front-End Web Developer",
    "contacts": 
	{
        "mobile": "8968349404",
        "email": "manuanmol16@live.com",
        "location": "Chandigarh",
        "twitter": "-",
        "github": "anon997"
    },
    "welcomeMessage": "Sky is the only limit.",
    "skills": ["HTML", "CSS", "JAVASCRIPT", "C++", "Sketching"],
    "biopic": "images/fry.jpg"
};


//####work-Description####
var work = 
{
	'jobs':[
	{
    "employer": "Chitkara University",
    "title": "Student",
    "dates": "2015-2019",
    "description": "Bachelor of Engineering in Computer Science",
    "location": "Chitkara University , Rajpura , Patiala, Punjab",
	}]
};



//####Education-Details####
var education = {
    "schools": [
	{
        "name": "KB DAV Senior Secondary School",
        "location": "Sector-7C , Chandigarh",
        "degree": "High School",
        "majors": ["PCM"],
        "dates": "2013-2014",
        "url": "kbdavschool.in"
    }, {
        "name": "Chitkara University",
        "location": "Chitkara University, Rajpura, Patiala, Punjab",
        "degree": "B.E",
        "majors": ["Computer Science"],
        "dates": "2015-2019",
        "url": "www.chitkara.edu.in"
    }],
    "onlineCourses": [{
        "title": "1. Introduction to Basic HTML and CSS",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://www.udacity.com/course/intro-to-html-and-css--ud304"
    }, {
        "title": "2. Javascript Basics",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://classroom.udacity.com/courses/ud804"
    }]
};
//####Project Work#####
var projects = {
    "projects": [
	{
            "title": "Animal Trading Card",
            "dates": "11-Feb-2017",
            "description": "A website created using HTML and Css Describing a Leopard",
            "images": ['images/2.png']
        },
        {
            "title": "My Batfolio",
            "dates": "11-March-2017",
            "description": "A website Designed using HTML CSS and Bootstrap describing a portfolio for hackers",
            "images": ['images/1.png']
        }
    ]
};

//Map
$("#mapDiv").append(googleMap);


//###bio-Display###
bio.display = function() 
{
    
    $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
	$("#header").prepend(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    $("#topContacts,#footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
	 $("#topContacts,#footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#topContacts,#footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#topContacts,#footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
	$("#topContacts,#footerContacts").append(HTMLtwitter.replace("%data%", bio.contacts.twitter));
    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (b = 0; b < bio.skills.length; b++) {
            $("#skills").append(HTMLskills.replace("%data%", bio.skills[b]));
        }
    }
};
//##Work Display##
work.display = function() {
	 
   for (var w=0;w<work.jobs.length;w++) 
   {
        $("#workExperience").append(HTMLworkStart);
		$(".work-entry:last").append(HTMLworkEmployer.replace("%data%", work.jobs[w].employer)+ HTMLworkTitle.replace("%data%", work.jobs[w].title));
		$(".work-entry:last").append(HTMLworkLocation.replace("%data%", work.jobs[w].location));
		$(".work-entry:last").append(HTMLworkDates.replace("%data%", work.jobs[w].dates));
		$(".work-entry:last").append(HTMLworkDescription.replace("%data%", work.jobs[w].description));
		
		

        
    }
};
//###Education Display###
education.display = function() {
    for (e = 0; e < education.schools.length; e++) 
	{
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLschoolName.replace("%data%", education.schools[e].name) + HTMLschoolDegree.replace("%data%", education.schools[e].degree));
        $(".education-entry:last").append(HTMLschoolDates.replace("%data%", education.schools[e].dates));
        $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", education.schools[e].location));
        $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", education.schools[e].majors));
    }
    //## online classes ##
    $("#education").append(HTMLonlineClasses);
    for (i =0;i< education.onlineCourses.length;i++)
		{
        formattedOnline = [];
        formattedOnline.push(HTMLonlineTitle.replace("%data%", education.onlineCourses[i].title) + HTMLonlineSchool.replace("%data%", education.onlineCourses[i].school));
        formattedOnline.push(HTMLonlineDates.replace("%data%", education.onlineCourses[i].dates));
        formattedOnline.push(HTMLonlineURL.replace("%data%", education.onlineCourses[i].url));
        for (j=0;j<formattedOnline.length;j++)
			{
            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(formattedOnline[j]);
            
        }
    }
};
//##Project Display##
projects.display = function() {
    for (p=0; p<projects.projects.length;p++) {
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projects.projects[p].title), HTMLprojectDates.replace("%data%", projects.projects[p].dates) + HTMLprojectDescription.replace("%data%", projects.projects[p].description));

        if (projects.projects[p].images.length > 0) {
            for (var image=0;image<projects.projects[p].images.length;image++)
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[p].images[image]));
        }
    }
};
//###### Display Functions #######
bio.display();
work.display();
education.display();
projects.display();