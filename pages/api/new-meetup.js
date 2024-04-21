import { MongoClient } from 'mongodb';

// api/new-meetup
// POST /api/new-meetup

const handler = async(req,res) => {
    //console.log(req.method)
    if(req.method === 'POST'){
        console.log("It working")
        const data = req.body;

        const {title,image,address,description} = data;
        //as this returns some promises so we use async in this method
        const client = await MongoClient.connect('mongodb+srv://AkashRana:Akku1234@cluster0.legjxaa.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        
        const db = client.db();  //this used to hold of our database an if not any then it will create some

        //collection is a table in our table and document will of entries
        const meetupsCollection = db.collection('meetups')
        
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });

    }
}

export default handler;