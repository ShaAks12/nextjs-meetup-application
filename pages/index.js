import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";


// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Beaches_of_Barcelona%2C_Spain_%2851226454918%29.jpg/1280px-Beaches_of_Barcelona%2C_Spain_%2851226454918%29.jpg",
//     address: "Barcelona 1234 some CITY",
//     description: "This is out first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Beaches_of_Barcelona%2C_Spain_%2851226454918%29.jpg/1280px-Beaches_of_Barcelona%2C_Spain_%2851226454918%29.jpg",
//     address: "Barcelona 1234 some CITY",
//     description: "This is Second first meetup",
//   },
// ];

const HomePage = (props) => {
  //const [loadedMeetups, setloadedMeetups] = useState([]);

 // MongoClient.connect()

  return (
    <>
      <Head>
        <title>
          Single Meetups
        </title>
        <meta 
          name="descriptiuon"
          content='Browse a huge list of highly active React meetups'>
        </meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context){
//     //fetch dayta from an API

//     const req = context.req;
//     const res = context.res;    

//     return{
//         props:DUMMY_MEETUPS
//     };
// }

//The below function gets called first before the component as it a reserved js code

export async function getStaticProps(){

    //the code here never gets called or render at the client side 
    //so from here we send http request to database
    //the code here fetch data from an API

    //fetch data from an Api
        const client = await MongoClient.connect('mongodb+srv://AkashRana:Akku1234@cluster0.legjxaa.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        
        const db = client.db();  //this used to hold of our database an if not any then it will create some

        //collection is a table in our table and document will of entries
        const meetupsCollection = db.collection('meetups')

        const meetups = await meetupsCollection.find().toArray()

        client.close();

    
    return {
        props:{
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),

            }))
        },

        revalidate:1  // 1 sec we can regenerate page after deployment means update during the deployment

    };
}

export default HomePage;
