const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');


// get mock data
let cityData = require('./MOCK_DATA.json')
let currentId = cityData.length
//  A schema is a collection of type definitions (hence "typeDefs")
//  that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  # type Book {
  #   title: String
  #   author: String
  # }
  type City{
    id: Int!
    country: String!
    state: String
    city: String!
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    cities: [City]!
    city(id: Int!): City
    citiesInCountry(country: String!): [City]!
    test: String
  }

  type Mutation{
    addCity(city: String!, country: String!, state: String): City!
    updateCity(id: Int!, city: String!, country: String!, state: String): City
    deleteCity(id:Int!): Boolean
  }
`;

// const books = [
//   {
//     title: "The Awakening",
//     author: "Kate Chopin",
//   },
//   {
//     title: "City of Glass",
//     author: "Paul Auster",
//   },
// ];

// READ
const resolvers = {
  Query: {
    cities(){
      return cityData
    },
    city(_parent, args, _context, _info){
     let x = cityData.filter(city => city.id === args.id)
     if (x.length === 1){
      return x[0]
     }
     else{
      return null
     }
    },

    citiesInCountry(parent, args, context, info){
      return cityData.filter(city => city.country === args.country)
    },
    test(){
      return "hello world"
    },


  },

  Mutation
  :{
      // CREATE
      addCity(parent, args, context, info){
        console.log('here')
        currentId += 1
        let newCity = {city: args.city, country: args.country, state: args.state, id: currentId}
        cityData.push(newCity)
        // let cityDataString = JSON.stringify(newCity)
        // await fs.writeFile("double_check.json", cityDataString)
        return newCity
      },

      updateCity(parent, args, context, info){
        let targetCities = cityData.filter(city => city.id === args.id)
        if (targetCities.length === 1){
          let targetCity = targetCities[0]
          targetCity.city = args.city
          targetCity.country = args.country
          if (args.state){
            targetCity.state = args.state
          }
          cityData.push(targetCity)
          return targetCity
        }

        return null


      },

      deleteCity(parent, args, context, info){
        cityData = cityData.filter(city => city.id !== args.id)
        return true
      }
    }

  // Mutations:{

  // }
};

//  The ApolloServer constructor requires two parameters: your schema
//  definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, debug: true });

//  The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
