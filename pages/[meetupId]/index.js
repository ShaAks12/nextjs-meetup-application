import { MongoClient,ObjectId } from "mongodb";
import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>
          {props.meetupData.title}
        </title>
        <meta 
          name="descriptiuon"
          content={props.meetupData.description} />
        
      </Head>
      <MeetupDetail
        meetupData={props.meetupData}
      />
    </Fragment>
  );
};

//its use for dynamic pages which says that whjch dynamic values it contains
//the below code will never end up in client
export async function getStaticPaths() {

        const client = await MongoClient.connect('mongodb+srv://AkashRana:Akku1234@cluster0.legjxaa.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        
        const db = client.db();  //this used to hold of our database an if not any then it will create some

        //collection is a table in our table and document will of entries
        const meetupsCollection = db.collection('meetups')

        const meetups = await meetupsCollection.find({}, {_id:1}).toArray();

        client.close();

  return {
    fallback: "blocking", //it tells nextjs whether the path contain all mmetup id value o some.
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for an Single Meetup

  const meetupId = context.params.meetupId; //this happens when user interacts mean after build

  const client = await MongoClient.connect('mongodb+srv://AkashRana:Akku1234@cluster0.legjxaa.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        
  const db = client.db();  //this used to hold of our database an if not any then it will create some

  //collection is a table in our table and document will of entries
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id:  new ObjectId(meetupId),
  })
  client.close();

  //console.log(selectedMeetup);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      }
      
    },
  };
}

export default MeetupDetails;
