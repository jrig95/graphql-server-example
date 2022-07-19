const {gql} = require('apollo-server');



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

module.exports = typeDefs;
