
 const data = [
    {
    name: "Sarah Johnson",
  title: "CEO & Founder, TechVision",
  bio:
    "Sarah is a visionary leader with over 15 years of experience in the tech industry. ",
  image: `public/images/party.png`,
  expertise: {
     ai:"AI",
    Leadership:"Leadership",
    Innovation:"Innovation"
  },
    },
    {
    name: "Sarah Johnson",
  title: "CEO & Founder, TechVision",
  bio:
    "Sarah is a visionary leader with over 15 years of experience in the tech industry. ",
  image: `public/images/party.png`,
  expertise:{
     ai:"AI",
    Leadership:"Leadership",
    Innovation:"Innovation"
  },
    },
    {
    name: "Sarah Johnson updated",
  title: "CEO & Founder, TechVision",
  bio:
    "Sarah is a visionary leader with over 15 years of experience in the tech industry. ",
  image: `public/images/party.png`,
  expertise:{
    ai:"AI",
    Leadership:"Leadership",
    Innovation:"Innovation"
  } ,
    },
     {
    name: "Sarah Johnson",
  title: "CEO & Founder, TechVision",
  bio:
    "Sarah is a visionary leader with over 15 years of experience in the tech industry. ",
  image: `public/images/party.png`,
  expertise: {
     ai:"AI",
    Leadership:"Leadership",
    Innovation:"Innovation"
  },
    },
     {
    name: "Sarah Johnson",
  title: "CEO & Founder, TechVision",
  bio:
    "Sarah is a visionary leader with over 15 years of experience in the tech industry. ",
  image: `public/images/party.png`,
  expertise: {
     ai:"AI",
    Leadership:"Leadership",
    Innovation:"Innovation"
  },
    },
     {
    name: "Sarah Johnson",
  title: "CEO & Founder, TechVision",
  bio:
    "Sarah is a visionary leader with over 15 years of experience in the tech industry. ",
  image: `public/images/party.png`,
  expertise: {
     ai:"AI",
    Leadership:"Leadership",
    Innovation:"Innovation"
  },
    },
]

export const getSpeakers = async (req, res) => {

    try {

       res.status(200).json({
        status: true,
        message: '',
        data: data
       })
    }

    catch (error) {
        console.log(error);

        res.status(400).json({ error: ' event registration failed' });

    }

}