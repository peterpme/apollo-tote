import React from 'react'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

class ApolloTote extends React.Component {
  static defaultProps = {
    skip: false
  }

  static propTypes = {
    skip: PropTypes.bool,
    query: PropTypes.string,
    variables: PropTypes.object,
    test: PropTypes.func,
    handlePass: PropTypes.func,
    handleFail: PropTypes.func,
    render: PropTypes.func,
    renderError: PropTypes.func,
    renderLoading: PropTypes.func
  }

  state = {
    loading: false,
    value: undefined,
    error: undefined
  }

  willUnmount = false
  query = null

  componentWillMount () {
    this.query = gql(this.props.query)
    if (this.props.skip) return
    this._runQuery()
  }

  componentWillUnmount () {
    this.willUnmount = true
  }

  _runQuery = async () => {
    if (this.willUnmount) return
    const { variables, client } = this.props
    this.setState({ loading: true })

    const options = { query: this.query }

    if (variables) {
      options.variables = variables
    }

    try {
      const result = await client.query(options)

      if (result.error) {
        throw result.error
      }

      this._handleTestCase(result.data)

      this.setState({ loading: false, error: undefined, value: result.data })
    } catch (error) {
      this.setState({ loading: false, error, value: undefined })
    }
  }

  _handleTestCase = (data) => {
    const result = this.props.test(data)

    if (result) {
      this.props.handlePass && this.props.handlePass()
    } else {
      this.props.handleFail && this.props.handleFail()
    }
  }

  render () {
    const { render, renderLoading, renderError } = this.props
    const { loading, value, error } = this.state

    if (loading) {
      if (!renderLoading) return null
      return renderLoading()
    }

    if (error) {
      if (!renderError) return null
      return renderError(error)
    }

    return render({
      value,
      error,
      loading
    })
  }
}

export default withApollo(ApolloTote)
