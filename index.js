const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');



let cityData = require('./MOCK_DATA.json')
let currentId = cityData.length

const typeDefs = gql`

  type City{
    id: Int!
    country: String!
    state: String
    city: String!
  }



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
        return newCity
      },


      // UPDATE
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

      // DESTROY
      deleteCity(parent, args, context, info){
        cityData = cityData.filter(city => city.id !== args.id)
        return true
      }
    }


};


const server = new ApolloServer({ typeDefs, resolvers, debug: true });


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
