// our-domain.com/new-meetup

import {  useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm' 
import { Fragment } from 'react';
import Head from 'next/head';

const NewMeetupPage = () => {

    const router = useRouter();

    const addMeetupHandler = async(enterMeetupData) => {
        
        const response = await fetch('/api/new-meetup',{
            method:'POST',
            body:JSON.stringify(enterMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await response.json();
        console.log(data);
        router.push("/")
    }
  return (
    <Fragment>
      <Head>
        <title>
          Adding a new meetup
        </title>
        <meta 
          name="descriptiuon"
          content='Adding a meetup for networking' />
        
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  )
}

export default NewMeetupPage;