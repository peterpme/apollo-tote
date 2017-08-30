# apollo-tote

👜 A declarative approach to handling Apollo GraphQL queries in React

[![npm version](https://badge.fury.io/js/apollo-tote.svg)](https://badge.fury.io/js/apollo-tote)

## Note: Actively being developed. Stuff will change.

## Installation

```zsh
yarn add apollo-tote
```

or

```zsh
npm install --save apollo-tote
```

## Usage Examples

- Fetch `current user` query. If an api token exists but is no longer valid (ie: cleared database), log user out.

```jsx
  <ApolloTote
    handlePass={(data) => !!(data && data.user && data.user.id)}
    handleNo={() => Store.dispatch({ type: 'LOG_OUT' })}
    renderLoading={() => <App.Loading />}
    query={`
      user {
        id
      }
    `}
    render={(value, error) => {
      return <App />
    }}
  />
```
