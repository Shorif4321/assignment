// **Task 1:** Create a MongoDB model with an interface and schema for a "Book" collection that stores fields like title, author, genre, publication year,  rating, price, and nested fields like "publisher" and "reviews". All the fields would be required.
/*
import { Schema, model } from "mongoose";

interface IBook {
    title: string,
    author: "Author 1" | "Author 2",
    genre: string,
    publicationYear: string,
    publisher: {
        name: string,
        location: string
    },
    reviews: [
        { user: string, comment: string }
    ],
    rating: string,
    price: string
}

const bookSchema = new Schema<IBook>({
    tittle: { type: String, required: true, },
    author: { type: String, enum: ["Author 1", "Author 2"], required: true },
    genre: { type: String, required: true },
    publicationYear: { type: String, required: true },
    publisher: {
        name: { type: String, required: true },
        location: { type: String, required: true },
    },
    reviews: {
        type: String, enum: {
            user: { type: String, required: true },
            comment: { type: String, required: true },
        }, required: true
    },
    rating: { type: String, required: true },
    price: { type: String, required: true }
});

// step:3 creat model
const Book = model<IBook>('Book', bookSchema); */



/*
Task 2:** Implement a MongoDB query to find all books in the "Books" collection with a specific genre, such as "Fantasy"

 db.assign.find({
    genre: { $eq: "Fantasy" }
})
*/


/*
 **Task 3:** Implement a MongoDB query to find books in the "Books" collection with a specific genre “Sci-Fi” and published by “Roli Books”.

db.assign.aggregate([
    { $match: { genre: "Sci-Fi", "publisher.name": "Roli Books" } },
    { $project: { genre: 1, "publisher.name": 1 } }
])
 */


/*
**Task 4:** Create a static method method within the "Book" model or write a function using query to retrieve books from the "Books" collection that have a rating equal to or higher than 4. These books will be categorized as featured books. Additionally, introduce a new field named "featured" to the featured book objects. The value of this field should be "Popular" if the book's rating is greater than or equal to 4. For books with a rating exceeding 4.5, the value should be set to "BestSeller".
import { MongoClient } from 'mongodb';

// Define the schema for the books collection
interface Book {
    title: string;
    author: string[];
    genre: string;
    publicationYear: number;
    publisher: {
        name: string;
        location: string;
    };
    reviews: {
        user: string;
        comment: string;
    }[];
    rating: number;
    price: string | number;
}

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'your_database_name';
const collectionName = 'books';

// Define the aggregation pipeline
const pipeline = [
    {
        $match: {
            rating: { $gte: 4 } // Filter books with rating >= 4
        }
    },
    {
        $addFields: {
            featured: {
                $cond: {
                    if: { $gte: ["$rating", 4.5] },
                    then: "BestSeller",
                    else: "Popular"
                }
            }
        }
    }
];

// Connect to MongoDB and execute the aggregation pipeline
async function getCategorizedFeaturedBooks() {
    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection<Book>(collectionName);
        const featuredBooks = await collection.aggregate(pipeline).toArray();
        return featuredBooks;
    } finally {
        await client.close();
    }
}

// Usage example
getCategorizedFeaturedBooks().then((featuredBooks) => {
    console.log(featuredBooks);
}).catch((err) => {
    console.error('Error retrieving featured books:', err);
});
 */




// **Task 5:** In the existing book data, some books have their prices stored as strings instead of integers. To ensure consistent data representation, you are required to update the prices of all books from string format to integer format using a MongoDB update query. However, to limit the scope of the update and ensure data accuracy, the prices should be updated only for books published after 2020.
/* 
ad.collecton.aggregate ([
    {
        $match: {
            publicationYear: { $gt: 2020 }, // Filter books published after 2020
            price: { $type: "string" } // Filter books with price stored as string
        }
    },
    {
        $set: {
            price: { $toInt: "$price" } // Convert price from string to integer
        }
    }
)];
 */




/* 
**Question 1:** What is the purpose of creating a model with an interface and schema in MongoDB? How does it help in defining the structure of a collection?

Answare: The purpose of creating a model with an interface and schema in MongoDB is to enforce data consistency and structure within a collection. It helps define the organization, types, and constraints of data, ensuring integrity and facilitating efficient querying and indexing operations. 
*/





/* **Question 2:** Explain the concept of field filtering in MongoDB. How can you specify which fields to include or exclude in the returned documents?
Answare: 
Field filtering in MongoDB allows specifying which fields to include or exclude in returned documents. Use projection operators like `$project` in aggregation pipelines to include specific fields or `$unset` to exclude. This optimizes bandwidth and query performance. */




/*
 **Question 3:** What are instance methods in MongoDB models? Provide an example of a custom instance method and explain its purpose.
Answare: Instance methods in MongoDB models are functions attached to specific document instances. Example:schema.methods.calculateTotal = function() {
    return this.price * this.quantity;
  };
  
*/


/* 
**Question 4:** How do you use comparison operators like "$ne," "$gt," "$lt," "$gte," and "$lte" in MongoDB queries? Provide examples to illustrate their usage.

Answare:
Comparison operators like "$ne" (not equal), "$gt" (greater than), "$lt" (less than), "$gte" (greater than or equal to), and "$lte" (less than or equal to) are used in MongoDB queries to filter documents based on specific conditions. 
Example:
// Find documents where age is not 30
db.collection.find({ age: { $ne: 30 } });

// Find documents where quantity is greater than 100
db.collection.find({ quantity: { $gt: 100 } });

// Find documents where price is less than or equal to 50
db.collection.find({ price: { $lte: 50 } });

These operators help specify conditions for data retrieval in MongoDB queries. 

*/



/* 
**Question 5:** What are MongoDB’s “$in” and “$nin” operators? How can you use them to match values against an array of values or exclude values from a given array?
Answare:
MongoDB's "$in" operator matches documents where a field's value matches any value in a specified array. "$nin" operator does the opposite, excluding documents with field values that match any value in the array. 

Example:
// Find documents where status is either "active" or "pending"
db.collection.find({ status: { $in: ["active", "pending"] } });

// Find documents where age is not in the array [18, 21, 25]
db.collection.find({ age: { $nin: [18, 21, 25] } });

These operators efficiently filter documents based on array values in MongoDB queries. 
*/