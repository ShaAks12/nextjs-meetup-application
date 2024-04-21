import React, { Fragment } from 'react';
import classes from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
    //console.log(props)
  return (
    <section className={classes.detail}>
        <img src={props.meetupData.image}
            alt={props.meetupData.title} />
        <h1>{props.meetupData.title}</h1>
        <address>{props.address}</address>
        <p>{props.meetupData.description}</p>
        

    </section>
  )
}

export default MeetupDetail