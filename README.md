# apollo-tote

👜 A declarative approach to handling Apollo queries in React

[![npm version](https://badge.fury.io/js/apollo-tote.svg)](https://badge.fury.io/js/apollo-tote)

## Installation

```sh
yarn add apollo-tote
```

or

```sh
npm install --save apollo-tote
```

## Usage Examples

- Fetch `current user` query. If an api token exists but is no longer valid (ie: cleared database), log user out.

```jsx
  <ApolloTote
    test={data => !!(data && data.user && data.user.id)}
    handleFail={() => Store.dispatch({ type: 'LOG_OUT' })}
    handlePass={() => Store.dispatch({ type: 'LOG_IN' })}
    renderError={error => this._renderError(error)}
    renderLoading={() => <App.Loading />}
    render={value => <App userId={value.user.id} />}
  />
```

## PropTypes

- `skip`: Boolean - Should we skip over query and just render?
- `query`: String - Your graphql query
- `variables`: String - Graphql query variables
- `test`: Function (Optional) - helper to handle a successful query's response
- `handlePass`: Function (Optional) - a function to render a successful `test`
- `handleFail`: Function (Optional) - a function to render a failed `test`
- `renderError`: Function - error function
- `renderLoading`: Function - loading function
- `render`: Function - a function that renders the result of your query
