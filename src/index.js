import React from 'react'
import PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

class ApolloTote extends React.Component {
  static defaultProps = {
    lazy: false
  }

  static propTypes = {
    lazy: PropTypes.bool,
    query: PropTypes.string,
    variables: PropTypes.object,
    handleNo: PropTypes.func
  }

  willUnmount = false
  query = null
  state = {
    loading: false,
    value: undefined,
    error: undefined
  }

  componentWillMount () {
    this.query = gql(this.props.query)
    if (this.props.lazy) return

    this._runQuery()
  }

  componentWillUnmount () {
    this.willUnmount = true
  }

  _runQuery = async () => {
    this.setState({ loading: true })
    if (this.willUnmount) return

    const options = { query: this.query }

    if (this.props.variables) {
      options.variables = this.props.variables
    }

    try {
      const result = await this.props.client.query(options)

      if (result.error) {
        throw result.error
      }

      const passTest = this.props.handlePass(result.data)

      if (passTest) {
        this.props.handleYes && this.props.handleYes()
      } else {
        this.props.handleNo && this.props.handleNo()
      }

      this.setState({ loading: false, error: undefined, value: result.data })
    } catch (error) {
      this.setState({ loading: false, error, value: undefined })
      return undefined
    }
  }

  render () {
    if (!this.props.render) return null
    const { loading, value, error } = this.state

    if (loading) {
      if (!this.props.renderLoading) return null
      return this.props.renderLoading()
    }

    return this.props.render({
      getValue: this._getValue,
      loading,
      value,
      error
    })
  }
}

export default withApollo(ApolloTote)
